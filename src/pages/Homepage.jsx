import React, { useState, useRef } from 'react';
import videoSrc from "/images/videoGoingCarefree.mp4"; 
import "../styles/homepage.css";
import play from "/images/play.png"
import logo from "/images/logoGoingCarefree.png";
import londonImage from '/images/london2.png';
import australiaImage from '/images/australia.png';
import icelandImage from '/images/iceland.png';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';


function Homepage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null); 


  const slides = [
    {url : londonImage},
    {url : australiaImage},
    {url : icelandImage}
  ]

  const handlePlayVideo = () => {
    const video = videoRef.current; 
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying); // Actualiza el estado de reproducción
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (

    <div  >
    <div className='video-wrapper'> 
      <h1 className='text-center text-white text-customSize font-extrabold pt-16 mb-24 '> TRAVEL WITH US AND YOU WILL BE GOING CAREFREE </h1>
      <video id="myVideo" controls ref={videoRef}> 
        <source src={videoSrc} type='video/mp4' />
      </video>
      <button className="play-button" onClick={handlePlayVideo} style={{ display: isPlaying ? 'none' : 'block' }}>
        <img className= 'play'  src={play} alt="" />
      </button>


      </div>


      <h1 className='welcome' > ⬇Have a look at what we offer</h1>
      <div className='max-w-[1600px] h-[780px] w-full m-auto py-16 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>

    </div>
  );
}

export default Homepage;
