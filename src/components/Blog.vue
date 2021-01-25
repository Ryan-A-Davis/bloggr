<template>
  <div class="blog col-4 my-5" v-if="blogProp.creator">
    <div class="card shadow">
      <router-link :to="{name: 'Blog', params: { id: blogProp.id}}">
        <h4 class="card-title">
          <span>
            <img src="https://placehold.it/30x30" class="profile-img" alt="">
            <p class="text-break">{{ blogProp.title }}</p>
          </span>
        </h4>
      </router-link>
      <div class="card-body">
      </div>
    </div>
    <button class="btn btn-danger" v-if="state.account.id == blogProp.creatorId" @click="deleteBlog">
      X
    </button>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
export default {
  name: 'Blog',
  props: {
    blogProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editBlog: false
    })
    return {
      state,
      deleteBlog() {
        try {
          blogService.deleteBlog(props.blogProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      editBlog() {
        logger.log('editing blog')
        try {
          blogService.editBlog(props.blogProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      getComments() {
        try {
          blogService.getComments(props.blogProp.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.card{
  min-height: 7em;
  border-radius: 15%;
}

.blog{
  cursor: pointer;
}

.profile-img{
  border-radius: 50%;

}
</style>
