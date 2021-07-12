<template>
  <h2>{{ count }}</h2>
  <button @click="inc">inc</button>
  <button @click="dec">dec</button>
  <button @click="setValue(0)">reset</button>
</template>

<script>
export default {
  // data() {
  //     return {
  //         counter : 0
  //     }
  // },
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    inc() {
      // this.counter += 1
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    },
    dec() {
        this.$store.commit("decrement");

    },
    setValue(val) {
        this.$store.commit({
            type : "setvalue",
            value : val
        });

    }
  },
};
</script>