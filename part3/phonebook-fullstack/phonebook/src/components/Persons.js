import React from 'react'
import services from '../services'

export default function Persons({keyword, filteredPersons, persons, setPersons, setNotification}) {
  
  const deletePerson = (id) => {

    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      services.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(error)

          setNotification({message:`Information of ${persons.find(person => person.id === id).name} has already been removed from server`, type: "error"})
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    } else {
      return
    }
  }
  
  return (
    <div>
        {keyword
            ? 
            filteredPersons.map(person => (
            <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button></p>
            )) 
            : 
            persons.map(person => (
            <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button></p>
            ))
        }
    </div>
  )
}
