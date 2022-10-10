import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';
function Chart(props){
  const defaultProps = {
    displayLegend: true,
    legendPosition:'left',
  }
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