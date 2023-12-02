<template>
    <v-container fluid>
      <v-row class="row g-3" >
        <v-col cols="12" sm="12">
          <div class="text-h4 font-weight-bold">
            Teacher Video
          </div>
        </v-col>
      </v-row>
      <v-row class="row g-3">
        <v-col cols="12" sm="4" v-for="t in teacherList" :key="t.accountId">
            <img :src="t.profileImageUrl"
                   width="38px"
                   height="38px"
                   style="border: 1px solid transparent; border-color: #6c757d; border-radius: 0.25rem">
            {{ t.username }}
            <lazy-youtube v-if="t.profileVideoUrl != '' " :src="t.profileVideoUrl" max-width="720px"/>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import Markdown from '@/components/Markdown'
import {LazyYoutube} from "vue-lazytube";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'MainTeacher',
  data() {
    return {
      teacher: '# Teacher Video',
      teacherList: []
    }
  },
  components: {
    LazyYoutube
  },
  computed: {
    ...mapGetters(['app'])
  },
  mounted() {
    this.fetchTeacherList()
        .then(res => {
          this.teacherList = res.filter(t => t.profileVideoUrl != null)
              .sort(function (a,b) {
                if(a.profileVideoUrl > b.profileVideoUrl) return -1
                else return 1
              })
        })
  },
  methods: {
    ...mapActions(['fetchTeacherList']),
  },
}
</script>

<style scoped>
</style>

