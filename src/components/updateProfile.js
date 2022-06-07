import React, { useState } from "react";
import Cookies from "universal-cookie";
import { getDatabase, ref, set as firebaseSet, child } from "firebase/database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit} from "@fortawesome/free-solid-svg-icons";

export function UserUpdate (props) {
    const [displayForm, setForm] = useState(false);
    const [displayName, setName] = useState('Update Profile');
    
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userDesc, setUserDesc] = useState("");
    const [userSchool, setUserSchool] = useState("");

    const userHash = props.uploader;
    
    const handleUpdate = (event) => {
        const db = getDatabase();
        const path = `profiles/${userHash}`;
        const userRef = ref(db, path);
        const fields = ["name", "email", "desc", "school"];
        const values = [userName, userEmail, userDesc, userSchool];

        console.log(event.target);
        console.log(values);

        values.forEach((elem, i) => {

            if (elem) {
                console.log("reached! for: " + elem);
                firebaseSet(child(userRef, fields[i]), elem);
            }
        });
    }

    let sdisplayForm = () => {
        setName('enter')
        setForm(!displayForm);
    }

    return (
      <div>
        <label className="input-container" onClick={sdisplayForm}>
            <FontAwesomeIcon icon={faEdit} size="2x" /> 
            <p className="small-text"> {displayName}</p>
        </label>
  
        {displayForm && (
            <form onSubmit={handleUpdate}>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" name="name" onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div className="input-container">
                    <label>About me</label>
                    <input type="text" name="bio" onChange={(event) => setUserDesc(event.target.value)}/>
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input type="text" name="email" onChange={(event) => setUserEmail(event.target.value)}/>
                </div>
                <div className="input-container">
                    <label>School</label> 
                    <input type="text" name="school" onChange={(event) => setUserSchool(event.target.value)}/>
                </div>
                    <div className="button-container">
                    <input type="submit" />
                </div>
            </form> 
        )}
      </div>
    )
}

