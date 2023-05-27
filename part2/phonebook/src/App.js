import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import services from "./services"

const App = () => {
  const [persons, setPersons] = useState([])

  const [filteredPersons, setFilteredPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    services.getAll()
    .then(fetchedPersons => {
      setPersons(fetchedPersons)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    setFilteredPersons(persons.filter((person) => person.name.toLowerCase().includes(keyword.toLowerCase())))
  }, [persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter 
        keyword={keyword}
        setKeyword={setKeyword}
        persons={persons}
        setFilteredPersons={setFilteredPersons}
      />
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons 
        keyword={keyword}
        filteredPersons={filteredPersons}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  )
}

export default App