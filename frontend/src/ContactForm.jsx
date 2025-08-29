import React, { useState } from 'react'

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    const [firstName, setfirstName] = useState(existingContact.firstName || '')
    const [lastName, setlastName] = useState(existingContact.lastName || '')
    const [email, setEmail] = useState(existingContact.email || '')

    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,   
            lastName,  
            email
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)

        if (response.status != 201 && response.status != 200) {
            const message = await response.json()
            alert(message.message)
        } else {
            updateCallback()
            
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

            <button type="submit">{ updating ? "Update" : "Create"}</button>
        </form>
    )
}

export default ContactForm