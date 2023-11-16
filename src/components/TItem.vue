<template>
  <div class="container">
    <div class="box">
      <input
        type="checkbox"
        id="item"
        v-model="isComplete"
        @change="statusChange"
      />
      <label class="item-title" :style="labelStyle">{{ taskContent }}</label>
      <span class="delete" @click="$emit('delete-todo', taskId)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TItem",
  props: {
    taskId: Number,
    taskContent: String,
    taskComplete: Boolean,
  },
  data() {
    return {
      isComplete: this.taskComplete,
    };
  },
  methods: {
    statusChange() {
      console.log(this.isComplete);
      const para = {
        id: this.taskId,
        status: this.isComplete,
      };
      this.$emit("change-status", para);
    },
  },
  computed: {
    // 文本绑定的样式对象：用控制删除线
    labelStyle() {
      const lineThrough = this.isComplete ? "line-through" : "none";
      return {
        "text-decoration": lineThrough,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .box {
    background: #ffffff;
    color: rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 5px 20px;
    width: 86%;
    height: 55px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    #item {
      margin-right: 20px;
    }
    .item-title {
      text-align: left;
      margin-right: 20px;
      width: 100%;
    }
    .delete {
      background-image: url("../assets/delete.png");
      background-size: 100% 100%;
      width: 20px;
      height: 20px;
      &:hover {
        cursor: pointer;
        background-image: url("../assets/delete-highlight.png");
      }
    }
  }
}
</style>
