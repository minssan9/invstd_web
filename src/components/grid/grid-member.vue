<script setup>
</script>

<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-column-table"
      title="Member"
      :columns="columns"
      :rows="rows"
      row-key="name"
      flat bordered
    />
  </div>
</template>
<script>

export default {
  name: 'GridMember',
  props: {
    rows: []
  },
  data() {
    return {
      columns: [
        { name: 'name', label: 'Name', field: row => row.name, align: 'center',   sortable: true },
        { name: 'monday', label: 'Monday', field: row => row.monday, align: 'center', sortable: true },
        { name: 'tuesday', label: 'Tuesday', field: row => row.tuesday, sortable: true },
        { name: 'wednesday', label: 'Wednesday', field: row => row.wednesday },
        { name: 'thursday', label: 'Thursday', field: row => row.thursday },
        { name: 'friday', label: 'Friday', field: row => row.friday },
        { name: 'saturday', label: 'Saturday', field: row => row.saturday, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'sunday', label: 'Sunday', field: row => row.sunday, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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