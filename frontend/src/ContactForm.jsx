import React, { useState } from 'react'

const ContactForm = ({ }) => {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            first_name: firstName,
            last_name: lastName,
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
            alert(data.message)
        } else {
            // successful 
        }
    }



    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" value={firstName} id="firstName" onChange={(e) => { setfirstName(e.target.value) }} />
            </div>

            <div>
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" value={lastName} id="lastName" onChange={(e) => { setlastName(e.target.value) }} />
            </div>

            <div>
                <label htmlFor="email">Email: </label>
                <input type="text" value={email} id="email" onChange={(e) => { setEmail(e.target.value) }} />
            </div>

            <button type="submit"> Create Contact </button>

        </form>
    )
}

export default ContactForm