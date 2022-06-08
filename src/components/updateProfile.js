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

        values.forEach((elem, i) => {

            if (elem) {
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
            <div className="profile-edit d-flex justify-content-center align-items-center text-start">
                <form onSubmit={handleUpdate}>
                    <div className="d-flex justify-content-between">
                        <h2>Update your profile</h2>
                        <svg className="close" onClick={() => {setForm(false)}} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm7.491 6.432 2.717-2.718c.146-.146.338-.219.53-.219.404 0 .751.325.751.75 0 .193-.073.384-.22.531l-2.717 2.717 2.728 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-2.728-2.728-2.728 2.728c-.147.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
                    </div>
                    <div className="text-start">
                        <div className="input-container">
                            <label>Username</label>
                            <input type="text" placeholder="Username" name="name" onChange={(event) => setUserName(event.target.value)} />
                        </div>
                        <div className="input-container">
                            <label>About me</label>
                            <textarea placeholder="Describe yourself here..." name="bio" onChange={(event) => setUserDesc(event.target.value)}/>
                        </div>
                        <div className="input-container">
                            <label>Email</label>
                            <input placeholder="Your email" pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" type="text" name="email" onChange={(event) => setUserEmail(event.target.value)}/>
                        </div>
                        <div className="input-container">
                            <label>School</label>
                            <input type="text" placeholder="Your University" name="school" onChange={(event) => setUserSchool(event.target.value)}/>
                        </div>
                            <div className="button-container">
                            <input type="submit" />
                        </div>
                    </div>
                </form> 
            </div>
            )}
        </div>
    )
}

