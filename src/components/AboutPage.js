// not using for about page. Consider removal.
import React, { useState } from "react";
import NavBar from "./NavBar";

export default function AboutPage(){
    return (   
    <div>
        <NavBar/>
        <div id="aboutPage">
            <header className="container-fluid text-white py-5" style={{backgroundColor:"#5D3FD3"}}>
                <a className="logo"><img src="img/logo.png" className="img-responsive position-relative top-0 start-50 translate-middle-x mb-4" alt="MusicRoom logo" width="100" height="100"/></a>
                <h1 className="text-center">MusicRoom</h1>
                <p className="lead text-center" id="motto">
                    Where
                    <span className="text-secondary">collaboration</span>
                    creates
                    <span className="text-secondary">innovation.</span>
                </p>
            </header>
            <main>
                <div className="container">
                {/* Introductory Section */}
                <section className="row align-items-center hello-box" style={{backgroundColor:"black"}}e>
                    <div className="container py-4">
                        <div className="row">
                            <div className="col d-flex justify-content-center align-items-center order-md-1">
                                <img src="img/Music_Isometric.svg" className="img-fluid" alt="Person dancing on vinyl record"/>
                            </div>
                            <div className="col d-flex justify-content-center align-items-center order-md-0 text-center text-md-left">
                                <div className="pt-3 pt-md-0 col-12">
                                    <h2 style={{color: "gold"}}>What is MusicRoom?</h2>
                                    <p style={{color:"white"}}>
                                    Welcome to <em>MusicRoom</em>! We're a <em>music-sharing platform</em> for <em>college creatives </em> 
                                    looking to share their music and collaborate with other musicians in 
                                    their area! We know how hard it can be to find other musicians and network. We aim to provide a <em>user-friendly interface</em> and platform to provoke collaboration — after all, <em>collaboration creates innovation.</em>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </main>
        </div>
    </div>
    );
}