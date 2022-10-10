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