<script setup>
import GridMonth from '@/components/grid/grid-month.vue'
</script>

<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-column-table"
      title="Member"
      :columns="columns"
      :rows="rows"
      row-key="name"

      selection="multiple"
      :selected.sync="selected"
      :filter="filter"
      :loading="loading"

      flat bordered
    >
      <template v-slot:top>
        <q-btn flat dense color="primary" :disable="loading" label="Add row" @click="addRow" ></q-btn>
        <q-btn class="on-right" flat dense color="primary" :disable="loading" label="Remove row" @click="removeRow" ></q-btn>
        <q-space ></q-space>
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" ></q-icon>
          </template>
        </q-input>
      </template>
    </q-table>
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
      selected: [],
      loading: false,
      filter: '',
      rowCount: 10,
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
    addRow () {
      this.loading = true
      setTimeout(() => {
        const
          index = Math.floor(Math.random() * (this.data.length + 1)),
          row = this.original[Math.floor(Math.random() * this.original.length)]
        if (this.data.length === 0) {
          this.rowCount = 0
        }
        row.id = ++this.rowCount
        const addRow = { ...row } // extend({}, row, { name: `${row.name} (${row.__count})` })
        this.data = [...this.data.slice(0, index), addRow, ...this.data.slice(index)]
        this.loading = false
      }, 500)
    },
    removeRow () {
      this.loading = true
      setTimeout(() => {
        const index = Math.floor(Math.random() * this.data.length)
        this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)]
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style lang="sass">
</style>