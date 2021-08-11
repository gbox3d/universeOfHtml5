<template>
  <h2>hello {{ animal }}</h2>
  <input type="text" v-model="animal" />
  <hr>
  <h2>{{animalTemp}}</h2>
  <input type="text" v-model="animalTemp" />
  <button @click="ok" >ok</button>
  
</template>


<script>
export default {
    data() {
        return {
            animal : 'monkey'
        }
    },
    methods : {
        ok() {
            this.animal = this.animalTemp
            this.animalTemp = ""
        }
    },
    created() {
        this.animalTemp = "panda"
    }

}
</script>
