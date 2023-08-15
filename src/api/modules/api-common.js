import {methods} from '@/api/axios-en9door'

// let fetchQuery = {role: '', username: '', size: 0, page: 1, sort: 'createdAt'}

const apiCommon = {
  getContent () {
    return methods.get('/ed/common/content')
  },
  getCourse () {
    return methods.get('/ed/common/course')
  },
  getSysConfLike (code) {
    return methods.get(`/ed/common/sys/conf/${code}`)
  },
  getAssignByOrderId(orderId){
    let queryDto = {}
    queryDto.orderId = orderId
    return methods.get(`/ed/common/assign`, queryDto)
  },
}

export default apiCommon
