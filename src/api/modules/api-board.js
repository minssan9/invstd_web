import {methods} from './api/axios-en9door'

const baseUrl = `board`

const apiBoard = {
  getBoard(boardId) {
    return methods.get(`${baseUrl}/${boardId}`)
  },
  getBoardPage(searchQuery) {
    return methods.get(baseUrl+ '/page/v1', searchQuery)
  },
  putBoard(row) {
    return methods.put(`${baseUrl}/${row.boardId}`, row)
  },
  saveBoard(board) {
    return methods.post(baseUrl, board)
  },
  deleteBoard(boardId) {
    return methods.delete(`${baseUrl}/${boardId}`)
  }
}

export default apiBoard
