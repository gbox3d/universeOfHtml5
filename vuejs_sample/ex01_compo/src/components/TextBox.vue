<template>
  <p>{{ textContent }}</p>
  <input type="text" v-model="textContent" />
</template>

<script>
export default {
  props: ["propTextContent"],
  data() {
    return {
      textContent: "",
    };
  },
  created() {
    this.textContent = this.propTextContent;
  },
  methods : {
      setText(val) {
          this.textContent = val
      }
  }
};
</script>