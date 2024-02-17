import React from 'react'
import "../styles/contacts.css"

function Contacts() {
  return (
    <div className='contactContainer'>
     <h1>Contact Us</h1>
     <form>
      <label><p>Name:</p>
        <input type="text" />
      </label>
      <label> <p>Email:</p>
        <input type="text" />
      </label>
      <label id='labelMessage'> <p>How can we help?:</p>
     
        <textarea name="" id="" cols="80" rows="10"></textarea>
        
      </label>
  
      <div className='buttonContainer'>
  <button>Send</button>
</div>

     </form>
    </div>
  )
}

export default Contacts
