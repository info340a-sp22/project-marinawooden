import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket} from "@fortawesome/free-solid-svg-icons";

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

export function PlaySong({ profileInfo, genres }) {
  let upload;
  const [buttonName, setButtonName] = useState("Play");
  const [disable, setDisable] = useState(true);
  const [audio, setAudio] = useState();
  const [inputFile, setFile] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (upload) {
      upload.pause();
      upload = null;
      setButtonName("Play");
    }
    if (audio) {
      upload = new Audio(audio);
      upload.onended = () => {
        setButtonName("Play");
      };
    }
  }, [audio]);

  const handleClick = () => {
    if (buttonName === "Play") {
      upload.play();
      setButtonName("Pause");
    } else {
      upload.pause();
      setButtonName("Play");
    }
  };


  return (
    <div>
      {/* <button disabled={disable} onClick={handleClick}>{buttonName}</button> */}
      {errorMessage && (<p className="error"> {errorMessage} </p>)}
    </div>
  )
}

// upload an audio file to the firebase database
export function UploadSnippet({ profileInfo }) {
  const [inputFile, setFile] = useState();
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

  // if audio file is in an accepted format,
  // upload the file to firebase storage along sides
  // metadata about the songs
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputFile) {
      if (isValidFileUploaded(inputFile)) {
        setErrorMessage('');
        const metaData = {
          customMetadata: {
            userId: profileInfo.id,
            title: event.target.title.value,
            artist: profileInfo.name,
            genres: event.target.genres.value
          }
        }
        const storage = getStorage();
        const path = "snippets/" + event.target.title.value;
        event.target.title.value = "";
        event.target.genres.value = "";
        const snippetsRef = ref(storage, path);
        uploadBytes(snippetsRef, inputFile, metaData)
          .then((snapshot) => {
            setFile();
          }).catch((error) => {
            setErrorMessage(error.code);
          })
      }
      else {
        setErrorMessage('Please input correct file type');
        setFile();
      }
    }
    setFile();
  }
  console.log(inputFile);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          <label htmlFor="file-input" aria-label="upload button">
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="2x"/>
          </label>
          <input id="file-input" style={{ display: "none" }} type="file" onChange={addFile} accept="audio/*"/>
        </div>
        <div style={inputFile ? { display: "block" } : { display: "none" }}>
          <div className="d-flex justify-content-center">
            <MetaDataForm />
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
function MetaDataForm() {
  return (
    <div className="">
      <div className="row justify-content-center">
        <div className="col-auto">
          <label>Title</label>
          <div className="input-group mb-3">
            <input name="title" type="text" aira-lablel="snippet title input" />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <label>Genre(s)</label>
          <div className="input-group mb-3">
            <input name="genres" type="text" aira-lablel="snippet genre(s) input" />
          </div>
        </div>
      </div>
    </div>
  )
}
