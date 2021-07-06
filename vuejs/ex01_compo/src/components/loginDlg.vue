<template>
  <h1>Login Dlg</h1>
  <!-- <h2>{{param1}}</h2> -->
  <input type="text" v-model="user.id" />
  <input type="text" v-model="user.passwd" />

  <!-- <input type="text" v-model="passwd"> -->
  <p>{{ user.id }}, {{ user.passwd }}</p>
  <button>login</button>
</template>

<script>
export default {
  props: ["id", "passwd"],
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.user.id = this.id;
    this.user.passwd = this.passwd;
  },
  methods: {
    clearId() {
        this.user.id = ''
    //   console.log(this);
    },
  },
};
</script>