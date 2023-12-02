import { Vue } from 'vue'
const baseUrl = `${Vue.config.globalProperties.$APIURL}/pdf`

const apiPdf = {
  getAttendSheetPopup(assignId) {
    Vue.prototype.$getMethod(`${baseUrl}/assign/${assignId}/sheet`, {} )
        .then(html => {
          const newWindow = window.open();
          newWindow.document.open();
          newWindow.document.write(html);
          newWindow.document.close();
        })
  }
}


export default apiPdf
