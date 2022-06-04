import React, { useState, useEffect } from "react";

let upload;
const PlaySong = () => {
  const [buttonName, setButtonName] = useState("Play");
  const [disable, setDisable] = useState(true);
  const [audio, setAudio] = useState();
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

// check if file type excepted
const isValidFileUploaded=(file)=>{
  const validExtensions = ['m4a']
  console.log(file);
  const fileExtension = file.name.split('.').pop();
  return validExtensions.includes(fileExtension)
}

// upload file

  const addFile = (songFile) => {
    
      const file = songFile.target.files[0]
        if (isValidFileUploaded(file)) {
          setAudio(URL.createObjectURL(file));
          setDisable(false);
          setErrorMessage('');
        }
        else {
          setAudio();
          setErrorMessage('Please input correct file type');
        }    
  };

  return (
    <div>
      <button disabled={disable} onClick={handleClick}>{buttonName}</button>
      <input type="file" onChange={addFile} />
      {errorMessage && (<p className="error"> {errorMessage} </p>)}
    </div>
  );
};

export default PlaySong;
