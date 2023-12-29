import { boot } from 'quasar/wrappers'

export default boot(async ({ app, router, store }) => {
  const methods = {
    grdTextReturn (val, objDs, pCode, pName) {
      val = String(val)
      if (app.config.globalProperties.$isNull(val) || val === 'null') {
        return ''
      }
      let category
      let cnt = 0
      const strCode = app.config.globalProperties.$isNull(pCode) ? 'value' : pCode
      const strName = app.config.globalProperties.$isNull(pName) ? 'label' : pName
      for (let i = 0; i < objDs.length; i++) {
        category = objDs[i][strCode]
        if (category === val) {
          cnt = cnt + 1
          val = objDs[i][strName]
          break
        }
      }
      // if (cnt < 1) {
      //   return ''
      // }
      return val
    },
    grdUserDateFormat (rowIndex, columnIndex, value, headerText, item) {
      const rtn = app.config.globalProperties.$userDateFormat(value)
      if (rtn === null) {
        return ''
      }
      return rtn
    },
    grdUserNameFormat (rowIndex, columnIndex, value, headerText, item) {
      const userList = store.getters.getAllUserList
      // const that = this
      return methods.grdTextReturn(value, userList, 'usrId', 'usrNm')
    },
    grdMaskingNameFormat (rowIndex, columnIndex, value, headerText, item) {
      return app.config.globalProperties.$setMaskingNameFormat(value)
    },
    grdMaskingTelNumberFormat (rowIndex, columnIndex, value, headerText, item) {
      return app.config.globalProperties.$setMaskingTelNumberFormat(value)
    },
    grdMaskingEmailFormat (rowIndex, columnIndex, value, headerText, item) {
      return app.config.globalProperties.$setMaskingEmailFormat(value)
    },
    setMaxLength (length) {
      const obj = {
        type: 'InputTypeRenderer',
        validator: function (oldValue, newValue, rowItem) {
          let isValid = true
          if (newValue.length > length) {
            isValid = false
          }
          return {
            validate: isValid,
            message: length + ' ' + app.config.globalProperties.$getMlt('B083')
          }
        }
      }
      return obj
    },
    setValidTinyintData (length) {
      const obj = {
        type: 'InputTypeRenderer',
        onlyNumeric: true,
        validator: function (oldValue, newValue, rowItem) {
          let isValid = true
          if (newValue.length > length) {
            isValid = false
          }
          if (newValue < -128 || newValue > 127) {
            isValid = false
          }
          return {
            validate: isValid,
            message: app.config.globalProperties.$getMlt('M_TINYINT(4)') // -128 ~ 127 값을 입력해주세요
          }
        }
      }
      return obj
    },
    grdCalender (noPast) {
      const that = app.config.globalProperties
      const date = new Date()
      const today = new Date(String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'))
      const obj = {
        type: 'CalendarRenderer',
        showExtraDays: true, // 지난달, 다음달 여분의 날짜 표현여부
        onlyCalendar: false,
        showPlaceholder: false,
        defaultFormat: 'yyyy-mm-dd',
        validator: function (oldValue, newValue, rowItem) {
          if (that.$isNull(that)) {
            return { validate: true }
          }
          const isValid = that.$isValidDate(newValue, 'yyyy-mm-dd')
          if (isValid && !that.$isNull(noPast) && !noPast) {
            if (new Date(newValue) < today) {
              return { validate: false, message: 'Past dates cannot be entered.' }
            }
          }
          return { validate: isValid, message: 'Invalid Date. Pleas Input yyyymmdd. \r\n ex) 2999/12/31' }
        }
      }
      return obj
    },
    grdMonthCalender () {
      const that = app.config.globalProperties
      const obj = {
        type: 'CalendarRenderer',
        onlyMonthMode: true,
        showExtraDays: true, // 지난달, 다음달 여분의 날짜 표현여부
        onlyCalendar: false,
        showPlaceholder: false,
        defaultFormat: 'yyyy-mm',
        validator: function (oldValue, newValue, rowItem) {
          if (that.$isNull(that)) {
            return { validate: true }
          }
          const isValid = that.$isValidMonthDate(newValue, 'yyyy-mm')
          return { validate: isValid, message: 'Invalid Date. Pleas Input yyyy-mm. \r\n ex) 2999-12' }
        }
      }
      return obj
    },
    grdTime () {
      const that = app.config.globalProperties
      const obj = {
        type: 'InputTypeRenderer',
        maxlength: 5,
        validator: function (oldValue, newValue, rowItem) {
          if (newValue !== '' && oldValue !== newValue) {
            const leng = newValue.length
            const isValid = true
            let hour, minute

            if (!(leng === 4 || leng === 5)) {
              return { validate: false, message: that.$getMlt('B451') } // 시간형식은 4글자 혹은 5글자로 입력해주세요. ex) '08:30', '0830'
            }
            if (leng === 4) {
              hour = newValue.toString().substring(0, 2)
              minute = newValue.toString().substring(2, 4)
            } else if (leng === 5) {
              const timeArr = newValue.split(':')
              if (timeArr.length !== 2) {
                return { validate: false, message: that.$getMlt('B452') } // 5글자인 경우 '08:30' 형식으로 입력해주세요.
              }
              hour = timeArr[0]
              minute = timeArr[1]
              if (hour.length !== 2 || minute.length !== 2) {
                return { validate: false, message: that.$getMlt('B456') } // 시간과 분은 2글자로 입력해주세요.
              }
            }

            if (isNaN(hour) || isNaN(minute)) {
              return { validate: false, message: that.$getMlt('B029') } // 숫자만 입력가능합니다.
            }
            if (Number(hour) < 0 || Number(hour) > 23) {
              return { validate: false, message: that.$getMlt('B453') } // 시간은 23시 까지 입력 가능합니다.
            }
            if (Number(minute) < 0 || Number(minute) > 59) {
              return { validate: false, message: that.$getMlt('B454') } // 분은 59분까지 입력 가능합니다.
            }

            return { validate: isValid, message: that.$getMlt('B455') } // 잘못된 시간형식입니다. HH:mm , HHmm형식으로 입력해주세요.
          }
        }
      }
      return obj
    },
    gridFilterPopupSizeFix () {
      if (document.getElementsByClassName('aui-grid-filter-popup-layer').length > 0) {
        const filterEls = document.getElementsByClassName('aui-grid-filter-popup-layer')
        for (let i = 0; i < filterEls.length; i++) {
          const filterEl = filterEls[i]
          if (filterEl.style.display === 'block' && filterEl.style.top > '600px') {
            filterEl.style.top = '600px'
          }
        }
      }
    }
  }

  app.config.globalProperties.$grdTextReturn = methods.grdTextReturn
  app.config.globalProperties.$grdUserDateFormat = methods.grdUserDateFormat
  app.config.globalProperties.$grdUserNameFormat = methods.grdUserNameFormat
  app.config.globalProperties.$grdMaskingTelNumberFormat = methods.grdMaskingTelNumberFormat
  app.config.globalProperties.$grdMaskingEmailFormat = methods.grdMaskingEmailFormat
  app.config.globalProperties.$grdMaskingNameFormat = methods.grdMaskingNameFormat
  app.config.globalProperties.$setMaxLength = methods.setMaxLength
  app.config.globalProperties.$setValidTinyintData = methods.setValidTinyintData
  app.config.globalProperties.$grdCalender = methods.grdCalender
  app.config.globalProperties.$grdMonthCalender = methods.grdMonthCalender
  app.config.globalProperties.$grdTime = methods.grdTime
  app.config.globalProperties.$gridFilterPopupSizeFix = methods.gridFilterPopupSizeFix
})
