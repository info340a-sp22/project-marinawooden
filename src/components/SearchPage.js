import React, { useState } from "react";

export function SearchPage({ searchTerms, dataSet }) {
    const searchResultData = dataSet.filter((e) => {
        if (searchTerms) {
            for (const index in searchTerms) {
                const obj = searchTerms[index];
                const key = Object.keys(obj)[0];
                const value = obj[key];
                if (key === "skill") {
                    if (e[key].includes(value)) {
                        return true;
                    }
                } else {
                    if (e[key] === value) {
                        return true;
                    }
                }
            }
        }
        return false;
    })
    const resultList = searchResultData.map((e) => {
        return (
            <SearchResult key={e["id"]}profile={e} />
        )
    })

    return (
        <div className="container">
            <h3 className="text-white mb-3">Results</h3>
            {resultList}
        </div>
    )
}

function SearchResult({ profile }) {
    const img = {
        backgroundImage: "url('" + profile.img + "')"
    }
    return (
        <div className="item container mb-3">
            <div className="row no-gutters">
                <div className="col-4 col-md-2 d-flex flex-column align-items-center justify-md-content-between">
                    <a href="profile.html">
                        <div className="profile-img profile-img-small my-3" style={img}>
                        </div>
                    </a>
                    <button className="btn btn-light" type="button">Follow</button>
                </div>
                <div className="col d-flex flex-column text-white">
                    <p className="mb-0">{profile.name}</p>
                    <p className="school mb-0 text-secondary">{profile.school}</p>
                    <SearchTagList skills={profile.skill} />
                    <div className="d-none d-md-block mb-3">
                        <p className="text-wrap text-break fs-6 fw-lighter text-truncate">{profile.desc}</p>
                    </div>
                    <p className="follower-count">{profile.follower} Followers</p>
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