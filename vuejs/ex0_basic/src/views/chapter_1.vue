<template>
  <h2>hello {{ animal }}</h2>
  <h2 :class="animal">hello {{ animal }}</h2>
  <input type="text" v-model="animal" />
  
</template>


<script>
export default {
    data() {
        return {
            animal : 'monkey'
        }
    }
}
</script>
