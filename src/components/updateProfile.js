
import { text } from "@fortawesome/fontawesome-svg-core";
import { getAuth, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";

const handleUpdate = (event) => {

    event.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    // if (user !== null) {
    //     user.providerData.forEach((profile) => {
    //     console.log("Sign-in provider: " + profile.providerId);
    //     console.log("  Provider-specific UID: " + profile.uid);
    //     console.log("  Name: " + profile.displayName);
    //     console.log("  Email: " + profile.email);
    //     console.log("  Photo URL: " + profile.photoURL);
    //     });
    // }

    console.log(user.password);

    updateProfile(user, {
        displayName: event.target[0].value, photoURL: event.target[1].value
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        //error.message
      });
    
      console.log("  Name: " + user.displayName);

}

export function UserUpdate () {
    const [displayForm, setForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    let sdisplayForm = () => {
        setForm(!displayForm);
    }
  
    return (
      <div>
        <form>
          <button onClick={sdisplayForm}>click</button>
        </form>
  
        {displayForm && (
            <form onSubmit={handleUpdate}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="email" required />
                </div>
                <div className="input-container">
                    <label>Image </label>
                    <input type="file" value={selectedFile} onChange={(e) => setSelectedFile(e.target.files[0])} />
                </div>
            </form> 
        )}
      </div>
    )
}

