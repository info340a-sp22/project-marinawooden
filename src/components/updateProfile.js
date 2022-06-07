
import { text } from "@fortawesome/fontawesome-svg-core";
import { getAuth, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getDatabase, ref, onValue, set as firebaseSet, child } from "firebase/database";

const handleUpdate = (event) => {

    const cookie = new Cookies();
    const userHash = cookie.get("userHash");

    const db = getDatabase();
    const path = `profiles/${userHash}`

    const userRef = ref(db, path);

    firebaseSet(child(userRef, "name"), event.target.name.value);

}

export function UserUpdate () {
    const [displayForm, setForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    let sdisplayForm = () => {
        setForm(!displayForm);
    }
  
    return (
      <div>
        <button onClick={sdisplayForm}>click</button>
  
        {displayForm && (
            <form onSubmit={handleUpdate}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="name" required />
                </div>
                <div className="input-container">
                    <label>Bio </label>
                    <input type="text" name="Bio" />
                </div>
                <div className="button-container">
                <input type="submit" />
                </div>

            </form> 
        )}
      </div>
    )
}

