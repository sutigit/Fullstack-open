import { useState } from 'react'

const StatisticLine = (props) => {
  return (
  
      <tr>
        <td style={{paddingRight: 10}}>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={props.good} />
          <StatisticLine text="Neutral" value={props.neutral} />
          <StatisticLine text="Bad" value={props.bad} />
          <StatisticLine text="All" value={props.good + props.neutral + props.bad} />
          <StatisticLine text="Average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
          <StatisticLine text="Positive" value={props.good / (props.good + props.neutral + props.bad)} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <button onClick={() => setGood(good+1)}>Good</button>
        <button onClick={() => setNeutral(neutral+1)}>Neutral</button>
        <button onClick={() => setBad(bad+1)}>Bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App