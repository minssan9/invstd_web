<script setup>
</script>

<template>
  <canvas ref="lineChart" id="lineChart"></canvas>
</template>

<script>
import { Chart } from 'chart.js';

export default {
  components: [Chart],

  mounted() {
    var ctx = this.$refs.lineChart;
    
    ctx = document.getElementById('lineChart')
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map(row => row.count)
            }
          ]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true
            }
          }
        }
    });
  }
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
