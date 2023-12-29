import { boot } from 'quasar/wrappers'

const whiteList = [
  '/',
  'login',
  'pdaMain',
  'APPROVAL',
  // 'APP_DOWNLOAD'
  'appDownLoad'
] // no redirect whitelist

const yellowList = [
  'pMain',
  'Profile',
  'APPROVAL'
]

export default boot(async ({ app, router, store }) => {
  router.beforeEach(async (to, from, next) => {
    // this.commit('setdomestic', app.config.globalproperties.$is_domestic)
    if (window.location.href.indexOf('localhost') > 0 ||
      window.location.href.indexOf('wms-dev.hlholdings.co.kr') > 0 ||
      window.location.href.indexOf('127.0.0.1') > 0) {
      app.config.globalProperties.$IS_DOMESTIC = false
    }
    // app.config.globalProperties.$IS_DOMESTIC = false
    if (app.config.globalProperties.$IS_DOMESTIC) {
      /* console.log(to.fullPath)
      console.log('---' + app.config.globalProperties.$getCookie('empNo') + '----')
      console.log(app.config.globalProperties.$getCookieAll())
      console.log(app.config.globalProperties.$hasCookie('$accessToken'))
      console.log(app.config.globalProperties.$hasCookie('empNo'))
      console.log(window.sessionStorage.getItem('$accessToken'))
       */
      /**
       * 1. sso - empNo 쿠키 체크
       * 2. $accessToken 체크
       * */
      if (!app.config.globalProperties.$hasCookie('empNo')) {
        app.config.globalProperties.$onOAuthLoginCheck(to.fullPath)
        return
      } else {
        if (app.config.globalProperties.$isNull(window.sessionStorage.getItem('$accessToken'))) {
          sessionStorage.setItem('redirectUrl', encodeURI(to.fullPath))
          if (app.config.globalProperties.$onOAuthCheck()) {
            app.config.globalProperties.$onOAuthLogin()
          } else {
            app.config.globalProperties.$onOAuthLogout('/')
          }
          return
        } else {
          // 현재 로그인 된 사용자와 쿠키의 사용자가 다를경우 로그아웃 처리.
          if (!app.config.globalProperties.$onOAuthCheck()) {
            app.config.globalProperties.$onOAuthLogout('/')
          }
          next()
          return
        }
      }
    } else {
      if (whiteList.includes(to.name)) { // PDA Layout 작업을 위해 임시 오픈
        next()
        return
      }
      // PDA Layout 작업을 위해 임시 오픈
      if (to.fullPath.indexOf('/pda') > -1) {
        next()
        return
      }
    }
    if (!app.config.globalProperties.$isNull(to.name) &&
      !whiteList.includes(to.name) &&
      app.config.globalProperties.$isNull(window.sessionStorage.getItem('$accessToken'))
    ) {
      store.$router.push({ name: 'login' }).catch(error => error)
      return
    }

    if (!app.config.globalProperties.$isNull(to.name) &&
      !yellowList.includes(to.name) &&
      store.getters.getOrgMenuList.filter(v => v.mstCd === to.name) < 1
    ) {
      if (app.config.globalProperties.$IS_DOMESTIC) {
        app.config.globalProperties.$notify('Permission denied.')
        app.config.globalProperties.$onOAuthLoginCheck(to.fullPath)
        return
      } else {
        app.config.globalProperties.$notify('Permission denied.')
        store.$router.push({ name: 'login' }).catch(error => error)
        return
      }
    }

    if (window.sessionStorage.getItem('pageLoading') === 'Y') {
      return
    }
    window.sessionStorage.setItem('pageLoading', 'Y')
    setTimeout(() => {
      window.sessionStorage.setItem('pageLoading', 'N')
    }, 200)
    next()
  })

  router.afterEach((to, from) => {
    if (to.name === 'login') return
    if (to.matched[0].components.default.name === 'MainLayout' &&
      to.matched[1].components.default.name !== 'P_MAIN' &&
      !app.config.globalProperties.$isNull(to.matched[1].components.default.name)
    ) {
      store.commit('pushCachedPages', to.matched[1].components.default.name)
    }
    // tab이 없으면
    if (!app.config.globalProperties.$isNull(to.name) && !yellowList.includes(to.name) && store.getters.getTabList.filter(v => v.name === to.name).length < 1) {
      const target = store.getters.getOrgMenuList.filter(v => v.mstCd === to.name)[0]
      if (app.config.globalProperties.$isNull(target)) return
      // tabList 추가
      store.commit('addTab', {
        to: target.mstCd,
        icon: target.icon,
        name: target.mstCd,
        label: target.menuNm,
        mstCd: target.mstCd
      })
    }
  })
})
