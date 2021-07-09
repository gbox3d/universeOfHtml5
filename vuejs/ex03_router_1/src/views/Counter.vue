<template>
    <h2> {{counter}}</h2>
    <button @click="inc"> inc </button>
</template>

<script>
export default {
    data() {
        return {
            counter : 0
        }
    },
    methods : {
        inc() {
            this.counter += 1
            // this.$store.commit('increment')
            // console.log(this.$store.state.count)
        }
    }
}
</script>