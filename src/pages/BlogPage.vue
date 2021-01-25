<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6 text-center" v-if="state.loaded">
        <h2>{{ blog.title }}</h2>
        <div class="text-left card shadow">
          <p>
            {{ blog.body }}
          </p>
        </div>
      </div>
      <div class="col-6 card">
        <Comment v-for="comment in comments" :key="comment.id" :comment-prop="comment" />
        <div class="form-group py-5" @submit.prevent="createComment">
          <label for=""></label>
          <textarea class="form-control"
                    name="newComment"
                    id="newComment"
                    rows="3"
                    v-model="state.newComment.body"
          ></textarea>
          <button class="btn btn-success" type="submit">
            Comment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import Comment from '../components/Comment.vue'
import { commentService } from '../services/CommentService'
export default {
  name: 'Blogpage',
  setup() {
    const route = useRoute()
    const state = reactive({
      loaded: false,
      newComment: {},
      user: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await blogService.getOne(route.params.id)
      } catch (error) {
        logger.error(error)
      } finally {
        state.loaded = true
      }
      try {
        await blogService.getComments(route.params.id)
      } catch (error) {
        logger(error)
      }
    })
    return {
      state,
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.activeComments),
      async createComment() {
        try {
          await commentService.createComment(state.newComment)
        } catch (error) {
          logger.error(error)
        }
      }

    }
  },
  components: { Comment }
}
</script>

<style lang="scss" scoped>
.p{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

</style>
