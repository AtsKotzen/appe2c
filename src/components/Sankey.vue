<template>
    <div id="sanley">
      <div class="chart">
        <canvas id="chart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart, LinearScale } from "chart.js";
  import { SankeyController, Flow } from "chartjs-chart-sankey";
  
  Chart.register(LinearScale, SankeyController, Flow);
  
  export default {
    name: "Sankey",
    mounted: function () {
      var ctx = document.getElementById("chart").getContext("2d");
  
      var colors = {
        Athus: "green",
        "Vinícius Rocha": "orange",
        "Desejos de Acesso": "slategray",
        "Piscina Comum": "blue",
        Deroila: "orange",
      };
  
      function getColor(name) {
        return colors[name] || "green";
      }
  
      new Chart(ctx, {
        type: "sankey",
        data: {
          datasets: [
            {
              data: [
                { from: "Vinícius Rocha", to: "Piscina Comum", flow: 20 },
                { from: "Athus", to: "Piscina Comum", flow: 25 },
                { from: "Athus", to: "Desejos de Acesso", flow: 10 },               
                { from: "Deroila", to: "Piscina Comum", flow: 10 },
                { from: "Cauê", to: "Piscina Comum", flow: 20 },               
                { from: "Helena", to: "Piscina Comum", flow: 15 },
                { from: "Celso", to: "Piscina Comum", flow: 25 },                               
                { from: "Athus", to: "Deroila", flow: 25 },
                { from: "Piscina Comum", to: "Deroila", flow: 20 },                
                { from: "Piscina Comum", to: "Athus", flow: 50 },                
                { from: "Piscina Comum", to: "Desejos de Acesso", flow: 10 },                
                { from: "Piscina Comum", to: "Celso", flow: 13 },                
                { from: "Piscina Comum", to: "Helena", flow: 10 },                
                { from: "Vinícius Rocha", to: "Athus", flow: 20 },
                { from: "Vinícius Rocha", to: "Desejos de Acesso", flow: 15 },                
              ],
              colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
              colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
            },
          ],
        },
      });
    },
  };
  </script>
  
  <style>
  #sankey {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  