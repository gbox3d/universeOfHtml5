<template>
    <h2>{{title}}</h2>
    <h2>{{param1}}</h2>
    <button @click="change" > change  </button>
</template>

<script>
export default {
    props: {
        param1: {
            type: String,
            default:"lego"
        }
    },
    data() {
        return {
            title : "Good day"
        }
    },
    methods : {
        change() {
            console.log(this.param1)
        }
        
        
    }
}
</script>