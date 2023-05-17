import React from 'react'

const Header = ({ text }) => {
    return (
        <h2>{text}</h2>
    )
}

const Part = ({ text, exerci }) => {
    return (
        <p>{text} {exerci}</p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => <Part key={part.id} text={part.name} exerci={part.exercises} />)}
            <strong>total of {parts.reduce((acc, current) => acc + current.exercises, 0)} exercises</strong>
        </div>
    )
}

export default function Course({ courses }) {
    
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map((course) => (
                <div key={course.id}>
                    <Header text={course.name} />
                    <Content parts={course.parts}/>
                </div>
            ))}
        </div>
    )
}