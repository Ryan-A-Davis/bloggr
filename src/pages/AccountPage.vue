<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4 text-center">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div class="col-6-offset-2 text-center">
        <p>THIS IS WHERE MY BLOGS GO</p>
        <button class="btn btn-success" @click="createBlog">
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
export default {
  name: 'Account',
  setup(prop) {
    // const state = reactive({
    //   account: computed(() => AppState.account),
    //   accountBlogs: computed(() => AppState.accountBlogs)
    // })
    // onMounted(async() => {
    //   try {
    //     await blogService.getuserBlogs()
    //   } catch (error) {
    //     logger.error(error)
    //   }
    // })
    return {
      account: computed(() => AppState.account),
      createBlog(data) {
        try {
          blogService.createBlog({ title: 'The Zesty Test', body: 'How many times do you find the word test in this data? Let me know in the comments below!' })
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
