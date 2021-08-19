<template>
  <div>
    <h2>hello {{ animal }}</h2>
    <input type="text" v-model="animal" />
  </div>

  <div>
    <h2>{{ animalTemp }}</h2>
    <input type="text" v-model="animalTemp" />
    <button @click="ok">ok</button>
  </div>

  <div>
    <h2>{{msg}}</h2>
    <input type="text" :value="msg" @change="change" @input="input" />
    
  </div>
</template>


<script>
export default {
  data() {
    return {
      animal: "monkey",
      msg : "당신만이"
    };
  },
  methods: {
    ok() {
      this.animal = this.animalTemp;
      this.animalTemp = "";
    },
    change(evt) {
        console.log(evt.target.value)
    },
    input(evt) {
        console.log(evt.target.value)
        this.msg = evt.target.value
    }
  },
  created() {
    this.animalTemp = "panda";
  },
};
</script>

<style scoped>
div {
    margin: 5px;
    padding: 2px;
  border: solid greenyellow 1px;
}
</style>
