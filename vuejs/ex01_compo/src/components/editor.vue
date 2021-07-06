<template>
  <!-- <h1>{{memoText}}</h1> -->
  <!-- <h1>{{ workMemoText }}</h1> -->
  <input type="text" v-model="memoText" />

  <button @click="doOk">ok</button>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  emits: ["memo"],
  methods: {
    doOk() {
      //   console.log(this.memoText)
      this.$emit("memo", this.memoText,this.id);
    },
  },
  created() {
    this.memoText = "";
  },
  // data() {
  //     return {

  //     }
  // }
};
</script>