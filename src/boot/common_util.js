import { dom, date, uid, Cookies } from 'quasar'
// import crypto from 'crypto'

import CryptoJS from 'crypto-js'
const { height, width } = dom

import { boot } from 'quasar/wrappers'

export default boot(async ({ app, router, store }) => {
  const methods = {
    onInit: (masterCode) => {
    },
    lpad: (str, padLength, padString) => {
      while (str.length < padLength) {
        str = padString + str
      }
      return str
    },
    rpad: (str, padLength, padString) => {
      while (str.length < padLength) {
        str += padString
      }
      return str
    },
    isNull: (val) => {
      try {
        if (typeof val === 'number' && val === 0) {
          return false
        }
        if (val === null || val === '' || val === undefined || val === 'undefined' || val === 'null' || val === 'NaN' || val === 'Infinity') {
          return true
        }
        if (val instanceof Date && !isNaN(val.valueOf())) {
          return false
        }
        if (typeof val === 'object') {
          if (val._ !== undefined) {
            return false
          }
          if (val === null || Object.keys(val).length === 0) {
            return true
          }
        }
        return false
      } catch {
        return true
      }
    },
    getMlt: (mltCode, params) => {
      let pMltCode
      let pParams
      let pItems
      let paramTextObj

      if (!app.config.globalProperties.$isNull(params)) pParams = params

      if (methods.isNull(mltCode)) {
        return methods.nullConvert(mltCode)
      }

      if (typeof mltCode === 'string') {
        pMltCode = mltCode
      } else if (typeof mltCode === 'object') {
        pMltCode = mltCode[0]
        pParams = mltCode[1]
      }

      const mltList = JSON.parse(window.sessionStorage.getItem('MltList'))

      if (mltList === null || mltList.length < 1) {
        return mltCode
      }

      const textObj = mltList.find(v => v.textCd === pMltCode)

      if (methods.isNull(textObj)) {
        return pMltCode// + ' [등록!]'
      }

      let mlangNm = textObj.mlangNm
      mlangNm = mlangNm.replaceAll('\\n', `\n`)

      if (!app.config.globalProperties.$isNull(pParams) && pParams.length > 0) {
        pParams.forEach((item, i) => {
          pItems = item
          paramTextObj = mltList.find(v => v.textCd === pItems)
          mlangNm = mlangNm.replace(`{${i + 1}}`, !app.config.globalProperties.$isNull(paramTextObj) ? paramTextObj.mlangNm : item)
        })
      }

      return mlangNm
    },
    height: (el) => {
      let h
      try {
        h = height(el)
      } catch {
        h = 0
      }
      return h
    },
    width: (el) => {
      let w
      try {
        w = width(el)
      } catch {
        w = 0
      }
      return w
    },
    getCommonCode: (code) => {
      const codeList = JSON.parse(window.sessionStorage.getItem('Code'))

      if (codeList === null || codeList.length < 1) {
        return null
      }
      const codeData = codeList.filter(v => { return v.mainCd === code })
      const rtnDs = []
      // rtnDs.push({
      //   value: null,
      //   label: ''
      // })
      for (let i = 0; i < codeData.length; i++) {
        rtnDs.push(codeData[i])
      }
      return rtnDs
    },
    getCountry: (code) => {
      const countryList = JSON.parse(window.sessionStorage.getItem('Country'))

      if (countryList === null || countryList.length < 1) {
        return null
      }
      const countryData = countryList.filter(v => { return v.countryCd === code })
      return countryData[0]
    },
    getUserWarehouse: () => {
      const usrWhList = JSON.parse(window.sessionStorage.getItem('userWarehouseList'))

      if (usrWhList === null || usrWhList.length < 1) {
        return null
      }
      return usrWhList
    },
    isValidDate: (param, format) => {
      if (app.config.globalProperties.$isNull(param)) {
        return true
      }
      try {
        param = param.replace(/-/g, '')
        param = param.replace(/\//g, '')

        const dateFormat = app.config.globalProperties.$isNull(format) ? store.getters.getDateFormat : format
        const maxLength = 8
        let year = 0
        let month = 0
        let day = 0

        if (dateFormat === 'DD/MM/YYYY') {
          year = Number(param.substring(4, 8))
          month = Number(param.substring(2, 4))
          day = Number(param.substring(0, 2))
        } else if (dateFormat === 'MM/DD/YYYY') {
          year = Number(param.substring(4, 8))
          month = Number(param.substring(0, 2))
          day = Number(param.substring(2, 4))
        } else {
          year = Number(param.substring(0, 4))
          month = Number(param.substring(4, 6))
          day = Number(param.substring(6, 8))
        }

        // 자리수가 맞지않을때
        if (isNaN(param) || param.length !== maxLength) {
          return false
        }

        if (month < 1 || month > 12) {
          return false
        }

        const maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let maxDay = maxDaysInMonth[month - 1]

        // 윤년 체크
        if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
          maxDay = 29
        }

        if (day <= 0 || day > maxDay) {
          return false
        }
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    isValidMonthDate: (param, format) => {
      if (app.config.globalProperties.$isNull(param)) {
        return true
      }
      try {
        param = param.replace(/-/g, '')
        param = param.replace(/\//g, '')

        const dateFormat = app.config.globalProperties.$isNull(format) ? store.getters.getDateFormat : format
        const maxLength = 6

        // let year = 0
        let month = 0

        if (dateFormat === 'MM/YYYY') {
          // year = Number(param.substring(2, 6))
          month = Number(param.substring(0, 2))
        } else {
          // year = Number(param.substring(0, 4))
          month = Number(param.substring(4, 6))
        }

        // 자리수가 맞지않을때
        if (isNaN(param) || param.length !== maxLength) {
          return false
        }

        if (month < 1 || month > 12) {
          return false
        }

        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    async toDay (format) {
      return new Promise(resolve => {
        let rtnDate = ''
        app.config.globalProperties.$fetch_sdp('adm/system/date')
          .then(async (res) => {
            rtnDate = res.data.date
            const yyyy = rtnDate.substring(0, 4)
            const mm = rtnDate.substring(4, 6)
            const dd = rtnDate.substring(6, 8)
            const hh = rtnDate.substring(8, 10)
            const mi = rtnDate.substring(10, 12)
            const ss = rtnDate.substring(12, 14)
            if (format === 'YYYY/MM/DD') {
              resolve(`${yyyy}/${mm}/${dd}`)
            } else if (format === 'MM/DD/YYYY') {
              resolve(`${mm}/${dd}/${yyyy}`)
            } else if (format === 'DD/MM/YYYY') {
              resolve(`${dd}/${mm}/${yyyy}`)
            } else if (format === 'YYYY/MM/DD HH:MI:SS') {
              resolve(`${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`)
            } else if (format === 'MM/DD/YYYY HH:MI:SS') {
              resolve(`${mm}/${dd}/${yyyy} ${hh}:${mi}:${ss}`)
            } else if (format === 'DD/MM/YYYY HH:MI:SS') {
              resolve(`${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss}`)
            } else if (format === 'YYYY/MM') {
              resolve(`${yyyy}/${mm}`)
            } else {
              resolve(`${yyyy}-${mm}-${dd}`)
            }
          })
          .catch(() => {
            resolve('')
          })
      })
    },
    async excuteSql (sqlCd, obj, returnType) {
      obj.sqlCd = sqlCd
      obj.returnType = returnType
      let bNoLoading = false
      if (!app.config.globalProperties.$isNull(obj.bNoLoading)) {
        bNoLoading = obj.bNoLoading
      }

      let module = 'adm'

      // TODO: 세션 다 삭제후 로그인시 카드 조회할때 moduleList <데이터가 없어서 모듈이 무조건 ADM 으로 세팅되어 에러나는현상이있음
      // MainLayout 쪽 해당 데이터 받아오는 부분 AWAIT 로 처리
      const moduleList = JSON.parse(window.sessionStorage.getItem('SqlList'))

      if (!app.config.globalProperties.$isNull(moduleList) && moduleList.length > 0) {
        const moduleData = moduleList.filter(v => { return v.sqlCd === sqlCd })

        if (moduleData.length === 1) {
          module = moduleData[0].module
        }
      }

      let sendData

      if (module !== 'adm') {
        sendData = app.config.globalProperties.$copy(obj)
        return await app.config.globalProperties.$get_api(`${module}/sql/execute`, sendData, bNoLoading)
      } else {
        sendData = [{
          ds_json: [app.config.globalProperties.$copy(obj)]
        }]
        return await app.config.globalProperties.$fetch_sdp(`${module}/sql/execute`, sendData, bNoLoading)
      }
    },
    getDateFromString (value) {
      if (app.config.globalProperties.$isNull(value)) return ''

      value = value.replace(/-/g, '').replace(/\//g, '').replace(/:/g, '').replace(/ /g, '').replace(/T/g, '')

      const hh = Number(value.substr(8, 2))
      const mi = Number(value.substr(10, 2))
      const ss = Number(value.substr(12, 2))

      let dateParam = {}
      let bTime = false
      if (hh > 0 || mi > 0 || ss > 0) {
        dateParam = { hours: hh, minutes: mi, seconds: ss }
        bTime = true
      }
      const dateVal = date.buildDate(dateParam)
      const userDateFormat = store.getters.getDateFormat
      const userTimeFormat = store.getters.getTimeFormat
      let newTimeFormat = ''

      if (bTime) {
        if (userTimeFormat === 'h') {
          newTimeFormat = ' A hh:mm:ss'
        } else {
          newTimeFormat = ' HH:mm:ss'
        }
      }
      const formatDate = app.config.globalProperties.$changeFormatDate(value, 'YYYY-MM-DD', userDateFormat)
      const formatTime = date.formatDate(dateVal, `${newTimeFormat}`)

      return formatDate + formatTime
    },
    getDateFromString24H (value) {
      if (app.config.globalProperties.$isNull(value)) return ''

      value = value.replace(/-/g, '').replace(/\//g, '').replace(/:/g, '').replace(/ /g, '').replace(/T/g, '')

      const hh = Number(value.substr(8, 2))
      const mi = Number(value.substr(10, 2))
      const ss = Number(value.substr(12, 2))

      let dateParam = {}

      if (hh > 0 || mi > 0 || ss > 0) {
        dateParam = { hours: hh, minutes: mi, seconds: ss }
      }
      const dateVal = date.buildDate(dateParam)
      const userDateFormat = store.getters.getDateFormat
      const newTimeFormat = ' HH:mm:ss'

      const formatDate = app.config.globalProperties.$changeFormatDate(value, 'YYYY-MM-DD', userDateFormat)
      const formatTime = date.formatDate(dateVal, `${newTimeFormat}`)

      return formatDate + formatTime
    },
    userDateFormat (value) {
      if (methods.isNull(value)) return value

      return methods.getDateFromString(value)
    },
    changeFormatDate (value, fromFormat, toFormat) {
      const param = value.replace(/-/g, '').replace(/\//g, '')
      let yyyy = 0
      let mm = 0
      let dd = 0

      if (fromFormat === 'DD/MM/YYYY') {
        yyyy = param.substring(4, 8)
        mm = param.substring(2, 4)
        dd = param.substring(0, 2)
      } else if (fromFormat === 'MM/DD/YYYY') {
        yyyy = param.substring(4, 8)
        mm = param.substring(0, 2)
        dd = param.substring(2, 4)
      } else {
        yyyy = param.substring(0, 4)
        mm = param.substring(4, 6)
        dd = param.substring(6, 8)
      }
      let formatVal = ``

      if (toFormat === 'DD/MM/YYYY') {
        formatVal = `${dd}/${mm}/${yyyy}`
      } else if (toFormat === 'MM/DD/YYYY') {
        formatVal = `${mm}/${dd}/${yyyy}`
      } else if (toFormat === 'YYYY/MM/DD') {
        formatVal = `${yyyy}/${mm}/${dd}`
      } else {
        formatVal = `${yyyy}-${mm}-${dd}`
      }

      return formatVal
    },
    inputScale (scale) {
      if (scale === '1') {
        return 'col-lg-1 col-md-2 col-sm-6 col-xs-12'
      } else if (scale === '2') {
        return 'col-lg-2 col-md-4 col-sm-6 col-xs-12'
      } else if (scale === '3') {
        return 'col-lg-3 col-md-6 col-sm-12 col-xs-12'
      } else if (scale === '4') {
        return 'col-lg-4 col-md-6 col-sm-12 col-xs-12'
      } else if (scale === '5') {
        return 'col-lg-5 col-md-10 col-sm-12 col-xs-12'
      } else if (scale === '6') { // TODO 여기서부터 계산점 필요
        return 'col-lg-6 col-md-7 col-sm-8 col-xs-12'
      } else if (scale === '7') {
        return 'col-lg-7 col-md-8 col-sm-9 col-xs-12'
      } else if (scale === '8') {
        return 'col-lg-8 col-md-9 col-sm-10 col-xs-12'
      } else if (scale === '9') {
        return 'col-lg-9 col-md-10 col-sm-11 col-xs-12'
      } else if (scale === '10') {
        return 'col-lg-10 col-md-11 col-sm-12 col-xs-12'
      } else if (scale === '11') {
        return 'col-lg-11 col-md-12 col-sm-12 col-xs-12'
      } else if (scale === '12') {
        return 'col-lg-12 col-md-12 col-sm-12 col-xs-12'
      } else {
        return 'col-lg-1 col-md-2 col-sm-3 col-xs-12'
      }
    },
    dateLocale () {
      const userLang = window.sessionStorage.getItem('$userLangType')

      if (userLang === 'KO') {
        return {
          /* starting with Sunday */
          days: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
          daysShort: '일_월_화_수_목_금_토'.split('_'),
          months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
          monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
          firstDayOfWeek: 1
        }
      } else {
        return {
          /* starting with Sunday */
          days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
          daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
          months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
          monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
          firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
          pluralDay: 'days'
        }
      }
    },
    blockEvent (e) {
      e.stopImmediatePropagation()
      e.preventDefault()
    },
    async nowDate (parm, setDate) {
      // var nowDate = new Date() // Quasar date
      const dateList = await app.config.globalProperties.$excuteSql('Q#getNowDate', {})
      let nowDate = new Date(dateList.data.rtnList[0].nowDate)
      if (parm === 'YYYY-MM-DD') {
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === 'YYYY-MM') {
        return date.formatDate(nowDate, 'YYYY-MM')
      } else if (parm === 'YYYY') {
        return date.formatDate(nowDate, 'YYYY')
      } else if (parm === '11month') { // 직전 1
        nowDate = date.addToDate(nowDate, { month: -11 })
        return date.formatDate(nowDate, 'YYYY-MM')
      } else if (parm === '1Month') {
        nowDate = date.addToDate(nowDate, { month: -1 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '2Month') {
        nowDate = date.addToDate(nowDate, { month: -2 })
        return date.formatDate(nowDate, 'YYYY-MM')
      } else if (parm === '3Month') {
        nowDate = date.addToDate(nowDate, { month: +3 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '6Month') {
        nowDate = date.addToDate(nowDate, { month: +6 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '-6Month') {
        nowDate = date.addToDate(nowDate, { month: -6 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '1year') {
        nowDate = date.addToDate(nowDate, { year: -1 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '3MonthDate') {
        nowDate = date.addToDate(nowDate, { month: -3 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '-1Day') {
        nowDate = date.addToDate(nowDate, { date: -1 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === 'frDate') {
        return date.formatDate(date.buildDate({ year: date.formatDate(nowDate, 'YYYY'), month: 1, date: 1 }), 'YYYY-MM-DD')
      } else if (parm === '-1Week') {
        nowDate = date.addToDate(nowDate, { date: -7 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '-2Week') {
        nowDate = date.addToDate(nowDate, { date: -14 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '4Week') { // 직전 4주
        const day = new Date().toISOString().slice(0, 10)
        const checkDay = date.formatDate(day, 'dddd')
        if (checkDay === 'Monday') {
          date.formatDate(day, 'YYYY-MM-DD')
          nowDate = date.addToDate(day, { days: -21 })
          return date.formatDate(nowDate, 'YYYY-MM-DD')
        } else {
          const day2 = date.formatDate(new Date().toISOString().slice(0, 10), 'dddd') // 요일 확인
          if (day2 !== 'Monday') {
            const day3 = date.formatDate(new Date().toISOString().slice(0, 10), 'YYYY-MM-DD')
            for (let i2 = 1; i2 <= 8; i2++) {
              const checkWeek = date.addToDate(day3, { days: -i2 })
              if (date.formatDate(checkWeek.toISOString().slice(0, 10), 'dddd') === 'Monday') {
                date.addToDate(date.formatDate(checkWeek, 'YYYY-MM-DD'), { days: -21 + i2 })
                return date.formatDate(date.addToDate(date.formatDate(checkWeek, 'YYYY-MM-DD'), { days: -21 + i2 }), 'YYYY-MM-DD')
              }
            }
          }
        }
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '8Week') { // 직전 8주
        const day = new Date().toISOString().slice(0, 10)
        const checkDay = date.formatDate(day, 'dddd')
        if (checkDay === 'Monday') {
          date.formatDate(day, 'YYYY-MM-DD')
          nowDate = date.addToDate(day, { days: -49 })
          return date.formatDate(nowDate, 'YYYY-MM-DD')
        } else {
          const day2 = date.formatDate(new Date().toISOString().slice(0, 10), 'dddd') // 요일 확인
          if (day2 !== 'Monday') {
            const day3 = date.formatDate(new Date().toISOString().slice(0, 10), 'YYYY-MM-DD')
            for (let i = 1; i <= 8; i++) {
              const checkWeek = date.addToDate(day3, { days: -i })
              if (date.formatDate(checkWeek.toISOString().slice(0, 10), 'dddd') === 'Monday') {
                return date.formatDate(date.addToDate(date.formatDate(checkWeek, 'YYYY-MM-DD'), { days: -49 }), 'YYYY-MM-DD')
              }
            }
          }
        }
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '12Week') {
        const day = new Date().toISOString().slice(0, 10)
        const checkDay = date.formatDate(day, 'dddd')
        if (checkDay === 'Monday') {
          date.formatDate(day, 'YYYY-MM-DD')
          nowDate = date.addToDate(day, { days: -77 })
          return date.formatDate(nowDate, 'YYYY-MM-DD')
        } else {
          const day2 = date.formatDate(new Date().toISOString().slice(0, 10), 'dddd') // 요일 확인
          if (day2 !== 'Monday') {
            const day3 = date.formatDate(new Date().toISOString().slice(0, 10), 'YYYY-MM-DD')
            for (let i = 1; i <= 8; i++) {
              const checkWeek = date.addToDate(day3, { days: -i })
              if (date.formatDate(checkWeek.toISOString().slice(0, 10), 'dddd') === 'Monday') {
                return date.formatDate(date.addToDate(date.formatDate(checkWeek, 'YYYY-MM-DD'), { days: -77 }), 'YYYY-MM-DD')
              }
            }
          }
        }
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '2Week') { // 직전 8주
        const day = new Date().toISOString().slice(0, 10)
        const checkDay = date.formatDate(day, 'dddd')
        if (checkDay === 'Monday') {
          date.formatDate(day, 'YYYY-MM-DD')
          nowDate = date.addToDate(day, { days: -7 })
          return date.formatDate(nowDate, 'YYYY-MM-DD')
        } else {
          const day2 = date.formatDate(new Date().toISOString().slice(0, 10), 'dddd') // 요일 확인
          if (day2 !== 'Monday') {
            const day3 = date.formatDate(new Date().toISOString().slice(0, 10), 'YYYY-MM-DD')
            for (let i = 1; i <= 8; i++) {
              const checkWeek = date.addToDate(day3, { days: -i })
              if (date.formatDate(checkWeek.toISOString().slice(0, 10), 'dddd') === 'Monday') {
                return date.formatDate(date.addToDate(date.formatDate(checkWeek, 'YYYY-MM-DD'), { days: -7 }), 'YYYY-MM-DD')
              }
            }
          }
        }
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === 'frLastMonthDate') {
        const chkMM = date.formatDate(setDate, 'MM')
        const frDate = date.formatDate(date.buildDate({ year: date.formatDate(setDate, 'YYYY'), month: date.formatDate(setDate, 'MM'), date: 1 }), 'YYYY-MM-DD')
        let lastDate
        if (chkMM === '12') {
          lastDate = date.formatDate(date.buildDate({ year: date.formatDate(date.addToDate(setDate, { years: +1 }), 'YYYY'), month: date.formatDate(date.addToDate(setDate, { month: +1 }), 'MM'), date: 0 }), 'YYYY-MM-DD')
        } else {
          lastDate = date.formatDate(date.buildDate({ year: date.formatDate(setDate, 'YYYY'), month: date.formatDate(date.addToDate(setDate, { month: +1 }), 'MM'), date: 0 }), 'YYYY-MM-DD')
        }
        return [frDate, lastDate]
      } else if (parm === 'frLastMonthDate2') {
        const chkMM = date.formatDate(setDate, 'MM')
        const frDate = date.formatDate(date.buildDate({ year: date.formatDate(setDate, 'YYYY'), month: date.formatDate(setDate, 'MM'), date: 1 }), 'YYYY-MM-DD')
        let lastDate
        if (chkMM === '12') {
          lastDate = date.formatDate(date.buildDate({ year: date.formatDate(date.addToDate(setDate, { years: +1 }), 'YYYY'), month: date.formatDate(date.addToDate(setDate, { month: +1 }), 'MM'), date: 0 }), 'YYYY-MM-DD')
        } else {
          lastDate = date.formatDate(date.buildDate({ year: date.formatDate(setDate, 'YYYY'), month: date.formatDate(date.addToDate(setDate, { month: +1 }), 'MM'), date: 0 }), 'YYYY-MM-DD')
        }
        return [frDate, lastDate]
      } else if (parm === 'frLastYearMonthDate') {
        const frYearMonthFrom = date.formatDate(date.buildDate({ year: date.formatDate(nowDate, 'YYYY'), month: 1, date: 1 }), 'YYYY-MM-DD')
        const frYearMonthTo = date.formatDate(date.buildDate({ year: date.formatDate(nowDate, 'YYYY'), month: 13, date: 0 }), 'YYYY-MM-DD')
        return [frYearMonthFrom, frYearMonthTo]
      } else {
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      }
    },
    nowdateParser (nowDate, parm, dateParam) {
      nowDate = new Date(nowDate)
      if (parm === '1Month') {
        nowDate = date.addToDate(nowDate, { months: -1 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '1Month2') {
        nowDate = date.addToDate(nowDate, { months: -1 })
        return date.formatDate(nowDate, 'YYYY-MM')
      } else if (parm === '1Month3') {
        nowDate = date.addToDate(nowDate, { months: +1 })
        return date.formatDate(nowDate, 'YYYY-MM')
      } else if (parm === '+1Month') {
        nowDate = date.addToDate(nowDate, { months: +1 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '1year') {
        nowDate = date.addToDate(nowDate, { years: -1 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '3Month') {
        nowDate = date.addToDate(nowDate, { months: +3 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '-3Month') {
        nowDate = date.addToDate(nowDate, { months: -3 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '-6Month') {
        nowDate = date.addToDate(nowDate, { months: -6 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '6Month') {
        nowDate = date.addToDate(nowDate, { months: +6 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '-1Week') {
        nowDate = date.addToDate(nowDate, { days: -7 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '-2Week') {
        nowDate = date.addToDate(nowDate, { days: -14 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '-1Day') {
        nowDate = date.addToDate(nowDate, { days: -1 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === '1Day') {
        nowDate = date.addToDate(nowDate, { days: 1 })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === 'YYYY') {
        return date.formatDate(nowDate, 'YYYY')
      } else if (parm === 'YYYY-MM') {
        return date.formatDate(nowDate, 'YYYY-MM')
      } else if (parm === 'MM') {
        return date.formatDate(nowDate, 'MM')
      } else if (parm === 'YYYYMMDD') {
        return date.formatDate(nowDate, 'YYYYMMDD')
      } else if (parm === 'calcDay') {
        nowDate = date.addToDate(nowDate, { days: +dateParam })
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      } else if (parm === 'frLastMonthDate') {
        const frDate = date.formatDate(date.buildDate({ year: date.formatDate(nowDate, 'YYYY'), month: date.formatDate(nowDate, 'MM'), date: 1 }), 'YYYY-MM-DD')
        // const lastDate = date.formatDate(date.buildDate({ year: date.formatDate(nowDate, 'YYYY'), month: date.formatDate(date.addToDate(nowDate, { months: +1 }), 'MM'), date: 0 }), 'YYYY-MM-DD')

        let lastDate
        if (date.formatDate(nowDate, 'MM') === '12') {
          lastDate = date.formatDate(date.buildDate({ year: date.formatDate(date.addToDate(nowDate, { years: +1 }), 'YYYY'), month: date.formatDate(date.addToDate(nowDate, { month: +1 }), 'MM'), date: 0 }), 'YYYY-MM-DD')
        } else {
          lastDate = date.formatDate(date.buildDate({ year: date.formatDate(nowDate, 'YYYY'), month: date.formatDate(date.addToDate(nowDate, { month: +1 }), 'MM'), date: 0 }), 'YYYY-MM-DD')
        }
        return [frDate, lastDate]
      } else if (parm === 'firstDayOfPreMonth') {
        return date.formatDate(date.buildDate({ year: date.formatDate(nowDate, 'YYYY'), month: date.formatDate(date.addToDate(nowDate, { months: -1 }), 'MM'), date: 1 }), 'YYYY-MM-DD')
      } else if (parm === 'firstLastMonth') {
        const frMonth = date.formatDate(date.buildDate({ year: date.formatDate(nowDate, 'YYYY'), month: 1, date: 1 }), 'YYYY-MM')
        const lastMonth = date.formatDate(date.buildDate({ year: date.formatDate(nowDate, 'YYYY'), month: 12, date: 1 }), 'YYYY-MM')
        return [frMonth, lastMonth]
      } else {
        return date.formatDate(nowDate, 'YYYY-MM-DD')
      }
    },
    hasOwn (obj, key) {
      const hasOwnProperty = Object.prototype.hasOwnProperty
      return hasOwnProperty.call(obj, key)
    },
    nullConvert (value, str) {
      if ((typeof value === 'number') && value === 0) value = String(value)
      if (value === null || value === '' || value === undefined || value === 'null' || String(value) === 'NaN') {
        return methods.isNull(str) ? '' : str
      }
      return value
    },
    async callReport (file, param, fileName) {
      let rdList = await app.config.globalProperties.$excuteSql('Q#getRDInfo', {})
      rdList = rdList.data.rtnList
      const host = rdList.filter(v => v.configCd === 'RD_HOST')[0].configValue
      const urlPath = rdList.filter(v => v.configCd === 'RD_URLPATH')[0].configValue
      const filePrefix = rdList.filter(v => v.configCd === 'RD_FILEPREFIX')[0].configValue
      const ds = rdList.filter(v => v.configCd === 'RD_DS')[0].configValue

      let strCall = `${host}${urlPath}?file=${filePrefix}/${file}&ds=${ds}&param=${param} /rexportopt [6]`

      if (!app.config.globalProperties.$isNull(fileName)) {
        strCall += `&filename=${fileName}`
      }

      window.open(strCall, '_blank')
    },
    async getMultiParamKey (strKey, list) {
      let multiKey = ''
      for (const obj of list) {
        for (const key in obj) {
          if (strKey !== key) {
            delete obj[key]
          }
        }
      }
      const sendData = [{
        ds_json: list,
        ds_json2: [{ key: strKey }]
      }]
      await app.config.globalProperties.$save('adm/Multikey', sendData)
        .then(async (res) => {
          multiKey = res.data.rtnMap.multiKey
        })
      return multiKey
    },
    getHash (value) {
      // return crypto.createHash('sha512').update(value, 'utf8').digest('hex')
      return CryptoJS.SHA512(value).toString(CryptoJS.enc.Hex) // .update(value, 'utf8').digest('hex')
    },
    toUTF8Array (str) {
      const utf8 = []
      for (let i = 0; i < str.length; i++) {
        const charcode = str.charCodeAt(i)
        if (charcode < 0x80) utf8.push(charcode)
        else if (charcode < 0x800) utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f))
        else if (charcode < 0xd800 || charcode >= 0xe000) utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f))
        else utf8.push(0xef, 0xbf, 0xbd)
      }
      return utf8
    },
    setCardParam (p) {
      let jsonString = '{'
      p = p.replaceAll('{', '').replaceAll('}', '')
      const items = p.split(',')
      for (let i = 0; i < items.length; i++) {
        const current = items[i].split(':')
        jsonString += '"' + current[0] + '":"' + current[1] + '",'
      }
      jsonString = jsonString.substr(0, jsonString.length - 1)
      jsonString += '}'
      return JSON.parse(jsonString)
    },
    set (obj, key, val) {
      obj[key] = val
    },
    routerPush (mstCd, query, cardParam) {
      this.$store.commit('setCardParam', cardParam)
      this.$router.push({ name: mstCd, query: { mstCd: query } })
        .catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            throw error
          }
        })
    },
    getRouterParam () {
      const cardParam = this.$store.getters.getCardParam
      this.$store.commit('setCardParam', '')
      return cardParam
    },
    removeItem (arr, value) {
      const index = arr.indexOf(value)
      if (index > -1) {
        arr.splice(index, 1)
      }
      return arr
    },
    calc: (val) => {
      try {
        if (isNaN(val) || methods.isNull(val)) return 0

        const T = Number('1e' + 3)

        return Math.round((val) * T) / T
      } catch {
        return 0
      }
    },
    replaceAllCommaNum (value) {
      if (methods.isNull(value)) return
      if (Number(value) === 0) return
      const replaceVal = value + ''
      return replaceVal.replaceAll(',', '')
    },
    setCommaNum (value) {
      if (methods.isNull(value)) return
      if (Number(value) === 0) return value
      const replaceVal = value + ''
      return replaceVal.replaceAll(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    getUid () {
      return uid()
    },
    async genKey (keyCls, rule1, rule2, rule3, rule4, rule5, length, separator) {
      if (methods.isNull(keyCls)) return
      const r1 = methods.isNull(rule1) ? '' : rule1
      const r2 = methods.isNull(rule2) ? '' : rule2
      const r3 = methods.isNull(rule3) ? '' : rule3
      const r4 = methods.isNull(rule4) ? '' : rule4
      const r5 = methods.isNull(rule5) ? '' : rule5
      const l = methods.isNull(length) || isNaN(length) ? '4' : length
      const s = methods.isNull(separator) ? '-' : separator

      const sendData = [{
        ds_json: [{
          keyCls: keyCls,
          rule1: r1,
          rule2: r2,
          rule3: r3,
          rule4: r4,
          rule5: r5,
          length: l,
          separator: s
        }]
      }]
      return app.config.globalProperties.$save('adm/genKey', sendData)
    },
    validatePassword (password) {
      try {
        /********************************************************************************************************
         비밀번호 체크~
         1: 비밀번호는 최소 10자리 이상이여야 합니다.
         2: 비밀번호가 10글자 이상 (소문자, 대문자), 숫자, 특수문자 3종류 이상 조합하셔야 합니다.
         // -- 3: 비밀번호가 10글자 이상 일 경우 소문자, 대문자, 숫자, 특수문자 중 2종류 이상 조합하셔야 합니다.
         /********************************************************************************************************/
        const reg = /^(?=.*?[A-Z])/ // 대문자
        const reg2 = /^(?=.*?[a-z])/ // 소문자
        const reg3 = /^(?=.*?[0-9])/ // 숫자
        const reg4 = /^(?=.*?[#?!@$%^&*-])/ // 특수문자
        const reg5 = /\s/ // 공백
        let chkCount = 0
        if (reg.test(password) || reg2.test(password)) {
          chkCount += 1
        }
        if (reg3.test(password)) {
          chkCount += 1
        }
        if (reg4.test(password)) {
          chkCount += 1
        }
        if (reg5.test(password)) {
          return methods.getMlt('M_PWERROR')
        }
        if (password.length >= 10) {
          if (chkCount < 3) {
            return methods.getMlt('M_PWVAL2')
          }
        } else {
          return methods.getMlt('M_PWVAL2')
        }
        return ''
      } catch {
        return methods.getMlt('M_ERROR')
      }
    },
    setCookie (name, val, options) {
      let isSet = false
      let opts = {}
      try {
        if (typeof options === 'object') {
          // https://quasar.dev/quasar-plugins/cookies/
          /*
            expires: 10 // in 10 days
            expires: -1 // yesterday
            expires: 'Mon, 06 Jan 2020 12:52:55 GMT'
            expires: new Date() // some JS Date Object
            expires: '1d 3h 5m' // in 1 day, 3 hours, 5 minutes
            expires: '2d' // in 2 days
            expires: '15m 10s' // in 15 minutes, 10 seconds
            domain: 'quasar.dev'
            httpOnly: true
            sameSite: 'Strict'
            secure: true
           */
          opts = options
        }
        Cookies.set(name, val, opts)
      } catch (e) {
        isSet = true
      }
      return isSet
    },
    getCookie (name) {
      let cookieVal = ''
      try {
        if (Cookies.has(name)) {
          cookieVal = Cookies.get(name)
        }
      } catch (e) {
      }
      return cookieVal
    },
    getCookieAll () {
      return Cookies.getAll()
    },
    hasCookie (name) {
      return Cookies.has(name)
    },
    setMaskingNameFormat (value) {
      try {
        if (value.length <= 2) {
          return value.replace(value.substring(1, 2), "*")
        }
        return (
          value[0] +
          "*".repeat(value.substring(1, value.length - 1).length) +
          value[value.length - 1]
        )
      } catch (e) {
        return '--mask--'
      }
    },
    setMaskingTelNumberFormat (value) {
      try {
        if (value.indexOf('-') > -1) {
          const values = value.split('-')
          values[1] = '*'.repeat(values[1].length)
          return values.join('-')
        } else {
          // 4번째 자리부터 마스킹처리
          //  1112233 , 010 9999 9999
          if (value.length > 0) {
            const mask = "*".repeat(4)
            return value.slice(0, 3) + mask + value.slice(mask.length + 3, value.length)
          }
          return ''
        }
      } catch (e) {
        // console.log(e)
        return ''
      }
    },
    setMaskingEmailFormat (value) {
      try {
        const mask = "*".repeat(value.split("@")[0].length - 2)
        return value.slice(0, 2) + mask + value.slice(mask.length + 2, value.length)
      } catch (e) {
        // console.log(e)
        return ''
      }
    },
    onOAuthLoginCheck (path) {
      sessionStorage.setItem('redirectUrl', encodeURI(path))
      const oAuthLoginUrl = app.config.globalProperties.$OAUTH_LOGIN_URL
      window.location.href = oAuthLoginUrl + '?redirectUri=' + encodeURIComponent(window.location.href)
    },
    async onOAuthLogout (path) {
      //  초기화
      this.$store.state.userInfo.userId = ''
      this.$store.state.userInfo.userNm = ''
      this.$store.state.userInfo.authGroup = ''
      this.$store.state.userInfo.authGroupNm = ''
      this.$store.state.userInfo.defaultOwnerCd = ''
      this.$store.state.userInfo.defaultOwnerNm = ''
      this.$store.state.userInfo.appcode = ''
      this.$store.state.userInfo.userTimeZone = ''
      this.$store.state.userInfo.userTimeZoneNm = ''
      this.$store.state.userInfo.dateFormat = ''
      this.$store.state.userInfo.timeFormat = ''
      this.$store.state.userInfo.userImage = ''
      window.sessionStorage.setItem('passType', '')
      window.sessionStorage.setItem('$userType', '')
      window.sessionStorage.setItem('$defaultOwnCd', '')
      window.sessionStorage.setItem('$defaultWhCd', '')
      window.sessionStorage.setItem('$uid', '')

      const oauthLogoutUrl = app.config.globalProperties.$OAUTH_LOGOUT_URL
      const mainUrl = app.config.globalProperties.$WASURL + (methods.isNull(path) ? '' : path)
      window.location.href = oauthLogoutUrl + '?redirectUri=' + encodeURIComponent(mainUrl)
    },
    async onOAuthCheck () {
      const empNo = this.$getCookie('empNo')
      const aTkn = this.$getCookie('aTkn')
      const rTkn = this.$getCookie('rTkn')

      if (empNo !== '' && aTkn !== '' && rTkn !== '') {
        const sendData = [{
          ds_json: [{
            empNo: empNo,
            aTkn: aTkn,
            rTkn: rTkn
          }]
        }]
        await this.$save_sdp('adm/oAuth/check', sendData)
          .then(async (res) => {
            // console.log(res)
            if (res.success === 'Y') {
              if (res.decEmpNo !== this.$store.getters.getUsrId) {
                return false
              }
              return true
            }
            return false
          })
          .catch((e) => {
          })
      } else {
        return false
      }
    },
    async onOAuthLogin () {
      const empNo = this.$getCookie('empNo')
      const aTkn = this.$getCookie('aTkn')
      const rTkn = this.$getCookie('rTkn')
      const uid = methods.getUid()

      if (empNo !== '' && aTkn !== '' && rTkn !== '') {
        const sendData = [{
          ds_json: [{
            empNo: this.$getCookie('empNo'),
            uid: uid,
            aTkn: this.$getCookie('aTkn'),
            rTkn: this.$getCookie('rTkn')
          }]
        }]
        await this.$save_sdp('adm/oAuth/login', sendData)
          .then(async (res) => {
            // console.log(res)
            if (res.data.rtnMap.ErrorCode === -1) {
              await this.$alert(res.data.rtnMap.ErrorMsg)
              this.visible = false
              methods.onOAuthLogout('/')
              return false
            } else {
              window.sessionStorage.setItem('$userAppList', JSON.stringify(res.data.rtnMap.userAppList))
              this.$store.commit('clearTab')
              this.$store.commit('clearCachedPages')
              this.$store.commit('removeMenu')
              if (JSON.parse(window.sessionStorage.getItem('$userAppList')) < 1) return

              window.sessionStorage.setItem('$usrId', res.data.rtnMap.usrId)
              window.sessionStorage.setItem('$usrNm', res.data.rtnMap.usrNm)
              window.sessionStorage.setItem('$authGrpCd', res.data.rtnMap.authGrpCd)
              window.sessionStorage.setItem('$authGrpNm', res.data.rtnMap.authGrpNm)
              window.sessionStorage.setItem('$defaultOwnCd', res.data.rtnMap.defaultOwnCd)
              window.sessionStorage.setItem('$defaultWhCd', res.data.rtnMap.defaultWhCd)
              window.sessionStorage.setItem('$defaultBizCd', res.data.rtnMap.defaultBizCd)
              window.sessionStorage.setItem('$defaultSalesPerson', res.data.rtnMap.defaultSalesPerson)
              window.sessionStorage.setItem('deptCd', res.data.rtnMap.deptCd)
              window.sessionStorage.setItem('$deptCd', res.data.rtnMap.deptCd)
              window.sessionStorage.setItem('$teamCd', res.data.rtnMap.teamCd)
              window.sessionStorage.setItem('$divisionCd', res.data.rtnMap.divisionCd)
              window.sessionStorage.setItem('userPosition', res.data.rtnMap.userPosition)
              window.sessionStorage.setItem('$userLangType', res.data.rtnMap.userLangType)
              window.sessionStorage.setItem('$userTimeZone', res.data.rtnMap.userTimeZone)
              window.sessionStorage.setItem('$userTimeZoneNm', res.data.rtnMap.userTimeZoneNm)
              window.sessionStorage.setItem('$userDateFormat', res.data.rtnMap.userDateFormat)
              window.sessionStorage.setItem('$userTimeFormat', res.data.rtnMap.userTimeFormat)
              window.sessionStorage.setItem('$userImage', res.data.rtnMap.userImage)
              window.sessionStorage.setItem('$userApp', '')
              window.sessionStorage.setItem('$accessToken', res.data.rtnMap.accessToken)
              window.sessionStorage.setItem('$refreshToken', res.data.rtnMap.refreshToken)
              window.sessionStorage.setItem('$userType', res.data.rtnMap.accnType)
              window.sessionStorage.setItem('$uid', uid)
              methods.getUserAuthGrpCd(res.data.rtnMap.usrId)

              const redirectUrl = sessionStorage.getItem('redirectUrl')
              window.sessionStorage.setItem('redirectUrl', '')
              console.log(redirectUrl)
              if (redirectUrl === '/') {
                this.$router.replace('/main')
              } else {
                this.$router.replace(redirectUrl)
              }
            }
          })
          .catch((e) => {
          })
      } else {
        methods.onOAuthLogout('/')
      }
    },
    getUserAuthGrpCd (usrId) {
      app.config.globalProperties.$excuteSql('Q#getUserAuthGrpCd', { usrId: usrId })
        .then(async (res) => {
          if (res.data.rtnList.length > 0) {
            window.sessionStorage.setItem('$authGroupCd', res.data.rtnList[0].authGrpCd)
            window.sessionStorage.setItem('$authGroupNm', res.data.rtnList[0].authGrpNm)
          }
        })
    }
  }

  app.config.globalProperties.$isNull = methods.isNull
  app.config.globalProperties.$getMlt = methods.getMlt
  app.config.globalProperties.$onInit = methods.onInit
  app.config.globalProperties.$height = methods.height
  app.config.globalProperties.$width = methods.width
  app.config.globalProperties.$getCommonCode = methods.getCommonCode
  app.config.globalProperties.$getCountry = methods.getCountry
  app.config.globalProperties.$getUserWarehouse = methods.getUserWarehouse
  app.config.globalProperties.$isValidDate = methods.isValidDate
  app.config.globalProperties.$isValidMonthDate = methods.isValidMonthDate
  app.config.globalProperties.$toDay = methods.toDay
  app.config.globalProperties.$excuteSql = methods.excuteSql
  app.config.globalProperties.$getDateFromString = methods.getDateFromString
  app.config.globalProperties.$getDateFromString24H = methods.getDateFromString24H
  app.config.globalProperties.$userDateFormat = methods.userDateFormat
  app.config.globalProperties.$changeFormatDate = methods.changeFormatDate
  app.config.globalProperties.$inputScale = methods.inputScale
  app.config.globalProperties.$dateLocale = methods.dateLocale
  app.config.globalProperties.$blockEvent = methods.blockEvent
  app.config.globalProperties.$nowDate = methods.nowDate
  app.config.globalProperties.$hasOwn = methods.hasOwn
  app.config.globalProperties.$getMonthsByCurYear = methods.getMonthsByCurYear
  app.config.globalProperties.$nullConvert = methods.nullConvert
  app.config.globalProperties.$callReport = methods.callReport
  app.config.globalProperties.$calcDay = methods.calcDay
  app.config.globalProperties.$getMultiParamKey = methods.getMultiParamKey
  app.config.globalProperties.$getHash = methods.getHash
  app.config.globalProperties.$lpad = methods.lpad
  app.config.globalProperties.$rpad = methods.rpad
  app.config.globalProperties.$setCardParam = methods.setCardParam
  app.config.globalProperties.$nowdateParser = methods.nowdateParser
  app.config.globalProperties.$set = methods.set
  app.config.globalProperties.$routerPush = methods.routerPush
  app.config.globalProperties.$routerPushInit = methods.routerPushInit
  app.config.globalProperties.$getRouterParam = methods.getRouterParam
  app.config.globalProperties.$removeItem = methods.removeItem
  app.config.globalProperties.$calc = methods.calc
  app.config.globalProperties.$replaceAllCommaNum = methods.replaceAllCommaNum
  app.config.globalProperties.$setCommaNum = methods.setCommaNum
  app.config.globalProperties.$getUid = methods.getUid
  app.config.globalProperties.$genKey = methods.genKey
  app.config.globalProperties.$validatePassword = methods.validatePassword
  app.config.globalProperties.$setMaskingNameFormat = methods.setMaskingNameFormat
  app.config.globalProperties.$setMaskingTelNumberFormat = methods.setMaskingTelNumberFormat
  app.config.globalProperties.$setMaskingEmailFormat = methods.setMaskingEmailFormat
  app.config.globalProperties.$setCookie = methods.setCookie
  app.config.globalProperties.$getCookie = methods.getCookie
  app.config.globalProperties.$getCookieAll = methods.getCookieAll
  app.config.globalProperties.$hasCookie = methods.hasCookie
  app.config.globalProperties.$onOAuthLogin = methods.onOAuthLogin
  app.config.globalProperties.$onOAuthLogout = methods.onOAuthLogout
  app.config.globalProperties.$onOAuthLoginCheck = methods.onOAuthLoginCheck
  app.config.globalProperties.$onOAuthCheck = methods.onOAuthCheck
})
