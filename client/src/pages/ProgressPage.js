// The code is a React functional component called "ProgressPage" that renders a page where users can view their workout progress over time.
// The component starts by importing the necessary modules and components, including a custom utility function called "compare" and a Chart component that is used to display the data.
// It then declares a state variable called "selectedExercise" which will hold the selected exercise name and a state variable called "exercises" which will hold an array of all the exercises that have been tracked by the user.
// It also declares a state variable called "selectedRepetitions" which will hold the selected repetition and a state variable called "repetitions" which will hold an array of all the repetitions that have been tracked for the selected exercise.
// It also declares a state variable called "weights" which will hold an array of all the weights that have been tracked for the selected exercise and repetition.
// It also declares a state variable called "chartData" which will hold the data that will be used to generate the chart.
// It then calls the useEffect hook, which fetches all the exercises that have been tracked by the user and sets it to the "exercises" state variable, and sorts the exercises by name
// It then calls another useEffect hook, which sets the data that will be used to generate the chart based on the "weights" state variable, the x-axis of the chart will hold the date, 
// the y-axis of the chart will hold the weight and it will update the chart data whenever the weights state variable changes.
// A function is defined that fetches all the repetitions that have been tracked for the selected exercise and sets it to the "repetitions" state variable, and sorts the repetitions by ascending order
// A function is defined that fetches all the weights that have been tracked for the selected exercise and repetition and sets it to the "weights" state variable
// It then renders the layout of the page, with a dropdown menu to select the exercise, another dropdown menu to select the repetition, it then renders the Chart component and passing the chart data, exercise, and repetition as props.

import React, { Component, useState, useEffect } from 'react'
import getUser from "../utils/get-user";
import Chart from '../components/Chart';
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import compare from "../utils/compare"


export default function ProgressPage(){  

  const [selectedExercise, setSelectedExercise] = useState('')
  const [exercises, setExercises] = useState([])
  const [selectedRepetitions, setSelectedRepetitions] = useState('')
  const [repetitions, setRepetitions] = useState([])
  const [weights, setWeights] = useState([])
  const [chartData, setChartData] = useState()
  const user = getUser();

  useEffect(() => {
    fetch(`/trackedexercises/${user.id}`)
    .then(res => res.json())
    .then(exercises => {setExercises(exercises)})
}, [user.id])

exercises.sort(compare)

useEffect(() => {
  let x_axis = []
  let dataSet = []
  weights.forEach(weight => {
    x_axis.push(weight.date)
    dataSet.push(weight.weight)
  })
  let y_axis = [
    {
      label: "Weight (lb)",
      data: dataSet
    }
  ]
  console.log(x_axis)
  console.log(y_axis)
  
    setChartData({
        labels: x_axis,
        datasets: y_axis
    });

    console.log(chartData)
}, [weights])

function getRepetitions(exercise){
  fetch(`/repetitions/${exercise._id}`)
  .then(res => res.json())
  .then(repetitions => {setRepetitions(repetitions)})
}

repetitions.sort((a, b) => {
  return a.repetitions - b.repetitions
})

function getChartData(repetitions){
  fetch(`/weight/${repetitions._id}`)
  .then(res => res.json())
  .then(weight => {setWeights(weight)})
  
  }
    return (
      <Layout user={user}>
      <div class="flex-container">
      
      <div>

      </div>

        <Container>
            <h2>Check Your Progress</h2>
            <br />
            <DropdownButton id="dropdown-basic-button" title="Select an Exercise" menuVariant = 'light'>
              {exercises.map(exercise =>
                <Dropdown.Item onClick = {() => {
                  setSelectedExercise(exercise.name)
                  setSelectedRepetitions("")
                  getRepetitions(exercise)
                }}> 
                  {exercise.name}
                </Dropdown.Item>
              )}
            </DropdownButton>
            <br />
            <h4>{selectedExercise}</h4>
            <br />
            <DropdownButton id="dropdown-basic-button" title="Select Repetitions" menuVariant = 'light'>
              {repetitions.map(repetitions =>
                <Dropdown.Item onClick = {() => {
                  setSelectedRepetitions(repetitions.repetitions)
                  getChartData(repetitions)
                }}> 
                  {repetitions.repetitions}
                </Dropdown.Item>
              )}
            </DropdownButton>
            <br />
            <h4>{selectedRepetitions}</h4>
            <br /> 
            
            {(selectedExercise != "") ? <Chart chartData={chartData} exercise = {selectedExercise} repetitions = {selectedRepetitions}/> : ""}
            
        </Container>

  </div>

  <div>

  </div>

      </Layout>  
    );
}