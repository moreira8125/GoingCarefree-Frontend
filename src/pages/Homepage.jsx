import React, { useState } from "react";
import ReactPlayer from "react-player";

function Homepage() {
  const [videoKey, setVideoKey] = useState(0); 

  const handleVideoEnd = () => {
    setVideoKey((prevKey) => prevKey + 1); 
  };

  function heightToRestFunction (){
    if (window.innerWidth >= 1280) { 
      return 109; 
    }  else if(window.innerWidth >= 1024){
        return 80}
        else if(window.innerWidth >= 768){
            return 62
          }else{
            return 0
          }
        
      
    
  ;
}

  const heightToRest = heightToRestFunction ()

  return (
    <div
      style={{
        height: `calc(100vh - ${heightToRest}px)`, 
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end", 
        margin: "0",
        padding: "0",
        position: "relative", 
      }}
      className="bg-video_color"
    >
      <ReactPlayer
        key={videoKey} 
        url="https://youtu.be/wODTytAwuRs"
     
        width="100%"
        height="100%"
        controls
        style={{ objectFit: "cover", position: "absolute", bottom: "0" }} 
        onEnded={handleVideoEnd} 
      />
    </div>
  );
}

export default Homepage;
