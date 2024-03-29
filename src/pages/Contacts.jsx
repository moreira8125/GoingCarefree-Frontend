import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import greenTick from "../../public/images/greenTick.png";
import bgImage from "../../public/images/nature2.png";

// import "../styles/contacts.css"

function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleOutsideClick = () => {
    setSubmitted(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);

    document.addEventListener("click", () => {
      clearTimeout();
      handleOutsideClick();
    });
  }

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
    <>
      <div
        className="h-full pt-12  bg-cover bg-center flex justify-center items-center "
        style={{
          backgroundImage: `url(${bgImage})`,
          height: `calc(100vh - ${heightToRest}px)`,
        }}
      >
        <div className="flex flex-col pb-36 text-center  ">
          <h1
            className="mb-8 font-bold leading-none tracking-tight text-white 
          
          text-4xl
           text-center"
          >
            Contact Us
          </h1>
          <form
            className="flex flex-col w-48 mx-auto justify-center items-center "
            onSubmit={handleSubmit}
          >
            <label className="mb-2 text-md font-medium text-white ">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="border  text-gray-900 text-sm rounded-lg ring-blue-500  block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 dark:text-navbar_color bg-opacity-50"
              />
            </label>
            <label className="mb-2 text-md font-medium text-white  ">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="border  text-gray-900 text-sm rounded-lg ring-blue-500  block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 dark:text-navbar_color bg-opacity-50"
              />
            </label>
            <label className="mb-2 text-md font-medium text-white ">
              How can we help?:
              <textarea
                name=""
                id=""
                cols="50"
                rows="8"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className="border  text-gray-900 text-sm rounded-lg ring-blue-500 block p-2.5 bg-white border-gray-600 placeholder-gray-400 dark:text-navbar_color bg-opacity-50 w-full md:w-fit"
              ></textarea>
            </label>

            <button className="text-white   focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-1/2 sm:w-1/2 px-5 py-2.5 bg-navbar_color hover:bg-blue-400 mt-5 ">
              Send
            </button>
          </form>
        </div>
        {submitted && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
    <div className="bg-white flex flex-col justify-center items-center border rounded-lg p-8">
      <img className="w-20 mb-4" src={greenTick} alt="Success" />
      <h1 className="font-helvetica font-bold text-gray-900">
        Thank you!
      </h1>
      <h2 className="text-gray-900">Your message was sent successfully</h2>
    </div>
  </div>
)}
      </div>

      <footer className="flex flex-col items-center fixed bottom-0 w-full bg-navbar_color text-white pb-4 pt-4">
        <h2>Reach us</h2>
        <p>+51 222 034 897</p>
        <p>info@goingcarefree.com</p>
        <p>10-11 Spain St, Porto W1T 1DN, Portugal</p>
      </footer>
    </>
  );
}

export default Contacts;
