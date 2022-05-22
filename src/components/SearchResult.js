import React from "react";

export function SearchResult({ queryString, dataSet, criteria}) {

    const termList = queryString.split(" ");
    let fullTerm = "";
    const searchTerms = termList.map((term) => {
        if (fullTerm.length > 0){
            fullTerm += (" " + term );
        } else {
            fullTerm = term;
        }
        for (const key in criteria) {
            for (const item of criteria[key]) {
                if (item.toLocaleLowerCase() === fullTerm.toLocaleLowerCase()) {
                    fullTerm = "";
                    let result = {};
                    result[key] = item;
                    return result;
                }
            }
        }
        return null;
    }).filter((e) => {
        return e != null;
    });

    console.log(searchTerms);
    const searchResultData = dataSet.filter((e) => {
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
            <h3 className="text-white mb-3">Results</h3>
            {resultList}
        </div>
    )
}
// d-flex flex-column align-items-center justify-md-content-between
function SearchItem({ profile }) {
    const img = {
        backgroundImage: "url('img/" + profile.img + "')"
    }
    return (
        <div className="item container mb-3">
            <div className="row no-gutters">
                <div className="col-4 col-md-2">
                    <div className="d-flex flex-column align-items-center justify-md-content-between">
                        <a href="profile.html">
                            <div className="profile-img profile-img-small my-3" style={img}>
                            </div>
                        </a>
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
        return <li className="ms-0" key={skill}><a className="filter-item" href="">{skill}</a></li>
    })
    return (
        <ul className="tags tags-skill mb-3 ps-0">
            {skillItems}
        </ul>
    )
}
