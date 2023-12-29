import { boot } from 'quasar/wrappers'

export default boot(async ({ app, router, store }) => {
  console.log(process.env.ENV_PROFILE)
  // something to do
  const WASURL = process.env.URL_WAS
  const API_SDP = process.env.URL_API_SDP
  const OAUTH_LOGIN_URL = process.env.OAUTH_LOGIN_URL
  const OAUTH_LOGOUT_URL = process.env.OAUTH_LOGOUT_URL
  const ENV_TYPE = process.env.ENV_TYPE

  let PROCESSURL = process.env.URL_PROCESS

  const ITEMIMGURL = WASURL + '/itemImg'
  const UPLOADURL = WASURL + '/UPLOAD'
  let EMAILURL = ''
  const IS_DOMESTIC = process.env.IS_DOMESTIC === 'true'
  // const IS_DOMESTIC = false

  if (process.env.ENV_TYPE === 'local') {
    PROCESSURL = `http://${location.host.substr(0, location.host.indexOf(':'))}`
    EMAILURL = PROCESSURL + ':8080' + '/hwms/APPROVAL?'
  } else {
    EMAILURL = PROCESSURL + 'hwms/APPROVAL?'
  }

  const HTTP_CUSTOM_STS = {
    STS_NO_AUTH: 491,
    STS_NO_NEEDREFRESH: 492,
    STS_FAIL_EXPIRE: 493,
    STS_DUPLICATE: 494,
    STS_FAIL_AUTH: 499,
    STS_UPDATED: 490
  }

  const ERROR_CUSTOM_STS = {
    STS_BIZ: -1,
    STS_SQL_BADGRAMMER: 1054,
    STS_BADREQ: 14000
  }

  SVGAnimatedString.prototype.indexOf = function (a, b) {
    return this.baseVal.indexOf(a, b)
  }
  // const OneErrHandler = (err, vm, info) => {
  //   console.log('---One Err handler Start---')
  //   let vmName = ''
  //   try {
  //     vmName = vm.$.type.name
  //   } catch {
  //     vmName = ''
  //   }
  //   console.log(vm.$.data)
  //   console.log(JSON.stringify(vm.$.data))
  //   console.log(`vmName   : ${vmName}`)
  //   console.log(`info     : ${info}`)
  //   console.log('err->')
  //   console.log(err)
  //   // const sendData = [{
  //   //   ds_json: [{}]
  //   // }]
  //   // vm.$.appContext.app.config.globalProperties.$fetch('bas/getActionList.json', sendData)
  //   //   .then(async (res) => {
  //   //     console.log(res)
  //   //   })
  //   //   .catch(error => error)
  //   console.log('---One Err handler End---')
  // }

  // app.config.errorHandler = OneErrHandler

  app.config.globalProperties.$WASURL = WASURL
  app.config.globalProperties.$PROCESSURL = PROCESSURL
  app.config.globalProperties.$API_SDP = API_SDP
  app.config.globalProperties.$EMAILURL = EMAILURL
  app.config.globalProperties.$ITEMIMGURL = ITEMIMGURL
  app.config.globalProperties.$UPLOADURL = UPLOADURL
  app.config.globalProperties.$HTTP_CUSTOM_STS = HTTP_CUSTOM_STS
  app.config.globalProperties.$ERROR_CUSTOM_STS = ERROR_CUSTOM_STS
  app.config.globalProperties.$IS_DOMESTIC = IS_DOMESTIC
  app.config.globalProperties.$OAUTH_LOGIN_URL = OAUTH_LOGIN_URL
  app.config.globalProperties.$OAUTH_LOGOUT_URL = OAUTH_LOGOUT_URL
  app.config.globalProperties.$ENV_TYPE = ENV_TYPE
})
