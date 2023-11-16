<template>
  <div class="root" :style="rootStyle">
    <THeader class="header"> </THeader>
    <div class="content animate__animated animate__bounceInUp">
      <!-- <transition-group name="item"> -->
      <TItem
        class="item"
        v-for="item in sources"
        :key="item.tId"
        :taskId="item.tId"
        :taskContent="item.taskContent"
        :taskComplete="item.isComplete"
        @change-status="changeStatus($event)"
        @delete-todo="deleteTodo($event)"
      ></TItem>
      <!-- </transition-group> -->
    </div>
    <transition name="complete">
      <div
        class="complete_content animate__animated animate__flip"
        v-if="showComplete"
      >
        <div class="complete_title">已完成</div>
        <!-- <transition-group name="item"> -->
        <TItem
          class="item"
          v-for="item in completeItems"
          :key="item.tId"
          :taskId="item.tId"
          :taskContent="item.taskContent"
          :taskComplete="item.isComplete"
          @change-status="changeStatus($event)"
          @delete-todo="deleteTodo($event)"
        ></TItem>
        <!-- </transition-group> -->
      </div>
    </transition>
    <TFooter :new_id="length" @add_todo="addTodo($event)"></TFooter>
  </div>
</template>

<script>
import THeader from "./components/THeader.vue";
import TFooter from "./components/TFooter.vue";
import TItem from "./components/TItem.vue";
import catBg from "./assets/bg-cat.jpg";
import busBg from "./assets/bg-bus.jpg";
import homeBg from "./assets/bg-home.jpg";

export default {
  name: "App",
  components: {
    THeader,
    TFooter,
    TItem,
  },
  data() {
    return {
      todoItems: [
        { tId: 1, isComplete: false, taskContent: "JavaScript ASI机制" },
        { tId: 2, isComplete: false, taskContent: "复杂度的计算" },
        { tId: 3, isComplete: false, taskContent: "教父剧情简书" },
        { tId: 4, isComplete: true, taskContent: "跑步" },
        { tId: 5, isComplete: false, taskContent: "vuepress" },
        { tId: 6, isComplete: false, taskContent: "卡特兰数" },
        { tId: 7, isComplete: false, taskContent: "收集材料" },
      ],
      showComplete: false, //控制已完成列表的隐藏和显示
      type: 0, //业务类型 -1表示未完成的数据  0表示全部的数据  1表示已完成的数据
      rootStyle: {}, //用来控制主题背景的
    };
  },
  methods: {
    addTodo(newTodo) {
      // console.log(newTodo);
      this.todoItems.push(newTodo);
      console.log(this.todoItems);
    },
    changeStatus(obj) {
      // 根据id修改待办项的状态
      this.todoItems.forEach((item) => {
        if (item.tId === obj.id) {
          item.isComplete = obj.status;
        }
      });
    },
    deleteTodo(id) {
      // 到列表中去找到相同id的数据的索引
      const index = this.todoItems.findIndex((item) => item.tId === id);
      //根据索引删除数据
      this.todoItems.splice(index, 1);
    },
  },
  computed: {
    //记录数组长度用来计算新增item的id
    length() {
      return this.todoItems.length;
    },
    //获取已完成的数据
    completeItems() {
      return this.todoItems.filter((item) => item.isComplete);
    },
    //获取未完成的数据
    unCompleteItems() {
      return this.todoItems.filter((item) => !item.isComplete);
    },
    //数据来源
    sources() {
      switch (this.type) {
        case -1: //返回未完成的数据
          return this.unCompleteItems;
        case 0: //返回所有的数据
          return this.todoItems;
        case 1: //返回已完成的数据
          return this.completeItems;
        default:
          return this.todoItems;
      }
    },
  },
  mounted() {
    // bus事件总总线，监听----显示全部事件
    this.$bus.$on("showAllItems", () => {
      this.type = 0;
      this.showComplete = false;
    });
    // bus事件总总线，监听----显示已完成事件
    this.$bus.$on("showCompleteItems", () => {
      this.type = 0;
      this.showComplete = true;
    });
    this.$bus.$on("hideCompleteItems", () => {
      this.type = 0;
      this.showComplete = false;
    });
    this.$bus.$on("changeBg", () => {
      const imgs = [catBg, busBg, homeBg];
      const index = Math.floor(Math.random() * imgs.length);
      this.rootStyle = {
        backgroundImage: `url("${imgs[index]}")`,
      };
    });
  },
};
</script>

<style lang="scss">
$color: #ffffff;
$bgName: "bus.jpg";
$bgImg: url("./assets/bg-#{$bgName}");

#app {
  .root {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $color;
    margin: 60px auto;
    padding-bottom: 20px;
    background: {
      image: $bgImg;
      repeat: no-repeat;
      size: 100% 100%;
    }
    width: 450px;
    min-height: 850px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px gray;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .content,
    complete_content {
      display: flex;
      flex-direction: column;
      justify-content: start;
      margin-bottom: 40px;
      flex-grow: 1;
      .item {
        margin-bottom: 1px;
      }
    }
    .complete_content {
      flex-grow: 10;
      .complete_title {
        background: rgba(0, 0, 0, 0.6);
        width: 50px;
        border-radius: 3px;
        padding: 3px 10px;
        text-align: center;
        margin: {
          left: 30px;
          bottom: 10px;
        }
      }
    }
  }
}
.item-enter-from,
.item-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.item-enter-active,
.item-leave-active {
  transition: all 0.4s ease;
}

.complete-enter-from,
.complete-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
.complete-enter-active,
.complete-leave-active {
  transition: all 0.6s ease;
}
</style>
