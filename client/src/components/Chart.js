// This file is used for the "Chart" component
// The Chart.js file is a React component that uses the Chart.js library to create a line chart
// The component receives props from its parent component, and uses them to render a line chart with the given data, options and chart title

import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';

// function called Chart which takes in a props object as a parameter:
// Inside the function, it sets some default props, such as 'displayLegend' and 'legendPosition' which are used to configure the chart's legend
function Chart(props){
  const defaultProps = {
    displayLegend: true,
    legendPosition:'left',
  }
  // the component returns JSX code that will be rendered to the page:
  // The JSX code includes a div with a class of "chart" and inside it, there is a Line component from the Chart.js library 
  // The Line component takes in several properties such as data, width, and height, which are passed in as props from the parent component 
  // The Line component also has options property, which is an object that contains several properties such as the pointRadius, pointBackgroundColor, pointBorderColor, borderColor and plugins
  // The plugins property is also an object, which contains properties such as title, legend and scales
  // The title property is an object that sets the title of the chart, the legend property is also an object that sets the legend of the chart, and the scales property is an object that sets the scales of the chart
    return (
      <div className="chart">
        <Line
          data={props.chartData}
          width={40}
	        height={20}
          options={{
            pointRadius: 6,
            pointBackgroundColor: 'Red',
            pointBorderColor: 'Gray',
            borderColor: 'Gray',
            plugins:{
              title: {
                display: true,
                text:'Weight Changes for '+ props.exercise + ", " + props.repetitions + ' Repetitions',
                color: 'rgba(54, 162, 235, 0.6)', 
                font: { size: 30, weight:'900'}
              },
              legend:{
                display:props.displayLegend,
                position:props.legendPosition
              }
            },
            scales: {
              y: {
                title:{
                  display: true,
                  text: 'Weight (lb)',
                  color: 'rgba(54, 162, 235, 0.6)', 
                  font: { size: 25, weight:'900'}
                },
                ticks: {
                  callback: function(value, index, values) {
                    return value + ' lb';
                  },
                  font: {size: 15}
                }
              },
              x: {
                title:{
                  display: true,
                  text: 'Time',
                  color: 'rgba(54, 162, 235, 0.6)',               
                  font: { size: 25, weight:'900'}
                },
                ticks: {
                  font: {size: 16}
                }
              }
            }
        }}
    />
      </div>
    )
  }

export default Chart;