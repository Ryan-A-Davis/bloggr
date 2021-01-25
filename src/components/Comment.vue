<template>
  <div class="comment row">
    <div class="col-2" v-if="commentProp.creator">
      {{ commentProp.creator.name }}
    </div>
    <div class="col-6 offset-2">
      <i class="fa fa-pencil text-success" v-if="account.id == commentProp.creatorId" @click="state.editComment = !state.editComment" aria-hidden="true"></i>
      <p :contenteditable="state.editComment">
        {{ commentProp.body }}
      </p>
      <i class="fa fa-trash text-danger" v-if="account.id == commentProp.creatorId" @click="deleteComment" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
import { logger } from '../utils/Logger'
import { commentService } from '../services/CommentService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Comment',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editComment: false
    })

    return {
      state,
      editComment(e) {
        try {
          commentService.editComment(props.commentProp.id, e.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      },
      deleteComment() {
        try {
          commentService.deleteComment(props.commentProp.id)
        } catch (error) {

        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
