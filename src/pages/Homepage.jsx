import React, { useState, useRef } from 'react';
import videoSrc from "/images/videoGoingCarefree.mp4"; 

import play from "/images/play.png"



function Homepage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null); 




  const handlePlayVideo = () => {
    const video = videoRef.current; 
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying); 
  };

  return (

    <div  >
    <div className='video-wrapper'> 
      {/* <h1 className='text-center text-white text-customSize font-extrabold pt-16 mb-24 '> TRAVEL WITH US AND YOU WILL BE GOING CAREFREE </h1> */}
      <video className=' w-full h-full' id="myVideo" controls ref={videoRef}> 
        <source src={videoSrc} type='video/mp4' />
      </video>
     <div className="fixed inset-0 flex items-center justify-center">
  <button className="w-40" onClick={handlePlayVideo} style={{ display: isPlaying ? 'none' : 'block' }}>
    <img src={play} alt="" />
  </button>
</div>


      </div>


    </div>
  );
}

export default Homepage;
