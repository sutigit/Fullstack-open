import React from 'react'

export default function PersonForm({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) {


    const handleSubmit = (event) => {
        event.preventDefault()
        
        setNewName('')
        setNewNumber('')
        
        if (persons.some((person) => person.name === newName)) {
            return alert(`${newName} is already added to phonebook`)
        }

        setPersons(persons.concat({name: newName, number: newNumber}))
        }

    const handleNameInput = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberInput = (event) => {
        setNewNumber(event.target.value)
    }
        

    return (
        <form>
            <div>
                name: <input onChange={handleNameInput} value={newName}/>
            </div>
            <div>
                number: <input onChange={handleNumberInput} value={newNumber} type='number'/>
            </div>
            <div>
                <button onClick={handleSubmit} type="submit">add</button>
            </div>
        </form>
    )
}
