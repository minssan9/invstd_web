import { createApp } from 'vue'
const app = createApp()

const baseUrl = `${app.config.globalProperties.$APIURL}/pdf`

const apiPdf = {
  getAttendSheetPopup(assignId) {
    return window.open(`${baseUrl}/assign/${assignId}/attendance` )
  }
}


export default apiPdf
