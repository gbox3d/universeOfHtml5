<template>
  <div class="container" >
    <button @click="getTodoList_store">Get Todo</button>
    <ul>
      <li v-for="(item, index) in todoList" :key="index">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    // HelloWorld
  },
  computed: {
    todoList() {
      return this.$store.state.todolist;
    },
  },
  methods: {
    getTodoList_store() {
      this.$store.dispatch("updateTodos");
    },
    // test() {
    //   (async ()=> {
    //     let {status,data} = await this.axios.get('https://randomuser.me/api?results=5');
    //     console.log(status)
    //     console.log(data)
    //   })();
    // },
    // async test2() {
    //   let {status,data} = await this.axios.get('http://localhost:8080/api/v1/memo/find/skip/2/limit/5');
    //   console.log(status)
    //   console.log(data)
    // }
  },
};
</script>

<style scoped>

li {
  border-bottom: 1px solid black;
  margin-bottom: 8px;
  list-style: none;
}

</style>
