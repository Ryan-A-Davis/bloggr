import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { sandboxApi } from './AxiosService'

class CommentService {
  async editComment(id, update) {
    const res = await sandboxApi.put('api/comments' + id, update)
    logger.log(res.data)
    AppState.activeComments = res.data
  }

  async createComment(data) {
    const res = await sandboxApi.post('api/comments', data)
    logger.log(res.data)
    AppState.activeComments.push(res.data)
  }

  async deleteComment(id) {
    await sandboxApi.delete('api/comments/' + id)
    const commentInd = AppState.activeComments.findIndex(c => c.id === id)
    AppState.activeComments.splice(commentInd, 1)
  }
}

export const commentService = new CommentService()
