
import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { getDatabase, ref, set as firebaseSet, child } from "firebase/database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit} from "@fortawesome/free-solid-svg-icons";

const cookie = new Cookies();
const userHash = cookie.get("userHash");



export function UserUpdate (props) {
    const [displayForm, setForm] = useState(false);
    let cookie = new Cookies();
    const userHash = cookie.get("userHash");
    const [displayName, setName] = useState('Update Profile');
    
    const handleUpdate = (event) => {

        const db = getDatabase();
        const path = `profiles/${userHash}`;
        const userRef = ref(db, path);
    
        firebaseSet(child(userRef, "name"), event.target.name.value);
        firebaseSet(child(userRef, "desc"), event.target.bio.value);
        firebaseSet(child(userRef, "email"), event.target.email.value);
        firebaseSet(child(userRef, "school"), event.target.school.value);
    
    }

    let sdisplayForm = () => {
        setName('enter')
        setForm(!displayForm);
    }

    if (userHash) {
        
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
                    <input type="text" name="name" />
                </div>
                <div className="input-container">
                    <label>About me</label>
                    <input type="text" name="bio" />
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input type="text" name="email" />
                </div>
                <div className="input-container">
                    <label>School</label> 
                    <input type="text" name="school" />
                </div>
                    <div className="button-container">
                    <input type="submit" />
                </div>
            </form> 
        )}
      </div>
    )
}

