<template>
  
  <h2 :class="{ red: age > 30, green: age < 30, blue: age == 30 }">
    ur age : {{ age }}
  </h2>
  <input v-model="age" /> <br />
  <p v-if="age > 20 && age < 30">young</p>
  <p v-else-if="age < 20">too young</p>
  <p v-else>old</p>
  <hr />

</template>

<script>
export default {
    data() {
        return {
            age : 20,
        }
    }
};
</script>