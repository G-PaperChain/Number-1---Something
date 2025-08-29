import React, { useState } from 'react'

const ContactForm = ({ onContactCreated }) => {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,    // Changed from first_name to firstName
            lastName,     // Changed from last_name to lastName
            email
        }

        const url = "http://127.0.0.1:5000/create_contact"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)

        if (response.status != 201 && response.status != 200) {
            const message = await response.json()
            alert(message.message)  // Fixed: was data.message, now message.message
        } else {
            // Clear form fields on success
            setfirstName('')
            setlastName('')
            setEmail('')
            
            // Refresh contacts list if callback provided
            if (onContactCreated) {
                onContactCreated()
            }
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name: </label>
                <input 
                    type="text" 
                    value={firstName} 
                    id="firstName" 
                    onChange={(e) => { setfirstName(e.target.value) }} 
                />
            </div>

            <div>
                <label htmlFor="lastName">Last Name: </label>
                <input 
                    type="text" 
                    value={lastName} 
                    id="lastName" 
                    onChange={(e) => { setlastName(e.target.value) }} 
                />
            </div>

            <div>
                <label htmlFor="email">Email: </label>
                <input 
                    type="text" 
                    value={email} 
                    id="email" 
                    onChange={(e) => { setEmail(e.target.value) }} 
                />
            </div>

            <button type="submit"> Create Contact </button>
        </form>
    )
}

export default ContactForm