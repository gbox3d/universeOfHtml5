<template>
  <p>{{memoText}}</p>
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
    paramMsg : {
      type: String,
      // required: true,
      default : "hello"
    }
  },
  data() {
    return {
      memoText : ""
    }

  },
  emits: ["memo"],
  methods: {
    doOk() {
      //   console.log(this.memoText)
      this.$emit("memo", this.memoText,this.id);
    },
    clear() {
      console.log('clear')
      this.memoText = "";
    }
  },
  created() {
    this.memoText = this.paramMsg
  }
  
};
</script>