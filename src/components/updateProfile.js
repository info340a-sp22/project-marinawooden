
import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { getDatabase, ref, set as firebaseSet, child } from "firebase/database";

const cookie = new Cookies();
const userHash = cookie.get("userHash");


export function UserUpdate (props) {
    const [displayForm, setForm] = useState(false);
    let cookie = new Cookies();
    const userHash = cookie.get("userHash");

    let sdisplayForm = () => {
        setForm(!displayForm);
    }

    const handleUpdate = (event) => {

        const db = getDatabase();
        const path = `profiles/${userHash}`;
        const userRef = ref(db, path);
    
        firebaseSet(child(userRef, "name"), event.target.name.value);
        firebaseSet(child(userRef, "desc"), event.target.bio.value);
    
    }

    return (
      <div>
        <button onClick={sdisplayForm}>click</button>
  
        {displayForm && (
            <form onSubmit={handleUpdate}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="name" />
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

