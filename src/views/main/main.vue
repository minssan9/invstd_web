  <template>
    <v-container :fluid="isMobile"
      v-on:scroll="handleScroll()">
      <v-row class="justify-center my-15"
             :ref="'scroll_section_0'">
        <v-col cols="12" sm="6">
          <v-card flat class="transparent">
            <v-card-title>
              <h4>원어민과 함께하는 영어<br>
                어디서 해야할지 고민이신가요?</h4>
            </v-card-title>
            <v-card-subtitle>
              회원가입부터 무료 테스트 신청까지 단 3분,
              직접 체험해 보세요.
            </v-card-subtitle>
            <v-card-actions>
              <E_BtnTest></E_BtnTest>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card-title class="justify-center mx-3 ">
            <img class="w-75" src="https://cdn.investand.com/design/img_banner2.png">
          </v-card-title>
        </v-col>
      </v-row>


      <v-row class="text-center my-15"
             :ref="'scroll_section_1'">
        <v-col cols="12" class="text-h4 font-weight-bold section-heading text-uppercase">영어문 서비스는?</v-col>
        <v-col cols="12" class="text-h7 section-subheading text-muted">How it works</v-col>
      </v-row>

      <v-row class="justify-center gy-1">
        <v-col cols="12" md="4">
          <v-card flat rounded outlined shaped height="150px" elevation="5"
                  class="text-white"
                  to="/main/class-info"
                  img="https://cdn.investand.com/design/img_sec01_card01.png" >
              <v-card-subtitle class="text-white">
                화상, 음성이 동일한 가격이며<br>
                영수증과 출석증을 발급해드려요.
              </v-card-subtitle>
              <v-card-title>
                운영방식
              </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat rounded outlined shaped height="150px" elevation="5"
                  class="text-white"
                  to="/main/teacher"
                  img="https://cdn.investand.com/design/img_sec01_card02.png" >
              <v-card-subtitle class="text-white">
                전문 교육과정을 수료한 선생님들을<br>
                지정 받아 고정된 시간에 수업을 받을 수 있어요.
              </v-card-subtitle>
              <v-card-title>
                원어민 선생님
              </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat rounded outlined shaped height="150px" elevation="5"
                  class="text-white"
                  to="/main/content"
                  img="https://cdn.investand.com/design/img_sec01_card03.png" >
              <v-card-subtitle class="text-white">
                유아부터 성인까지 단계별 맞춤과<br>
                폭넓은 주제, 컨텐츠로 교정을 받을 수 있어요.
              </v-card-subtitle>
              <v-card-title>
                1:1 집중관리
              </v-card-title>
          </v-card>
        </v-col>
      </v-row>


      <v-row class="text-center my-15">
        <v-col cols="12" class="text-h5 font-weight-bold section-heading text-uppercase">합리적인 서비스를 지향하는<br> 영어문 시스템입니다</v-col>
        <v-col cols="12" class="text-h7 section-subheading text-muted">Reasonable</v-col>
      </v-row>


      <v-card class="transparent" flat >
        <v-row class="justify-center gy-1"
               :ref="'scroll_section_2'">
          <v-col v-if="isMobile" cols="12" sm="6" >
            <v-card-title class="justify-center mx-3 ">
              <img class="w-50" src="https://cdn.investand.com/design/img_sec02_price2.png">
            </v-card-title>
          </v-col>
          <v-col cols="12" sm="6"
                class="my-10">
            <v-card-title>
              <h4>불필요한 부대비용을 없애고<br>
              핵심적인 수업 컨텐츠에만 집중하여<br>
              <strong class="text-primary">최저가</strong>에 도달
              </h4>
            </v-card-title>
            <v-card-subtitle>
              고객의 피드백을 빠르게 대응하기 위해<br>
              개발과 운영에 적극적으로 참여합니다.
            </v-card-subtitle>
            <v-card-subtitle>
              유지비용을 최소화하여 고객이 부담해야할 비용을<br>
              덜어드립니다.
            </v-card-subtitle>
          </v-col>
          <v-col v-if="!isMobile" cols="12" sm="6" >
            <v-card-title class="justify-center mx-3 ">
              <img class="w-50" src="https://cdn.investand.com/design/img_sec02_price2.png">
            </v-card-title>
          </v-col>
        </v-row>
      </v-card >

      <v-card class="transparent" flat>
        <v-row class="justify-center gy-1"
               :ref="'scroll_section_3'">
          <v-col cols="12" sm="6">
            <v-card-title class="justify-center mx-3 ">
              <img class="w-50"  src="https://cdn.investand.com/design/img_sec02_easy2.png">
            </v-card-title>
          </v-col>
          <v-col cols="12" sm="6">
              <v-card-title>
                <h4>회원가입에서 무료 레벨테스트까지<br>
                  <strong class="text-primary">단 3분</strong><br>
                  빠르고 간편하게<br>
                </h4>
              </v-card-title>
              <v-card-subtitle>
                나에게 잘 맞는 수업일지 망설이는 분들께<br>
                부담없이 무료 레벨테스트를 쉽고 편하게 제공합니다.
              </v-card-subtitle>
              <v-card-subtitle>
                결제는 그 후에도 늦지 않아요.
              </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="transparent" flat>
        <v-row class="justify-center gy-1"
               :ref="'scroll_section_4'">
          <v-col v-if="isMobile" cols="12" sm="6">
            <v-card-title class="justify-center mx-3 ">
              <img class="w-50"  src="https://cdn.investand.com/design/img_sec02_custom2.png">
            </v-card-title>
          </v-col>
          <v-col cols="12" sm="6">
              <v-card-title>
                <h4>수업 시간부터 방식까지,<br>
                  언제 어디서든 나에게 딱 맞게<br>
                  <strong class="text-primary">맞춤형</strong><br>
                </h4>
              </v-card-title>
              <v-card-subtitle>
                공부의 목적, 영어실력에 맞춰 내가 원하는 날<br>
                내가 원하는 시간에 유연하게 조정할 수 있어요.
              </v-card-subtitle>
          </v-col>
          <v-col  v-if="!isMobile"  cols="12" sm="6">
            <v-card-title class="justify-center mx-3 ">
              <img class="w-50"  src="https://cdn.investand.com/design/img_sec02_custom2.png">
            </v-card-title>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="transparent" flat>
        <v-row class="justify-center gy-1" align="center"
               :ref="'scroll_section_5'">
          <v-col cols="12" sm="6">
            <v-card-title class="justify-center mx-3 ">
                <img class="w-50"   src="https://cdn.investand.com/design/img_sec02_talk2.png">
            </v-card-title>
          </v-col>
          <v-col cols="12" sm="6">
              <v-card-title>
                <h4>필요한 교재는 무료로 제공하고<br>
                  말하는 자신감을 만들어 주는<br>
                </h4>
                <h4 class="text-primary">원어민 선생님과 <strong >즐거운 대화</strong></h4>
              </v-card-title>
              <v-card-subtitle>
                일상회화 주제부터 비즈니스 케이스, OPIC, Toeic Speaking 등<br>
                시험대비를 위한 교재도 준비되어 있어요.
                물론 무료로 저희가 제공해드립니다.
              </v-card-subtitle>

              <v-card-subtitle>
                우리에게 필요한 건 완벽한 문장이나 고급스런 표현이 아닙니다.<br>
                바로 생활영어 입니다.
              </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
      <v-row class="justify-center"
             :ref="'scroll_section_6'">
        <v-col cols="8" md="4">
          <E_BtnTest></E_BtnTest>
        </v-col>
      </v-row>

      <MainReview />
    </v-container>
