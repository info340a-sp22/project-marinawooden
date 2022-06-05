import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from 'firebase/database';

export function SearchResult({ queryString}) {

    const termList = queryString.split(" ");
    const [profData, setProfData] = useState([]);
    const [critData, setCritData] = useState({});
    // fetching data from firebase database.
    useEffect(() => {
        const db = getDatabase();
        const profRef = ref(db, "profiles");
        const unregisterListenerProfile = onValue(profRef, (snapshot) => {
            const profSnapshot = snapshot.val();
            const profKeys = Object.keys(profSnapshot);
            const newProfArray = profKeys.map((keyString) => {
                return profSnapshot[keyString];
            })
            setProfData(newProfArray);
        })
        const criteriaRef = ref(db, "criteria");
        const unregisterListenerCriteria = onValue(criteriaRef, (snapshot) =>{
            const critSnapshot = snapshot.val();
            const hasKey = Object.keys(critSnapshot);
            let critObj = {};
            for (const key in critSnapshot[hasKey]) {
                critObj[key] = critSnapshot[hasKey][key];
            }
            setCritData(critObj);
        })
        function cleanup() {
            unregisterListenerProfile();
            unregisterListenerCriteria();
        }
        return cleanup;
    }, [setProfData, setCritData]);

    // build up term until term matches up with a criteria
    // however, if term is full build without finding a criteria
    // a 'name' criteria is given to the term. Filter out any null
    // return.
    let fullTerm = "";
    const searchTerms = termList.map((term, index) => {
        if (fullTerm.length > 0) {
            fullTerm += (" " + term);
        } else {
            fullTerm = term;
        }
        for (const key in critData) {
            for (const item of critData[key]) {
                if (item.toLocaleLowerCase() === fullTerm.toLocaleLowerCase()) {
                    fullTerm = "";
                    let result = {};
                    result[key] = item;
                    return result;
                }
            }
        }
        if ((index === (termList.length - 1)) && (fullTerm !== "")) {
            let result = {};
            result['name'] = fullTerm;
            return result;
        }
        return null;
    }).filter((e) => {
        return e != null;
    });
    // compare data from criteria data to given term to find profiles 
    // in database. if a match, keep the profile in the result
    const searchResultData = profData.filter((e) => {
        let categories = {
            skill: null,
            school: null,
            genre: null,
            name: null
        }
        let include = false;
        if (searchTerms) {
            for (const index in searchTerms) {
                const obj = searchTerms[index];
                const key = Object.keys(obj)[0];
                const value = obj[key];
                console.log(e[key]);
                console.log(value);

                if (e[key]) {
                    if (key === "skill") {
                        categories['skill'] = e[key].includes(value);
                    }
                    if (key === "genre") {
                        categories['genre'] = e[key].includes(value)
                    }
                    if (key === "name") {
                        categories['name'] = (e[key] === value);
                    }
                    if (key === "school") {
                        categories['school'] = (e[key] === value);
                    }
                }
            }
        }
        for (const topic in categories) {
            if (categories[topic] === false) {
                return false;
            }
            if (categories[topic] === true) {
                include = true;
            }
        }
        return include;
    })

    const resultList = searchResultData.map((e) => {
        return (
            <SearchItem key={e["id"]} profile={e} />
        )
    })

    return (
        <div className="container">
            <h3 className="text-white mb-3">{(resultList.len > 0) ? "Result":""}</h3>
            {resultList}
        </div>
    )
}
// d-flex flex-column align-items-center justify-md-content-between
function SearchItem({ profile }) {
    const img = {
        // backgroundImage: "url('img/" + profile.img + "')";
        borderRadius: "50%",
        objectFit: "cover",
        height: "100px",
        width: "100px"
    }
    return (
        <div className="item container mb-3">
            <div className="row no-gutters">
                <div className="col-4 col-md-2">
                    <div className="d-flex flex-column align-items-center justify-md-content-between">
                        <Link to={"profile/" + profile.id}>
                            {/* <div className="profile-img profile-img-small my-3" style={img}>
                            </div> */}
                            <img src={"img/" + profile.img + ""} alt={profile.name + "'s profile"} style={img} className="my-3 mb-4"/>
                        </Link>
                        <button className="col-auto btn btn-light" type="button">Follow</button>
                    </div>
                </div>
                <div className="col text-white">
                    <div className="d-flex flex-column justify-content-between">
                        <p className="mb-0">{profile.name}</p>
                        <p className="school mb-0 text-secondary">{profile.school}</p>
                        <SearchTagList skills={profile.skill} />
                        <p className="d-none d-md-block text-wrap text-break fs-6 fw-lighter text-truncate">{profile.desc}</p>
                        <p className="follower-count mb-0">{profile.follower} Followers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SearchTagList({ skills }) {
    const skillItems = skills.map((skill) => {
        return (
        <li className="ms-0" key={skill}>
            <Link to={"/search?search_query=" + skill} className="filter-item">{skill}</Link>
        </li>
        )
    })
    return (
        <ul className="tags tags-skill mb-3 ps-0">
            {skillItems}
        </ul>
    )
}
