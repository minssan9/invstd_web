<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="text-center text-h5 font-weight-bold">
          Sample Video<br>
          수업 샘플
        </div>
      </v-col>
    </v-row>
    <v-row class="row">
      <v-col cols="12" md="6">
        <v-card color="bg_1"
                elevation="8"
                outlined
                shaped>
            <v-card-title :class="{'text-black' : !this.$vuetify.theme.dark, 'text-white' : this.$vuetify.theme.dark }">
              일상 회화
            </v-card-title>
            <lazy-youtube :src="'https://youtu.be/MCyE6cftCr8'" max-width="720px"
                          style="margin-bottom:15px; margin-left:20px; width: 90%"/>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card color="bg_2"
                elevation="8"
                outlined
                shaped>
          <v-card-title :class="{'text-black' : !this.$vuetify.theme.dark, 'text-white' : this.$vuetify.theme.dark }">
            어린이 회화
          </v-card-title>
          <lazy-youtube :src="'https://youtu.be/EQN7qxVhseQ'" max-width="720px"
                        style="margin-bottom:15px; margin-left:20px; width: 90%"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Markdown from '@/components/Markdown'
import {LazyYoutube} from "vue-lazytube";

export default {
  name: 'Sample',
  data() {
    return {
      sampleVideo: '# Sample Video'
    }
  },
  components: {
    Markdown,
    LazyYoutube
  },
  created() {
  },
  methods: {}
}
</script>
