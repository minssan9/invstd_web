
<template>
  <div>
    abc
    
    <canvas ref="lineChart" id="lineChart"></canvas>

    <!-- <LineChart></LineChart> -->
  </div>
</template>

<script>

import { Chart } from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import {mapStores} from "pinia";
import {useAppStore} from "@/pinia/appStore";
import {useLangStore} from "@/pinia/langStore";

export default {
  components: [Chart],
  computed: {
    ...mapStores(useAppStore, useLangStore)
  },
  mounted() {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
    
    var ctx = this.$refs.lineChart;
    ctx = document.getElementById('lineChart')

    const chart = new Chart(ctx, {
      type: 'bar',
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
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, chart);

          // Substitute the appropriate scale IDs
          const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        }
      }
    });
  }
}

// import LineChart from '../../components/charts/LineChart.vue';

// export default {
//   components: [LineChart]
// }
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
