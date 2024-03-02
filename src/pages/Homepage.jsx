import React, { useState } from "react";
import ReactPlayer from "react-player";

function Homepage() {
  const [videoKey, setVideoKey] = useState(0); // Se utiliza para forzar el remontaje del componente ReactPlayer

  // Función que maneja el fin del video
  const handleVideoEnd = () => {
    setVideoKey((prevKey) => prevKey + 1); // Incrementa la clave para forzar el remontaje
  };

  return (
    <div
      style={{
        height: "calc(100vh - 100px)", // Resta la altura de la Navbar
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end", // Alinea el contenido en la parte inferior
        margin: "0",
        padding: "0",
        position: "relative", // Asegura que el contenedor se posicione correctamente
      }}
      className="bg-video_color"
    >
      <ReactPlayer
        key={videoKey} // La clave que cambia para reiniciar el video
        url="https://youtu.be/wODTytAwuRs"
        //  url="https://youtu.be/PdIGpR5KXWs"
        width="100%"
        height="100%"
        controls
        style={{ objectFit: "cover", position: "absolute", bottom: "0" }} // Asegura que el video se alinee en la parte inferior
        onEnded={handleVideoEnd} // Maneja el evento cuando el video termina
      />
    </div>
  );
}

export default Homepage;
