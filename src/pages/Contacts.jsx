import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import greenTick from '../../public/images/greenTick.png'

// import "../styles/contacts.css"

function Contacts() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleOutsideClick = () => {
    setSubmitted(false);
  };



  function handleSubmit(e) {
    e.preventDefault()
    setName('')
    setEmail('')
    setMessage('')
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
    }, 3000)

    document.addEventListener('click', () => {
      clearTimeout();
      handleOutsideClick();
    },);
  }

  return (
    <>
      <div className='contactContainer'>
        <h1>Contact Us👇</h1>
        <form  className='w-48 mx-auto' onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
          </label>
          <label> Email:
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </label>
          <label id='labelMessage'> How can we help?:

            <textarea name="" id="" cols="65" rows="8" value={message} onChange={(e) => { setMessage(e.target.value) }} ></textarea>

          </label>

          <div className='buttonContainer'>
            <button>Send</button>
          </div>


        </form>

        
      </div>
      <footer>
      <h2>Reach us</h2>
  <p>+51 222 034 897</p>
  <p>info@goingcarefree.com</p>
  <p>10-11 Spain St, Porto W1T 1DN, Portugal</p>
      </footer>
      {submitted && <div className='messageConfirmation'>
        <img src={greenTick} />
        <h1>Thank you!</h1>
        <h2>You message was sent succesfully</h2>
      </div>}

 
    </>
  )
}

export default Contacts

