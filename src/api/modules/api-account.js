import {methods} from '@/api/axios-en9door'
import Cookies from 'vue-cookies'

const REDIRECT_URI = `${process.env.VITE_APP_REDIRECT_URL}/oauth/redirect`
const baesURL = `account`

const apiAccount = {
  getSocialLoginUrl (socialType, redirect) {
    if(redirect) {
      Cookies.set('redirect',redirect);
      Cookies.set('redirect', redirect);
    }
    return `${process.env.VITE_APP_API}/oauth2/authorization/${socialType}?redirect_uri=${REDIRECT_URI}`
  },
  getSocialConnect(socialType){
    return `${process.env.VITE_APP_API}/oauth2/auth-url/${socialType}`
  },
  saveAccountSns (providerType, oauth2Info) {
    return methods.post(`/oauth2/save/${providerType}`, oauth2Info)
  },
  getUser () {
    return methods.get(`${baesURL}`)
  },
  getTeacherList(fetchQuery) {
    fetchQuery.role = 'EN9DOOR_TEACHER'
    return methods.get(`${baesURL}/teacher`, fetchQuery )
  },
  putUser(account) {
    return methods.put(`${baesURL}`, account)
  }
}

export default apiAccount

