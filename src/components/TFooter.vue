<template>
  <div class="container">
    <div class="box">
      <label id="add-icon" for="task">+</label>
      <input
        type="text"
        id="task"
        v-model="task_content"
        placeholder="添加待办"
        @keyup.enter="addTodo"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TFooter",
  props: {
    new_id: Number,
  },
  data() {
    return {
      task_content: "",
    };
  },
  methods: {
    addTodo() {
      // console.log("输入完毕");
      if (!this.task_content) {
        // 如果输入框为空
        alert("任务内容不能为空！");
        return;
      }
      // 将新的待办事项添加到里列表中
      const newTodo = {
        tId: this.new_id + 1,
        isComplete: false,
        taskContent: this.task_content,
      };
      this.$emit("add_todo", newTodo);
      this.task_content = "";
    },
  },
};
</script>

<style lang="scss" scoped>
$bgColor: rgba(0, 0, 0, 0.589);
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .box {
    background-color: $bgColor;
    box-sizing: border-box;
    padding: 5px 20px;
    border-radius: 5px;
    width: 86%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    #add-icon {
      font-size: 32px;
      font-weight: 500;
      margin-right: 12px;
    }
    #task {
      width: 100%;
      font-size: 18px;
      font-weight: 500;
      border: 0px;
      background: transparent;
      color: white;
      &::placeholder {
        color: white;
      }
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
