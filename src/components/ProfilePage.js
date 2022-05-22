import React from 'react';
import RELEASES from "../data/releases.json";
import PROFILES from "../data/profiles.json";

export default function ProfilePage(props) {
  let releases = RELEASES.filter(elem => elem.artistId === props.artist);
  let profileInfo = PROFILES.find(elem => elem.id === props.artist);
  let tags = (profileInfo.skill).concat(profileInfo.genre);

  let releaseDiscs = releases.map((elem) => {
    return (
      <AlbumDisc key={elem["releaseId"]} release={elem}/>
    )
  });

  let interestTags = tags.map((elem, index) => {
    if (index < 3) {
      return (
        <LinkTag isFeatured={true} tag={elem} />
      )
    } else {
      return (
        <LinkTag isFeatured={false} tag={elem} />
      )
    }
  })

  return (
    <div id="profile">
      <header className='d-flex flex-column align-items-center justify-content-end pt-3' style={
        {backgroundImage: "linear-gradient(transparent, black 75%), url('../img/" + profileInfo.header + "')"}
      }>
        <DiscCircle imageSrc={profileInfo.img} imageDesc={profileInfo.name}></DiscCircle>
        <div className='d-flex align-items-center'>
          <svg fill="#4287f5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"></path></svg>
          <h1 class="ms-2">{profileInfo.name}</h1>
        </div>
        <p>{profileInfo.school}</p>
        <ul className="links p-0 d-flex">
          <li className="px-2"><a href="#" className='text-light'>Message</a></li>
          <li className="px-2"><a href="#" className='text-light'>Social</a></li>
        </ul>
        <ul className='tags p-0 d-flex justify-content-center'>
          {interestTags}
        </ul>
      </header>
      <section className="px-5 py-2 text-center">
        <h2>Snippets</h2>
        <div className='d-flex flex-wrap justify-content-center'>{releaseDiscs}</div>
      </section>
      <section className="px-5 py-2">
        <h2>Recent Posts</h2>
      </section>
    </div>
  )
};

export function AlbumDisc(props) {
  /* Find the release data in the forms {"likes": "", "listeners": ""} */
  let myRelease = props.release;
  return (
    <div class="album flex-grow-1 flex-shrink-1 p-3">
      <div>
        <DiscCircle imageSrc={myRelease.img} imageDesc={myRelease.title} />
        <p>{myRelease.title}</p>
      </div>
      <div className='desc'>
        <div className='d-flex align-items-center'>
        <svg class="mr-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#fff" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"></path></svg>
        <p className='m-0 p-1'>{myRelease.likes}</p>
        </div>
      </div>
      <div className='desc'>
        <div className='d-flex align-items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M6 7l8-5v20l-8-5v-10zm-6 10h4v-10h-4v10zm20.264-13.264l-1.497 1.497c1.847 1.783 2.983 4.157 2.983 6.767 0 2.61-1.135 4.984-2.983 6.766l1.498 1.498c2.305-2.153 3.735-5.055 3.735-8.264s-1.43-6.11-3.736-8.264zm-.489 8.264c0-2.084-.915-3.967-2.384-5.391l-1.503 1.503c1.011 1.049 1.637 2.401 1.637 3.888 0 1.488-.623 2.841-1.634 3.891l1.503 1.503c1.468-1.424 2.381-3.309 2.381-5.394z"></path></svg>
        <p className='m-0 p-1'>{myRelease.listeners}</p>
        </div>
      </div>
    </div>
  )
}

export function PostCard(props) {
  // Input in the form {"title": "dasf", "text": "sadfds"}
  
}

export function LinkTag(props) {
  return (
    <li className={( props.isFeatured ? "bg-feature " : "") + 'highlight d-inline-block'}>
      <a className={props.isFeatured ? "text-dark": "text-light"} href={"/search?search_query=" + props.tag}>{props.tag}</a>
    </li>
  )
}

function DiscCircle(props) {
  return (
    <div className="circle" role="img" alt={props.title} style={{backgroundImage: "url(img/" + props.imageSrc + ")"}}/>
  );
}