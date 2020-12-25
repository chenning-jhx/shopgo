<template>
  <div class="comment-info">
    <div class="comment-title">
      <div>用户评价</div>
      <div>
        <span>更多</span>
        <i>></i>
      </div>
    </div>

    <div class="comment-user" v-if="commentInfo.user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>

    <div class="comment-detail">
      <div class="comment-content">{{ commentInfo.content }}</div>
      <div class="comment-desc">
        <span>{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div v-for="(item, index) in commentInfo.images" :key="index" class="info-imgs">
        <img :src="item" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/common/utils";

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
  filters: {
      showDate(value) {
        let date = new Date(value * 1000);
        return formatDate(date, "yyyy-MM-dd hh:mm");
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

.comment-user span {
  font-size: 16px;
}

.comment-detail {
  margin: 10px 10px;
}

.comment-content {
  font-size: 16px;
}

.comment-desc {
  padding: 8px 0;
  font-size: 14px;
}

.comment-desc span:nth-child(1) {
  margin-right: 13px;
}

.info-imgs img {
  float: left;
  width: 70px;
  height: 70px;
  margin-right: 5px;

}
</style>