import React from 'react'

export default function Persons({keyword, filteredPersons, persons}) {
  return (
    <div>
        {keyword
            ? 
            filteredPersons.map(person => (
            <p key={person.id}>{person.name} {person.number}</p>
            )) 
            : 
            persons.map(person => (
            <p key={person.id}>{person.name} {person.number}</p>
            ))
        }
    </div>
  )
}
