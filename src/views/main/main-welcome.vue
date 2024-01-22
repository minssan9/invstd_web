<script setup>
import TheWelcome from '@/components/TheWelcome.vue'

defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="q-pa-md">
    <TheWelcome></TheWelcome>
  </div>
</template>
<script>

export default {
  name: 'MainLandingPage',
  data() {
    return {
      columns: [
        { name: 'name', label: 'Name', field: row => row.name, align: 'left', format: val => `${val}`, sortable: true },
        { name: 'monday', label: 'Monday', field: row => row.monday, align: 'center', sortable: true },
        { name: 'tuesday', label: 'Tuesday', field: row => row.tuesday, sortable: true },
        { name: 'wednesday', label: 'Wednesday', field: row => row.wednesday },
        { name: 'thursday', label: 'Thursday', field: row => row.thursday },
        { name: 'friday', label: 'Friday', field: row => row.friday },
        { name: 'saturday', label: 'Saturday', field: row => row.saturday, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'sunday', label: 'Sunday', field: row => row.sunday, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      rows: [
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

    }
  },
  components: { },
  computed: { },
  created() { },
  unmounted () {},
  mounted() { },
  methods: {
    // onChrome(){
    //   window.location.href = 'googlechrome://voyagerss.com'
    // },
  }
}
</script>

<style lang="sass">
</style>