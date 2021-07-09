<template>
  <p>{{ count }}</p>
  <p>{{ mouseInfo }}</p>
  <div class="box" @mousemove="onMouseMove($event, 1)"></div>
  <div class="blue-box" @mousemove="onMouseMove($event, -1)"></div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      mouseInfo: "0,0",
    };
  },
  methods: {
    onMouseMove(evt, inc) {
      this.mouseInfo = `${evt.pageX} , ${evt.pageY}`;
      this.count += inc;
    },
  },
};
</script>