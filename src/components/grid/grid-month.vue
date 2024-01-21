<script setup>
</script>

<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-column-table"
      title="Month"
      :columns="columns"
      :rows="rows"
      row-key="name"
      flat bordered

    />
  </div>
</template>
<script>

export default {
  name: 'GridMonth',
  props: {
    rows: []
  },
  data() {
    return {
      columns: [
        { name: 'name', label: 'Name', field: row => row.name, format: val => `${val}`, sortable: true, align: 'center',  sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: '1', label: '1',   field: row => row.day1 },
        { name: '2', label: '2',   field: row => row.day2 },
        { name: '3', label: '3',   field: row => row.day3 },
        { name: '4', label: '4',   field: row => row.day4 },
        { name: '5', label: '5',   field: row => row.day5 },
        { name: '6', label: '6',   field: row => row.day6 },
        { name: '7', label: '7',   field: row => row.day7, },
        { name: '8', label: '8',   field: row => row.day8, },
        { name: '9', label: '9',   field: row => row.day9, },
        { name: '10', label: '10', field: row => row.day10, },
        { name: '11', label: '11', field: row => row.day11 },
        { name: '12', label: '12', field: row => row.day12 },
        { name: '13', label: '13', field: row => row.day13 },
        { name: '14', label: '14', field: row => row.day14 },
        { name: '15', label: '15', field: row => row.day15 },
        { name: '16', label: '16', field: row => row.day16 },
        { name: '17', label: '17', field: row => row.day17, },
        { name: '18', label: '18', field: row => row.day18, },
        { name: '19', label: '19', field: row => row.day19, },
        { name: '20', label: '20', field: row => row.day20,  },
        { name: '21', label: '21', field: row => row.day21 },
        { name: '22', label: '22', field: row => row.day22 },
        { name: '23', label: '23', field: row => row.day23 },
        { name: '24', label: '24', field: row => row.day24 },
        { name: '25', label: '25', field: row => row.day25 },
        { name: '26', label: '26', field: row => row.day26 },
        { name: '27', label: '27', field: row => row.day27, },
        { name: '28', label: '28', field: row => row.day28, },
        { name: '29', label: '29', field: row => row.day29, },
        { name: '30', label: '30', field: row => row.day30,  },
        { name: '31', label: '31', field: row => row.day31,  },
      ],

    }
  },
  components: { },
  computed: { },
  created() { },
  unmounted () {},
  mounted() { },
  methods: {
  }
}
</script>

<style lang="sass">
</style>