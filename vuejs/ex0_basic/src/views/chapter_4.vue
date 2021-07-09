<template>
  <hr />
  <button @click="toggleHide">toggle</button><br />
  <h2 v-if="display">v-if Look !</h2>
  <h2 v-show="display">v-show Look !</h2>
  <hr />
</template>

<script>
export default {
  data() {
    return {
      display: true,
    };
  },
  methods: {
    toggleHide() {
      this.display = !this.display;
    },
  },
};
</script>