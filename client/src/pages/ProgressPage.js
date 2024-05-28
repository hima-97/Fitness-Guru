// The ProgressPage.js file in the Fitness Guru application defines the ProgressPage component, which serves as an interactive dashboard for users to visualize and track their workout progress over time. The component leverages data visualization tools to provide insightful views of exercise performance metrics.

// **Imports**
// It imports:
// - **React and useState, useEffect Hooks:** For managing component state and lifecycle.
// - **compare:** Custom utility function to sort data.
// - **Chart:** Component for rendering line charts to display workout data visually.

// **ProgressPage Component**
// A functional component that:
// - Initializes several state variables to manage the user's workout data:
//   - `selectedExercise` to store the currently selected exercise.
//   - `exercises` to hold an array of all tracked exercises.
//   - `selectedRepetitions` to store the selected repetition count.
//   - `repetitions` to hold repetitions data for the selected exercise.
//   - `weights` to store weight data for the selected exercise and repetition.
//   - `chartData` to format the data for visualization in the chart.
// - Uses `useEffect` to fetch and set the exercises tracked by the user, sorting them by name using the `compare` function.
// - Defines another `useEffect` to update `chartData` whenever the `weights` data changes, ensuring the chart reflects the most current data.
// - Includes functions to fetch repetitions and weights based on user selections, setting them appropriately in their respective state variables.

// **Dynamic Data Loading:**
// - Fetches data dynamically based on user interactions with dropdown menus for selecting exercises and repetitions.
// - Displays updated data in the Chart component as users change their selections, providing a real-time view of their progress.

// **Chart Integration:**
// - Utilizes the Chart component to render a line chart, which plots weight against dates for the selected repetitions of an exercise, helping users visualize their performance trends and progress.

// **Key Features and Functionality**
// - **User Interaction:** Allows users to interactively select exercises and repetitions to see specific progress data.
// - **Data Visualization:** Integrates with a chart component to provide graphical representation of workout progress, enhancing user engagement and understanding.
// - **Responsive Data Updates:** Reacts to state changes and user selections by dynamically updating the chart data, ensuring accuracy and relevance of the information displayed.

// **Return Statement:**
// - The component renders a layout that includes dropdown menus for selecting exercises and repetitions, followed by the Chart component which displays the workout progress.
// - The layout is user-friendly and designed to facilitate easy navigation and interaction, with all components neatly arranged within a structured layout.

// **CSS Styling:**
// - Likely utilizes CSS from 'react-bootstrap' along with custom styles defined in external CSS files to ensure that the visual presentation is clean, responsive, and aligns with the application's design standards.

// **Example Usage:**

// <ProgressPage />




import React, { useState, useEffect } from 'react'
import getUser from "../utils/get-user";
import Chart from '../components/Chart';
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import compare from "../utils/compare"

// Define the ProgressPage functional component
export default function ProgressPage(){  

  // State hooks for managing component state
  const [selectedExercise, setSelectedExercise] = useState('') // Stores the currently selected exercise
  const [exercises, setExercises] = useState([]) // Stores the list of exercises
  const [selectedRepetitions, setSelectedRepetitions] = useState('') // Stores the currently selected repetitions for an exercise
  const [repetitions, setRepetitions] = useState([]) // Stores the repetitions related to a selected exercise
  const [weights, setWeights] = useState([]) // Stores weights for the selected repetitions
  const [chartData, setChartData] = useState() // Data used to render the chart
  const user = getUser(); // Retrieves the current user

  // Effect to fetch tracked exercises on component mount or when user id changes
  useEffect(() => {
    fetch(`/trackedexercises/${user.id}`)
    .then(res => res.json())
    .then(exercises => {setExercises(exercises)})
  }, [user.id])

  // Sort exercises for consistent dropdown rendering
  exercises.sort(compare)

  // Effect to prepare chart data when weights data changes
  useEffect(() => {
    let x_axis = []
    let dataSet = []
    weights.forEach(weight => {
      x_axis.push(weight.date) // Collect dates for the X-axis
      dataSet.push(weight.weight) // Collect weight data for the Y-axis
    })
    let y_axis = [
      {
        label: "Weight (lb)",
        data: dataSet
      }
    ]
    
    // Update chart data state
    setChartData({
        labels: x_axis,
        datasets: y_axis
    });
  }, [weights])

  // Function to fetch repetitions for a selected exercise
  function getRepetitions(exercise){
    fetch(`/repetitions/${exercise._id}`)
    .then(res => res.json())
    .then(repetitions => {setRepetitions(repetitions)})
  }

  // Sort repetitions for consistent dropdown rendering
  repetitions.sort((a, b) => {
    return a.repetitions - b.repetitions
  })

  // Function to fetch weight data based on selected repetitions
  function getChartData(repetitions){
    fetch(`/weight/${repetitions._id}`)
    .then(res => res.json())
    .then(weight => {setWeights(weight)})
  }

  return (
    <Layout user={user}>
      <div className="flex-container">
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
            {repetitions.map(repetition =>
              <Dropdown.Item onClick = {() => {
                setSelectedRepetitions(repetition.repetitions)
                getChartData(repetition)
              }}> 
                {repetition.repetitions}
              </Dropdown.Item>
            )}
          </DropdownButton>
          <br />
          <h4>{selectedRepetitions}</h4>
          <br /> 
          
          {selectedExercise && <Chart chartData={chartData} exercise={selectedExercise} repetitions={selectedRepetitions}/>}
        </Container>
      </div>
    </Layout>  
  );
}
