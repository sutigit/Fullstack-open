import React from 'react'
import services from '../services'

export default function PersonForm({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setNotification }) {


    const handleSubmit = (event) => {
        event.preventDefault()
        
        setNewName('')
        setNewNumber('')
        
        if (persons.some((person) => person.name === newName)) {
            window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            
            const personObject = {
                name: newName,
                number: newNumber
            }

            services.update(persons.find(person => person.name === newName).id, personObject)
            .then(updatedPerson => {
                setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
                setNotification({message:`Updated ${updatedPerson.name}`, type: "notification"})

                setTimeout(() => {
                    setNotification(null)
                }, 5000);
            })
            .catch(error => {
                console.log(error)
            })
            
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
    
            services.create(personObject)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNotification({message: `Added ${newPerson.name}`, type: "notification"})
                
                setTimeout(() => {
                    setNotification(null)
                }, 5000);
            })
            .catch(error => {
                console.log(error)
            })
        }
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
                number: <input onChange={handleNumberInput} value={newNumber}/>
            </div>
            <div>
                <button onClick={handleSubmit} type="submit">add</button>
            </div>
        </form>
    )
}
