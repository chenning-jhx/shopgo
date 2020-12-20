<template>
  <div class="comment-info">
    <div class="comment-title">
      <div>用户评价</div>
      <div>
        <span>更多</span>
        <i>></i>
      </div>
    </div>

    <div class="comment-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>

    <div class="comment-detail">
        <div class="comment.content">{{commentInfo.content}}</div>
        <div>
            <span>{{commentInfo.created}}</span>
            <span>{{commentInfo.style}}</span>
        </div>
        <div v-for="(item, index) in commentInfo.images" :key="index">
            <img :src="item" alt="">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
.comment-info {
  padding: 25px 10px 0 10px;
  border-top: 5px solid #e8e8e8;
}

.comment-title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e8e8e8;
}

.comment-title div:nth-child(1) {
  float: left;
  font-size: 20px;
  font-weight: 500px;
}

.comment-title div:nth-child(2) {
  float: right;
}

.comment-user {
  margin: 5px 10px;
}

.comment-user img {
  margin-right: 5px;
  width: 48px;
  height: 48px;
  vertical-align: middle;
}
</style>