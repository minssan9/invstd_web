<script setup>
import GridMember from '@/components/grid/grid-member.vue'
import GridMonth from '@/components/grid/grid-month.vue'
import HelloWorld from '@/components/HelloWorld.vue'
// import GridCount from '@/components/grid/grid-count.vue'

</script>

<template>
  <div  class="q-pa-md"  >

    <div class="row">
      <div class="col-3">

        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />

        <div class="wrapper">
          <p>{{ $t('message.hello', { user: '사용자' }) }}</p>
          {{ $t("example") }}


        </div>
      </div>
      <div class="col-5">
        <p>{{ $t('message.bye', ['펭수']) }}</p>
        <HelloWorld msg="You did it!" />
      </div>
      <div class="col-4">
        <q-btn color="primary" :label="$t('message.createSchedule')"
              @click="createSchedule"
        />
      </div>
    </div>



    <GridMember
      :rows="memberRows"
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

    </GridMember>

    <GridMonth
      :rows="monthRows"
    >
    </GridMonth>


    <q-table
      class="my-sticky-column-table"
      title="Count"
      :columns="memberCountColumns"
      :rows="memberCountRows"

      selection="multiple"
      :selected.sync="selected"
      :filter="filter"
      :loading="loading"

      row-key="name"
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
  name: 'MainLandingPage',
  data() {
    return {
      selected: [],
      loading: false,
      filter: '',
      rowCount: 10,
      memberRows: [
        {
          name: 'Kim',
          monday: true,
          tuesday: false,
          wednesday: true,
          thursday: false,
          friday: true,
          saturday: false,
          sunday: false,
        },
        {
          name: 'Min',
          monday: true,
          tuesday: false,
          wednesday: true,
          thursday: false,
          friday: true,
          saturday: false,
          sunday: false,
        },
      ],
      monthRows: [
        {
          name: 'Kim',
          day1: false,
          day2: false,
          day3: false,
          day4: false,
          day5: false,
          day6: false,
          day7: false,
          day8: false,
          day9: false,
          day10: false,
          day11: false,
          day12: false,
          day13: false,
          day14: false,
          day15: false,
          day16: false,
          day17: false,
          day18: false,
          day19: false,
          day20: false,
          day21: false,
          day22: false,
          day23: false,
          day24: false,
          day25: false,
          day26: false,
          day27: false,
          day28: false,
          day29: false,
          day30: false,
          day31: false
        },
        {
          name: 'Min',
          day1: false,
          day2: false,
          day3: false,
          day4: false,
          day5: false,
          day6: false,
          day7: false,
          day8: false,
          day9: false,
          day10: false,
          day11: false,
          day12: false,
          day13: false,
          day14: false,
          day15: false,
          day16: false,
          day17: false,
          day18: false,
          day19: false,
          day20: false,
          day21: false,
          day22: false,
          day23: false,
          day24: false,
          day25: false,
          day26: false,
          day27: false,
          day28: false,
          day29: false,
          day30: false,
          day31: false
        },
      ],


      memberCountColumns: [
        { name: 'name', label: 'Name', field: row => row.name, align: 'center',   sortable: true },
        { name: 'count', label: 'Count', field: row => row.count, align: 'center', sortable: true },
      ],

      memberCountRows: [
        {
          name: 'Kim',
          count: 0,
        },
        {
          name: 'Min',
          count: 0,
        },
      ],
    }
  },
  components: { },
  computed: { },
  created() { },
  unmounted () {},
  mounted() { },
  methods: {
    createSchedule(){
      this.memberRows.map(member => member.name)
        .forEach(member => this.monthRows.push(member.name))

      for (let i = 0; i < 30; i++) {
        this.monthRows.findIndex(member => member.name)
      }
    },

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
