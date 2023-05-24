import React from 'react'

export default function Filter({keyword, setKeyword, persons, setFilteredPersons}) {
    const handleFilter = (event) => {
        setKeyword(event.target.value)
        const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(keyword.toLowerCase()))
        setFilteredPersons(filteredPersons)
    }

    return (
        <div>
            filter shown with <input onChange={handleFilter} value={keyword}/>
        </div>
    )
}
