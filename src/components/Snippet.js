import React, { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faPlay } from "@fortawesome/free-solid-svg-icons";
import { getDatabase, ref as databaseRef, push as databasePush, onValue } from "firebase/database";

const DEF_IMAGE = "https://firebasestorage.googleapis.com/v0/b/musicroom-196ba.appspot.com/o/img%2Fdefault_record.png?alt=media&token=436317b5-20d6-4b28-8d95-3b9e2efba34b";

function DisplayFName({ inputFile }) {
  if (inputFile) {
    return (
      <p className="text-center text-break small-text">{inputFile.name}</p>
    )
  } else {
    return (
      <></>
    )
  }
}

export function PlaySong({artist, snippet, imageSrc, imageDesc, setPlayingCall, getPlayingCall}) {
  let upload;
  const [buttonName, setButtonName] = useState("Play");
  const [disable, setDisable] = useState(true);
  const [audio, setAudio] = useState("");
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
export function UploadSnippet({ profileInfo, uploader }) {
  const [inputFile, setFile] = useState("");
  const [inputImage, setImage] = useState("");
  const [imageSrc, setImageSrc] = useState(DEF_IMAGE);
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

    if (uploader && uploader !== null) {
      if (inputFile && inputImage) {
        if (isValidFileUploaded(inputFile)) {
          const imagePath = "img/" + uploader + "/" + inputImage.name;
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
          const snipPath = "snippets/" + uploader + "/" + event.target.title.value;
          event.target.title.value = "";
          event.target.genres.value = "";
          const snippetsRef = storageRef(storage, snipPath);
          uploadBytes(snippetsRef, inputFile, metaData)
            .then((snapshot) => {
              setFile(); // clear file
            }).catch((error) => {
              setErrorMessage(error.code);
            })
          const imagesRef = storageRef(storage, imagePath);
          uploadBytes(imagesRef, inputImage)
            .then((snapshot) => {
              updateRelease(metaData, uploader);
              setImage();
            }).catch((error) => {
              setErrorMessage(error.code);
            })
        } else {
          alert("That file type is not supported!");
        }
      }
      event.target.title.value = "";
      event.target.genres.value = "";
      setImage();
      setImageSrc(DEF_IMAGE);
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

  function changeSrc(e) {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImageSrc(URL.createObjectURL(img));
      addImage(e);
    }
  }

  const uploadIcon = (
    <div>
      <label htmlFor="file-input" aria-label="upload button">
        <FontAwesomeIcon icon={faArrowUpFromBracket} size="2x" />
        <p className="small-text">Upload Snippets</p>
      </label>
      <input id="file-input" style={{ display: "none" }} type="file" onChange={addFile} accept="audio/*" />
    </div>
  );
  return (
      <>
        {!inputFile ? uploadIcon : <></>}
        <div className={(!inputFile ? "d-none " : "d-flex ") + "profile-edit justify-content-center align-items-center text-start"}>
          <form onSubmit={handleSubmit} className="d-inline-flex flex-column justify-content-between mh-75">
            <div className="d-flex justify-content-between">
              <h2>Upload a Snippet</h2>
              <svg className="close" onClick={() => {setFile()}} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm7.491 6.432 2.717-2.718c.146-.146.338-.219.53-.219.404 0 .751.325.751.75 0 .193-.073.384-.22.531l-2.717 2.717 2.728 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-2.728-2.728-2.728 2.728c-.147.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
            </div>
            <MetaDataForm />
            <div className="snippet-prev mx-auto">
              <div className="circle" style={{backgroundImage: `url('${imageSrc}')`}}></div>
              <div>
                <div className="image-upload">
                  <label for="thumb-input" className="mw-3 d-flex justify-content-between align-items-center">
                  <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm-2-9h4v1h-4v-1zm0 3v-1h4v1h-4zm2-13l6 6h-4v3h-4v-3h-4l6-6z"/></svg>
                    <p className="m-2">Upload Thumbnail</p>
                  </label>
                  <input className="d-none" id="thumb-input" name="file-thumbnail" type="file" onChange={changeSrc} aria-label="snippet image input" accept="image/*" />
                </div>
              </div>
              <DisplayFName inputFile={inputFile} />
              <div className="d-flex justify-content-center">
                <input type="submit" style={inputFile ? { display: "block" } : { display: "none" }} />
              </div>
            </div>
          </form>
          {errorMessage && (<p className="error"> {errorMessage} </p>)}
        </div>
      </>
  )
}

/*Form to add title and genre metadata*/
function MetaDataForm({ setImageCallback }) {
  return (
    <div className="mb-4">
      <div className="d-flex flex-column mb-3">
        <label>Title</label>
        <input name="title" type="text" aria-label="snippet title input" />
      </div>
      <div className="d-flex flex-column mb-2">
        <label>Genre(s)</label>
        <input name="genres" type="text" aria-label="snippet genre(s) input" />
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
    </div>
  );
}