</template>
<script>
import MainReview from "./views/main/main-review";
import {mapGetters, mapActions} from "vuex";
import E_BtnTest from "./components/E_TestBtn";

export default {
  name: 'About',
  data() {
    return {
      selected: {
        accountId: null,
        username: '',
      },
      searchQuery: {
        status: 'ACTIVE'
      },
      studentList: [],
      teacherList: [],
    }
  },
  components: {
    E_BtnTest,
    MainReview
  },
  computed: {
    ...mapGetters(['app','user', 'register','isMobile']),
    mainLogoImg(){
      return 'https://cdn.investand.com/website/logo/investand' + (this.$vuetify.theme.dark ? '_dark.png' : '.png' );
    },
    mainPageTitle1(){return this.app.sysconf.filter(s => s.code === 'investanda_MAIN_PAGE_TITLE_1').map(s => s.value).toString()},
    mainPageTitle2(){return this.app.sysconf.filter(s => s.code === 'investanda_MAIN_PAGE_TITLE_2').map(s => s.value).toString()},
    mainPageTitle3(){return this.app.sysconf.filter(s => s.code === 'investanda_MAIN_PAGE_TITLE_3').map(s => s.value).toString()},

  },
  created() {
    this.selected.accountId = this.$cookies.get('accountId');
    this.selected.username = this.$cookies.get('username');
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {

  },
  methods: {
    ...mapActions(['nextAnchor', 'prevAnchor']),
    onChrome(){
      window.location.href = 'googlechrome://investand.com'
    },
    openWindow(link) {
      this.$openWindow(link, 'book')
    },
  }
}
</script>

