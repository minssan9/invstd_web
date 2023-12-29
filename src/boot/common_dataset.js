import { boot } from 'quasar/wrappers'

export default boot(async ({ app, router, store }) => {
  const methods = {
    copy: (obj) => {
      if (obj === null || typeof obj !== 'object') {
        return obj
      }

      const result = Array.isArray(obj) ? [] : {}

      for (const key of Object.keys(obj)) {
        result[key] = methods.copy(obj[key])
      }

      return result
    },
    dsAssign: (fromDs, toDs) => {
      Object.assign(toDs, fromDs)
    },
    dsClear: (ds) => {
      for (const prop in ds) {
        if (typeof ds[prop] === 'object') {
          if (ds[prop] === null) {
            continue
          }
          const keyArr = Object.keys(ds[prop])
          for (const key of keyArr) {
            ds[prop][key] = ''
          }
          // ds[prop] = {}
        } else if (typeof ds[prop] === 'number') {
          ds[prop] = null
        } else {
          ds[prop] = ''
        }
      }
    },
    dsDisable: (ds) => {
      for (const variable in ds) {
        if (typeof variable === 'object') {
          return app.config.globalProperties.dsDisable(variable)
        }
        ds[variable] = true
      }
    },
    dsEnable: (ds) => {
      for (const variable in ds) {
        if (typeof variable === 'object') {
          return app.config.globalProperties.dsEnable(variable)
        }
        ds[variable] = false
      }
    },
    groupBy: (data, key) => {
      return data.reduce(function (carry, el) {
        const group = el[key]

        if (carry[group] === undefined) {
          carry[group] = []
        }

        carry[group].push(el)
        return carry
      }, {})
    },
    dsMask: (ds) => {
      for (const prop in ds) {
        if (['telno', 'fax', 'telno2', 'fax2', 'fax3',
          'rprsNo', 'faxno', 'picTelno1', 'picTelno2', 'picTelno3'].indexOf(prop) > -1) {
          ds[prop] = app.config.globalProperties.$setMaskingTelNumberFormat(ds[prop])
        }
        if (['eml', 'eml2'].indexOf(prop) > -1) {
          ds[prop] = app.config.globalProperties.$setMaskingEmailFormat(ds[prop])
        }
        if (['usrNm', 'USR_NM'].indexOf(prop) > -1) {
          ds[prop] = app.config.globalProperties.$setMaskingNameFormat(ds[prop])
        }
      }
    }
  }

  app.config.globalProperties.$copy = methods.copy
  app.config.globalProperties.$dsAssign = methods.dsAssign
  app.config.globalProperties.$dsClear = methods.dsClear
  app.config.globalProperties.$dsDisable = methods.dsDisable
  app.config.globalProperties.$dsEnable = methods.dsEnable
  app.config.globalProperties.$groupBy = methods.groupBy
  app.config.globalProperties.$dsMask = methods.dsMask
})
