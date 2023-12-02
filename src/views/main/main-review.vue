<template>
  <v-container>
    <v-row class="justify-center my-10" >
      <v-col cols="12" md="10">
        <v-card flat class="text-center transparent" to="/board/review">
          <v-row >
            <v-col cols="12" class="text-h5 font-weight-bold section-heading ">수강 후기</v-col>
            <v-col cols="12" class="text-h7  section-subheading text-muted">Review</v-col>
          </v-row>
        </v-card>
        <v-row class="my-2">
          <v-carousel
              ref="reviewCarousel"
              height="310"
              hide-delimiters :touchless="true"
              show-arrows-on-hover
              continuous
              cycle
              interval="4000"
              show-arrows
          >
            <v-carousel-item v-for="(review, i) in reviewList" :key="i"
                             reverse-transition="fade-transition"
                             transition="fade-transition"

            >
              <v-card class="mx-auto" color=""
                      outlined
                      elevation="5"
                      rounded
                      raised
                      height="300"
                      style="padding: 10px"
                      width="100%"
              >
                  <v-card-subtitle>
                    <v-row>
                      <v-col cols="6">
                        <v-row class="justify-end">
                          <strong>고객명 : {{ review.studentName }}</strong>
                          <p class="text-body-2">{{ review.startDate }}</p>
                        </v-row>
                      </v-col>
                    <v-col cols="6">
                      <v-row class="justify-end">
                        <v-rating
                            empty-icon="$mdiStarOutline"
                            full-icon="$mdiStar"
                            half-icon="$mdiStarHalfFull"
                            readonly
                            half-increments
                            dense
                            size="17"
                            hover
                            length="5"
                            v-model="review.rating"
                            color="yellow darken-3"
                            background-color="grey darken-1"
                        > </v-rating>
                        <div >{{review.rating }} / 5.0</div>
                      </v-row>
                    </v-col>
                    </v-row>
                  </v-card-subtitle>
                  <v-card-text style="height: 80%">
                    <Markdown :markdown="review.reviewText" />
                  </v-card-text>
                </v-card>
              </v-carousel-item>
            </v-carousel>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Markdown from '@/components/Markdown'
import apiReview from "@/api/modules/api-review";
import {mapGetters} from "vuex";

export default {
  name: 'MainReview',
  components: {
    Markdown
  },
  data(){
    return {
      reviewList: [],
      listLoading: true,
      move: [],
      drag: false,
      touch: false,
    }
  },
  computed: {
    ...mapGetters(['app', 'user', 'isManager']),
  },
  created() {},
  mounted() {
    this.getReviews(),
    // For touch devices
    this.$refs['reviewCarousel'].$el.addEventListener("touchmove", (e) => {
      this.drag = false;
      this.touch = true;
      this.logic(e);
    });
    window.addEventListener("touchend", () => {
      this.move = [];
    });

    // For non-touch devices

    this.$refs['reviewCarousel'].$el.addEventListener("mousedown", (e) => {
      this.drag = true;
      this.touch = false;
      this.logic(e);
    });
    this.$refs['reviewCarousel'].$el.addEventListener("mousemove", (e) => {
      this.drag ? this.logic(e) : null;
    });
    window.addEventListener("mouseup", () => {
      this.drag = false;
      this.touch = false;
      this.move = [];
    });
  },
  methods: {
    getReviews(){
      apiReview.getReviews()
        .then(res => {
          res.map(review => {
            review.studentName = review.studentName.substring(0,2) + '*'
            return review
          })
          return res
        })
        .then(res => this.reviewList = res)
    },
    logic(e) {
      let currentMove = this.touch ? e.touches[0].clientX : e.clientX;
      if (this.move.length == 0) {
        this.move.push(currentMove);
      }
      if (this.move[this.move.length - 1] - currentMove < -100) {
        this.$refs['reviewCarousel'].$el
            .querySelector(".v-window__prev")
            .querySelector(".v-btn")
            .click();
        this.drag = false;
        this.touch = false;
      }
      if (this.move[this.move.length - 1] - currentMove > 100) {
        this.$refs['reviewCarousel'].$el
            .querySelector(".v-window__next")
            .querySelector(".v-btn")
            .click();
        this.drag = false;
        this.touch = false;
      }
    }
  }
}
</script>
