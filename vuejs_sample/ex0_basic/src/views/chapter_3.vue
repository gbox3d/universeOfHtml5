<template>
  <h1 :class="{red : activate}" >v-bind class</h1>
  <button @click="toggle">toggle</button>

  <h2 :class="{ red: age > 30, green: age < 30, blue: age == 30 }">
    ur age : {{ age }}
  </h2>

  <input v-model="age" /> <br />
  <p v-if="age > 20 && age < 30">young</p>
  <p v-else-if="age < 20">too young</p>
  <p v-else>old</p>
  <hr />
</template>

<script>
export default {
  data() {
    return {
      age: 20,
      activate : false
    };
  },
  methods: {
    toggle() {
      this.activate = !this.activate
      console.log(this.activate)
    }
  }
};
</script>

<style scoped>
.red {
  color: red;
}
.green {
  color: green;
}
.blue {
  color: blue;
}
</style>