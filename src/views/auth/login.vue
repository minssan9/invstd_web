<template>

  <div  class="row g-2" justify="center">
    <a type="button" style="width: 200px;"
       :href="getSocialLoginUrl('kakao')">
      <q-img type="button" width="200" height="40"
           src="https://cdn.en9doors.com/website/button/kakao-signin-korean.png"/>
    </a>
  </div >
  <div  class="row g-2" justify="center">
    <a type="button" style="width: 200px"
       :href="getSocialLoginUrl('google')">
      <q-img type="button" width="200" height="40"
           src="https://cdn.en9doors.com/website/button/google-signin-korean.png"/>
    </a>
  </div >
  <div  class="row g-2" justify="center">
    <a type="button" style="width: 200px"
       :href="getSocialLoginUrl('naver')">
      <q-img type="button" width="200" height="40"
           src="https://cdn.en9doors.com/website/button/naver-signin-korean.png"/>
    </a>
  </div >
</template>


<script>
import Cookies from 'vue-cookies/vue-cookies'

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      loading: false,
      showDialog: false,
      redirect: '',
      googleLoginLink: '',
      mobileDeviceType: ''
    }
  },
  computed: {
    // ...mapGetters(['isMobile']),
    logoImg: function () {
      if (this.$vuetify.theme.dark) {
        return `https://cdn.en9doors.com/website/logo/en9door_dark.png`
      } else {
        return "https://cdn.en9doors.com/website/logo/en9door.png"
      }
    }
  },
  created() {
    this.redirect = this.$route.query.redirect
    window.scrollTo(0,0);
  },
  mounted() {
    if(this.redirect) {
      Cookies.set('redirect', this.redirect);
    }
  },
  methods: {
    onChrome() {
      if (navigator.userAgent.match(/iPhone|iPad/i)) {
        // IOS
        window.location.href = 'googlechrome://en9doors.com'
      } else {
        // 안드로이드
        window.location.href = "intent://" + "en9doors.com" + "#Intent;scheme=https;package=com.android.chrome;end";
      }
    },
    getSocialLoginUrl(socialType) {
      // this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
      let REDIRECT_URI = `${import.meta.env.VITE_APP_REDIRECT_URL}/oauth/redirect`
      return `${import.meta.env.VITE_APP_API}/oauth2/authorization/${socialType}?redirect_uri=${REDIRECT_URI}`
    }
  }
}
</script>