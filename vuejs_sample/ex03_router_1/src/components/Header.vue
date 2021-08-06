<template>

  <div id="nav" class="red" >
    <router-link to="/">Home</router-link> |
    <router-link to="/moon">Moon</router-link> |
    <router-link to="/counter"> Counter </router-link> |
    <router-link to="/about">About</router-link>
    <div>
        <button @click="goHome">Home</button>
        <button @click="goAbout">About</button>
        <button @click="goBack">pop</button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goHome() {
        //참고자료
        //https://router.vuejs.org/kr/guide/essentials/navigation.html
        //라우터 전환
    //   this.$router.push({ path: "/" }); 패스명으로 할때
      this.$router.push({ name: "Home" }); //이름으로 할때 
    },
    goAbout() {
      this.$router.push({ path: "/about" });
    },
    goBack() {
        //한단계 뒤로가기 
        this.$router.go(-1)

    }
  },
};
</script>