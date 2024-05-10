// The Chart.js file in the Fitness Guru application defines a component that displays a customizable line chart using the react-chartjs-2 library.

// **Imports**
// It imports:
// - **React:** Main library for building user interfaces.
// - **react-chartjs-2 Library:** Provides chart components for React.
// - **Chart.js Components (Line):** Line chart component used for rendering the chart.

// **Chart Component**
// A functional component that receives several props:
// - `chartData`: Data to be displayed in the chart.
// - `exercise`: Name of the exercise being charted.
// - `repetitions`: Number of repetitions for the exercise.
// - **Return Statement:**
//   - Wraps the chart in a div with the class `chartContainer`.
//   - Displays a `Line` chart with the provided `chartData`.
//   - Configures the chart with customizable options:
//     - **Title:** Displays a chart title based on `exercise` and `repetitions`.
//     - **Legend:** Configurable display of chart legend.
//     - **Axis Properties:** Customizable axis properties based on `chartData`.

// **Summary**
// - **Chart Display Workflow:**
//   - Renders a line chart with the given data, options, and chart title.
//   - Provides customizable legend and axis properties.
// - **Props and Configuration Options:**
//   - Accepts props like `chartData`, `exercise`, and `repetitions` to configure the chart.
//   - Configures title, legend, and axis options based on the provided props.

// Example Usage:

// <Chart
//   chartData={chartData}
//   exercise="Bench Press"
//   repetitions={10}
// />




// Importing necessary components from React and react-chartjs-2 library
import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";

// The Chart component definition
// Receives a props object as a parameter, which includes chart data and various options
function Chart(props) {
  // Setting up some default properties for the chart legend
  const defaultProps = {
    displayLegend: true, // Legend is displayed by default
    legendPosition: "left", // Legend position is on the left by default
  };

  // The component returns JSX code that will be rendered to the page
  // It includes a div with a class of "chart", inside which is a Line chart
  // The Line component takes several properties like `data`, `width`, `height`, and `options`
  // These properties are passed in as props from the parent component
  return (
    <div className="chart">
      {/* Rendering the Line chart with the provided data and options */}
      <Line
        data={props.chartData} // Chart data passed in from the parent component
        width={40} // Chart width
        height={20} // Chart height
        options={{
          // Chart appearance options
          pointRadius: 6, // Radius of data points
          pointBackgroundColor: "Red", // Background color of data points
          pointBorderColor: "Gray", // Border color of data points
          borderColor: "Gray", // Border color of the chart

          // Plugins configuration: title, legend, etc.
          plugins: {
            // Configuring the chart title
            title: {
              display: true, // Display the title
              text:
                "Weight Changes for " +
                props.exercise +
                ", " +
                props.repetitions +
                " Repetitions", // Dynamic chart title based on exercise and repetitions
              color: "rgba(54, 162, 235, 0.6)", // Title color
              font: { size: 30, weight: "900" }, // Title font size and weight
            },
            // Configuring the legend
            legend: {
              display: props.displayLegend || defaultProps.displayLegend, // Display legend based on prop or default value
              position: props.legendPosition || defaultProps.legendPosition, // Legend position based on prop or default value
            },
          },

          // Scales configuration: x and y axes
          scales: {
            // Y-axis configuration (Weight axis)
            y: {
              title: {
                display: true, // Display the axis title
                text: "Weight (lb)", // Y-axis title
                color: "rgba(54, 162, 235, 0.6)", // Axis title color
                font: { size: 25, weight: "900" }, // Axis title font size and weight
              },
              ticks: {
                // Customizing tick labels
                callback: function (value, index, values) {
                  return value + " lb"; // Append "lb" to each tick label
                },
                font: { size: 15 }, // Tick label font size
              },
            },
            // X-axis configuration (Time axis)
            x: {
              title: {
                display: true, // Display the axis title
                text: "Time", // X-axis title
                color: "rgba(54, 162, 235, 0.6)", // Axis title color
                font: { size: 25, weight: "900" }, // Axis title font size and weight
              },
              ticks: {
                // Customizing tick labels
                font: { size: 16 }, // Tick label font size
              },
            },
          },
        }}
      />
    </div>
  );
}

export default Chart;
