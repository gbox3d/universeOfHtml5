<template>
  <div v-html="titleMsg"></div>
  <img v-bind:src="placeimg" />
  <hr />
</template>

<script>
export default {
    data() {
        return {
            titleMsg : '<h2 class="red-font"> render html sample </h2>',
            placeimg : 'https://placeimg.com/100/100/tech',
        }
    }
};
</script>