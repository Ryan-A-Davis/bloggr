import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { sandboxApi } from './AxiosService'

class BlogService {
  async getBlogs() {
    const res = await sandboxApi.get('api/blogs')
    logger.log(res.data)
    AppState.blogs = res.data
  }

  async getOne(id) {
    const res = await sandboxApi.get('api/blogs/' + id)
    logger.log(res.data)
    AppState.activeBlog = res.data
  }

  async getComments(id) {
    const res = await sandboxApi.get('api/blogs/' + id + '/comments')
    logger.log(res.data)
    AppState.activeComments = res.data
  }

  async createBlog(data) {
    const res = await sandboxApi.post('api/blogs', data)
    logger.log(res.data)
    this.getBlogs()
  }

  async deleteBlog(id) {
    await sandboxApi.delete('api/blogs/' + id)
    this.getBlogs()
  }
}

export const blogService = new BlogService()
