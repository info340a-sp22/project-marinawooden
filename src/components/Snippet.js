import React, { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faPlay } from "@fortawesome/free-solid-svg-icons";
import { getDatabase, ref as databaseRef, push as databasePush, onValue } from "firebase/database";
import Cookies from "universal-cookie";

function DisplayFName({ inputFile }) {
  if (inputFile) {
    return (
      <p className="text-center text-break fs-4">{inputFile.name}</p>
    )
  }
  return (
    <></>
  )
}

export function PlaySong({artist, snippet, imageSrc, imageDesc, setPlayingCall, getPlayingCall}) {
  let upload;
  const [buttonName, setButtonName] = useState("Play");
  const [disable, setDisable] = useState(true);
  const [audio, setAudio] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [cover, setCover] = useState("");
  // useEffect(() => {
  //   if (upload) {
  //     upload.pause();
  //     upload = null;
  //     setButtonName("Play");
  //   }
  //   if (audio) {
  //     upload = new Audio(audio);
  //     upload.onended = () => {
  //       setButtonName("Play");
  //     };
  //   }
  // }, [audio]);


  useEffect(() => {
    const storage = getStorage();
    const snippetPath = `snippets/${artist}/${snippet}`;
    const pathReference = storageRef(storage, snippetPath);
    const imageReference = storageRef(storage, imageSrc);

    console.log(imageSrc);

    getDownloadURL(pathReference)
      .then((url) => {
        setAudio(new Audio(url));
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });

    getDownloadURL(imageReference)
      .then((url) => {
        setCover(url);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
    
  }, [setAudio, setErrorMessage, snippet, artist, imageSrc, setCover]);

  return (
    <div>
      <DiscCircle audio={audio} imageSrc={cover} imageDesc={imageDesc} setPlayingCall={setPlayingCall} getPlayingCall={getPlayingCall}/>
      <p>{upload}</p>
      {errorMessage && (<p className="error"> {errorMessage} </p>)}
    </div>
  )
}

// upload an audio file to the firebase database
export function UploadSnippet({ profileInfo }) {
  const [inputFile, setFile] = useState();
  const [inputImage, setImage] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  // check if file type excepted
  const isValidFileUploaded = (file) => {
    const validExtensions = ['m4a', 'mp3', 'wav']
    // console.log(file);
    const fileExtension = file.name.split('.').pop();
    return validExtensions.includes(fileExtension)
  }
  // add new File to Input File State
  const addFile = (event) => {
    setFile(event.target.files[0]);
    event.target.value = "";
  };

  const addImage = (event) => {
    setImage(event.target.files[0]);
  }
  // if audio file is in an accepted format,
  // upload the file to firebase storage along sides
  // metadata about the songs
  const handleSubmit = (event) => {
    event.preventDefault();

    const cookie = new Cookies();
    const userHash = cookie.get("userHash");

    if (userHash) {
      if (inputFile && inputImage) {
        if (isValidFileUploaded(inputFile)) {
          const imagePath = "img/" + userHash + "/" + inputImage.name;
          setErrorMessage('');
          const metaData = {
            customMetadata: {
              title: event.target.title.value,
              filename: inputFile.name,
              artist: profileInfo.name,
              genres: event.target.genres.value,
              img: imagePath
            }
          }
          const storage = getStorage();
          const snipPath = "snippets/" + userHash + "/" + event.target.title.value;
          event.target.title.value = "";
          event.target.genres.value = "";
          const snippetsRef = storageRef(storage, snipPath);
          uploadBytes(snippetsRef, inputFile, metaData)
            .then((snapshot) => {
              // const newPath = storageRef(storage, snapshot.metadata.fullPath);

              // getDownloadURL(newPath)
              //   .then((url) => {
              //     console.log(url); // The location of the new file
              //   })
              //   .catch((err) => {
              //     console.error(err.message);
              //   })

              setFile(); // clear file
            }).catch((error) => {
              setErrorMessage(error.code);
            })
          const imagesRef = storageRef(storage, imagePath);
          uploadBytes(imagesRef, inputImage)
            .then((snapshot) => {
              updateRelease(metaData, userHash);
              setImage();
            }).catch((error) => {
              setErrorMessage(error.code);
            })
          
        } else {
          setErrorMessage('File type is unsupported');
          setFile();
        }
      }
      setFile();
    } else {
      setErrorMessage("You must be logged in to upload a snippet!");
      setFile();
    }
  }

  function updateRelease(metadata, userHash) {
    const db = getDatabase();
    const path = `profiles/${userHash}/releases`;
    const releasesRef = databaseRef(db, path);
    const releasesMetadata = {
      img: metadata.customMetadata.img,
      like: 0,
      listeners: 0,
      title: metadata.customMetadata.title,
      filename: metadata.customMetadata.filename
    }
    databasePush(releasesRef, releasesMetadata);
  }
  return (
    <div className="action p-3 d-flex justify-content-center align-items-center flex-column">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file-input" aria-label="upload button">
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="2x" />
            <p className="small-text">Upload Snippets</p>
          </label>
          <input id="file-input" style={{ display: "none" }} type="file" onChange={addFile} accept="audio/*" />
        </div>
        <div style={inputFile ? { display: "block" } : { display: "none" }}>
          <div className="d-flex flex-column align-item-center">
            <MetaDataForm />
            <div className="row justify-content-center">
              <div className="col-auto">
                <label htmlFor="file-thumbnail">Upload thumbnail</label>
                <input name="file-thumbnail" type="file" className="form-control" onChange={addImage} aira-lablel="snippet image input" accept="image/*" />
              </div>
            </div>
          </div>
        </div>
        <DisplayFName inputFile={inputFile} />
        <div className="d-flex justify-content-center">
          <input type="submit" style={inputFile ? { display: "block" } : { display: "none" }} />
        </div>
      </form>
      {errorMessage && (<p className="error"> {errorMessage} </p>)}
    </div>
  )
}

/*Form to add title and genre metadata*/
function MetaDataForm({ setImageCallback }) {
  return (
    <div className="">
      <div className="row justify-content-center">
        <div className="col-auto">
          <label>Title</label>
          <div className="input-group mb-3">
            <input name="title" type="text" aria-label="snippet title input" />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <label>Genre(s)</label>
          <div className="input-group mb-3">
            <input name="genres" type="text" aria-label="snippet genre(s) input" />
          </div>
        </div>
      </div>
    </div>
  )
}

function DiscCircle(props) {
  const [amIPlaying, setMe] = useState(false)
  const handleClick = () => {
    if (!props.getPlayingCall() && !amIPlaying) {
      props.audio.play();
      props.setPlayingCall(true);
      setMe(true);
    }
    if (props.getPlayingCall() && amIPlaying){
      props.audio.pause();
      props.setPlayingCall(false);
      setMe(false);
    }
  };
  const style = {backgroundImage: "url('" + props.imageSrc + "')"}
  return (
    <div onClick={handleClick}>
      <div className={(amIPlaying ? "playing " : "") + "circle"} role="img" aria-label={props.imageDesc} style={style}>
      </div>
      {/* <div className="row align-items-center">
        <div className="col">
        </div>
      </div> */}
    </div>
  );
}
