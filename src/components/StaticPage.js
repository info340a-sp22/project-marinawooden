import React from "react";
import NavBar from "./NavBar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";

export function AboutUs(props) {
    return (
        <div>
            <NavBar />
            <header className="container-fluid text-white py-5" style={{ backgroundColor: "#5D3FD3" }}>
                <Link to="*" className="logo">
                    <img src="/img/logo.png" className="img-responsive position-relative top-0 start-50 translate-middle-x mb-4" alt="MusicRoom logo" width="100" height="100" />
                </Link>
                <h1 className="text-center">MusicRoom</h1>
                <p className="lead text-center" id="motto">
                    Where
                    <span className="text-secondary"> collaboration </span>
                    creates
                    <span className="text-secondary"> innovation.</span>
                </p>
            </header>
            <main>
                <div className="container">
                    <section id="introduction" className="row align-items-center hello-box">
                        <IntroAboutUs />
                    </section>

                    <section id="about" className="about-us-box">
                        <AboutAboutUs />
                    </section>

                    <section id="purpose" className="our-purpose-box">
                        <PurposeAboutUs />
                    </section>

                    <section id="features" className="features-box">
                        <FeaturesAboutUs />
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}

function IntroAboutUs() {
    return (
        <div className="container py-4">
            <div className="row">
                <div className="col order-md-1">
                    <div className="row">
                        <img src="/img/Music_Isometric.svg" className="img-fluid" alt="Person dancing on vinyl record" />
                    </div>
                </div>
                <div id="md-intro" className="col order-md-0 text-center text-md-left d-none d-md-block">
                    <div className="pt-3 pt-md-0 col-12">
                        <h2 style={{ color: "gold" }}>What is MusicRoom?</h2>
                        <p className="d-none d-md-block">
                            Welcome to <em>MusicRoom</em>! We're a <em>music-sharing platform</em> for <em>college creatives </em>
                            looking to share their music and collaborate with other musicians in
                            their area! We know how hard it can be to find other musicians and network. We aim to provide a <em>user-friendly interface</em> and platform to provoke collaboration — after all, <em>collaboration creates innovation.</em>
                        </p>
                    </div>
                </div>
            </div>
            <div id="mobile-intro" className="row text-center d-md-none">
                <h2 style={{ color: "gold" }}>What is MusicRoom?</h2>
                <p className="mb-5">
                    Welcome to <em>MusicRoom</em>! We're a <em>music-sharing platform</em> for <em>college creatives</em>
                    looking to share their music and collaborate with other musicians in
                    their area!
                </p>
                <p>
                    We know how hard it can be to find other musicians and network. We aim to provide a <em>user-friendly interface</em> and platform to provoke collaboration — after all, <em>collaboration creates innovation.</em>
                </p>
            </div>
        </div>
    )
}

function AboutAboutUs() {
    return (
        <div className="container py-4">
            <div className="row mb-5">
                <div className="col">
                    <div className="row">
                        <img src="img/Music_Monochromatic.svg" className="img-fluid" alt="Person dancing to music" />
                    </div>
                </div>
                <div id="md-about" className="col text-center text-md-left d-none d-md-block">
                    <div className="pt-3 pt-md-0 col-12">
                        <h2 style={{ color: "gold" }}>Why did we make this app?</h2>
                        <p>
                            Many existing platforms let users share their music such as Spotify, Instagram,
                            and SoundCloud, but there are no designated platforms that are <em>solely dedicated
                                to musicians and connecting them online</em>. MusicRoom is for musicians, specifically
                            musicians in colleges and universities nationwide. It provides a place for college
                            students to <em>share songs, form groups, and interact with other student musicians</em>.
                            We think our app should work intuitively, as we used common design conventions and
                            features that are seen in other social apps.
                        </p>
                        <p>
                            MusicRoom enables users to search based on their interests. For example, a student
                            can look for a singer near their location by searching for schools local to them.
                            Users can also search based on skills and genre; we want to include musicians of
                            diverse backgrounds and experiences. We account for skill sets, genres, and school
                            attending as <em>we want musicians to highlight the key details when connecting</em>. The
                            app additionally encourages users to share their snippets online when they want to
                            share their songs and musical projects. Through a platform that lets users interact
                            with other works, it forms interactions and communities between musicians when
                            discovering new and trending music made by other students. The app supplements
                            musicians in colleges and universities to be creative and innovative by fueling
                            inspiration and discovery, <em>what will you create on MusicRoom?</em>
                        </p>
                    </div>
                </div>
            </div>
            <div className="row text-center d-md-none">
                <h2 className="mb-4" style={{ color: "gold" }}>Why did we make this app?</h2>
                <p>
                    Many existing platforms let users share their music such as Spotify, Instagram,
                    and SoundCloud, but there are no designated platforms that are <em>solely dedicated
                        to musicians and connecting them online </em>.
                </p>
                <p>
                    MusicRoom is for musicians, specifically
                    musicians in colleges and universities nationwide. It provides a place for college
                    students to <em>share songs, form groups, and interact with other student musicians</em>.
                </p>
            </div>
        </div>
    )
}

function PurposeAboutUs() {
    return (
        <div className="row py-5">
            <div className="container text-center text-md-left">
                <div className="col-12 text-center">
                    <h1 className="font-weight-bold mb-5" style={{ color: "gold" }}>Our Mission</h1>
                    <img src="/img/music1.svg" className="img-fluid mb-4" alt="People working together on music note" />
                    <p className="d-none d-md-block">
                        Current music-sharing social media platforms suffer from the oversaturation of
                        posts. For example, <em>20%</em> of Spotify’s catalog has no streams whatsoever
                        (Eriksson 2019). This poses the question — <em>how many songs are there that have the
                            potential to be successful but are not due to being overshadowed on the platform? </em>
                        Furthermore, current music streaming platforms focus more on broadcasting music
                        rather than driving collaboration and building a community of musicians. <em>How can
                            we provide more exposure for beginning and young artists?</em> To address both issues,
                        we thought that providing a platform for these artists who might have a
                        challenging time getting a foothold in the music industry would be helpful.
                    </p>
                    <p className="d-none d-md-block">
                        Our idea was also motivated by our firsthand experiences. We are more than just
                        students and developers — we have <em>personal hobbies</em> and one of which is
                        <em> creating</em> music. However, <em>as people who are not actively pursuing a
                            career in music or musical education</em>, we have <em>found it hard to create
                                the same network</em> as we have in the fields that we are studying. We have
                        found that currently <em>there are few social networking platforms that
                            specifically cater to connecting young creatives</em>, and those that do are
                        either much <em>too specialized</em> or <em>have a poor interface design</em>
                        that is hard to use. Because of this, our focus was to create a platform that
                        young musicians would want to use, whose design was easy to use, and
                        <em> aesthetically ambiguous</em>, so as not to inadvertently prioritize a
                        certain style of musician over another.
                    </p>
                    <p className="d-md-none">
                        Current music-sharing social media platforms suffer from the oversaturation of
                        posts. Furthermore, current music streaming platforms focus more on broadcasting music
                        rather than driving collaboration and building a community of musicians.
                    </p>
                    <p className="d-md-none">
                        To address both issues,
                        we thought that providing a platform for these artists who might have a
                        challenging time getting a foothold in the music industry would be helpful.
                    </p>
                    <p className="d-md-none">
                        Our idea was also motivated by our firsthand experiences. We are more than just
                        students and developers — we have <em>personal hobbies</em> and one of which is
                        <em>creating</em> music.
                    </p>
                    <p className="d-md-none">
                        <em>As people who are not actively pursuing a
                            career in music or musical education</em>, we have <em>found it hard to create
                                the same network</em> as we have in the fields that we are studying.
                    </p>
                    <p className="d-md-none">
                        Because of this, our focus was to create a platform that
                        young musicians would want to use, whose design was easy to use, and
                        <em>aesthetically ambiguous</em>, so as not to inadvertently prioritize a
                        certain style of musician over another.
                    </p>
                </div>
            </div>
        </div>
    )
}

function FeaturesAboutUs() {
    return (
        <div>
            <div className="py-5">
                <div className="container text-center text-md-left">
                    <div className="col-12 text-center">
                        <h1 className="font-weight-bold" style={{ color: "gold" }}>Features</h1>
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <div className="row">
                    <h2 className="text-center mb-4 d-md-none" style={{ color: "gold" }}>User Profiles</h2>
                    <div className="col order-md-1">
                        <div className="row d-md-none">
                            <img src="img/userprofile.png" className="img-fluid" width="250" height="500" alt="Phone User Interaface for a profile page" />
                        </div>
                        <div className="row d-none d-md-block">
                            <img src="img/userprofile.png" className="img-fluid d-none d-md-block" width="250" height="500" alt="Phone User Interaface for a profile page" />
                        </div>
                    </div>
                    <div className="col order-md-0 text-center text-md-left d-none d-md-block">
                        <div className="pt-3 pt-md-0 col-12">
                            <h2 style={{ color: "gold" }}>User Profiles</h2>
                            <p>
                                The most essential aspect of the app is the profile page, which allows users to display their skills, genre, school, about, snippets, and posts. External apps such as Spotify, Youtube, and Instagram are also linked to the app; users can go to the external apps from there because those apps are very popular and users want to share their interests with other musicians. Users will find the snippets section particularly useful; they may remove and change the snippets. They can also manage and view comments on their posts, as well as remove and edit them.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <div className="row">
                    <h2 className="text-center mb-4 d-md-none" style={{ color: "gold" }}>Search Filters</h2>
                    <div className="col">
                        <div className="row d-md-none">
                            <img src="img/searchfilters.png" className="img-fluid" width="250" height="500" alt="Phone User Interface for the Search and Filter Page" />
                        </div>
                        <div className="row d-none d-md-block">
                            <img src="img/searchfilters.png" className="img-fluid d-none d-md-block" width="250" height="500" alt="Phone User Interface for the Search and Filter Page" />
                        </div>
                    </div>
                    <div className="col text-md-left d-none d-md-block">
                        <div className="pt-3 pt-md-0 col-12">
                            <h2 className="text-center" style={{ color: "gold" }}>Search Filters</h2>
                            <p className="text-center">
                                Users can search for other musicians using search categories such as skills, genre, and school since these criteria would fit their demands when looking for other musicians.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <div className="row">
                    <h2 className="text-center mb-4 d-md-none" style={{ color: "gold" }}>Just For You</h2>
                    <div className="col order-md-1">
                        <div className="row d-md-none">
                            <img src="img/justforyou.png" className="img-fluid d-md-none" width="250" height="500" alt="Phone User Interface for the For You Page" />
                        </div>
                        <div className="row d-none d-md-block">
                            <img src="img/justforyou.png" className="img-fluid d-none d-md-block" width="250" height="500" alt="Phone User Interface for the For You Page" />
                        </div>
                    </div>
                    <div className="col order-md-0 text-center text-md-left d-none d-md-block">
                        <div className="pt-3 pt-md-0 col-12">
                            <h2 style={{ color: "gold" }}>Just For You</h2>
                            <p>
                                The app's "Just for you" page allows users to browse recommended singers, drummers, and popular snippets depending on their search as suggestions are frequently highly beneficial when users are unable to find favorites.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <div className="row">
                    <h2 className="text-center mb-4 d-md-none" style={{ color: "gold" }}>Upload Media</h2>
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="row d-md-none">
                            <img src="/img/snippets.png" className="img-fluid d-md-none" width="250" height="500" alt="Phone User Interface for uploading music" />
                        </div>
                        <div className="row d-none d-md-block">
                            <img src="/img/snippets.png" className="img-fluid d-none d-md-block" width="250" height="500" alt="Phone User Interface for uploading music" />
                        </div>
                    </div>
                    <div className="col text-center text-md-left d-none d-md-block">
                        <div className="pt-3 pt-md-0 col-12">
                            <h2 style={{ color: "gold" }}>Upload Media</h2>
                            <p>
                                Users can upload their snippets, images, and descriptions in several formats on the upload page because users would expect to upload different files.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}