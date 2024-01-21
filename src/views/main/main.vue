<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import GridMember from '@/components/grid/grid-member.vue'
import GridMonth from '@/components/grid/grid-month.vue'


</script>

<template>
  <div  class="q-pa-md"  >
<!--    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <p>{{ $t('message.hello', { user: '사용자' }) }}</p>-->
<!--      {{ $t("example") }}-->

<!--      <HelloWorld msg="You did it!" />-->

<!--    </div>-->


      <GridMember
        :rows="memberRows"
      />

      <GridMonth
        :rows="monthRows"
      />

<!--      <p>{{$t('message.bye', ['펭수'])}}</p>-->
  </div>
</template>
<script>

export default {
  name: 'MainLandingPage',
  data() {
    return {
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
    }
  },
  components: { },
  computed: { },
  created() { },
  unmounted () {},
  mounted() { },
  methods: { }
}
</script>
