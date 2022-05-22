import React from 'react';
import RELEASES from "../data/releases.json";

export default function ProfilePage(props) {
  let byArtist = RELEASES.filter(elem => elem.artistId === parseInt(props.artist));
  let releaseDiscs = byArtist.map((elem) => {
    return (
      <AlbumDisc key={elem["releaseId"]} release={elem}/>
    )
  });

  return (
    <>
      <section className="px-5 py-2 text-center">
        <h2>Snippets</h2>
        <div className='d-flex flex-wrap'>{releaseDiscs}</div>
      </section>
    </>
  )
};

export function AlbumDisc(props) {
  /* Find the release data in the forms {"likes": "", "listeners": ""} */
  let myRelease = props.release;
  return (
    <div class="album">
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

export function LinkTag(props) {

}

function DiscCircle(props) {
  return (
    <img className="circle m-3" src={"img/" + props.imageSrc} alt={props.title}/>
  );
}