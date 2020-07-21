<template>
  <div>
    <isLogout v-if="logout" style="height:100vh" @Login='changeLogin'></isLogout>
    <isLogin v-else :quran="quran" :listSurah="listSurah" @loggedOut="changeLogout"></isLogin>
  </div>
</template>

<script>
import axios from 'axios';
import isLogin from "./components/isLogin";
import isLogout from "./components/isLogout";

export default {
  data() {
    return {
      logout: true,
      listSurah : true,
      quran : []
    };
  },
  components: {
    isLogin,
    isLogout
  },
  created() {
    if (!localStorage.access_token) {
      this.logout = true;
    } else {
      this.logout = false;
      this.getQuran()
    }
  },
  methods: {
      getQuran() {
          axios({
              method: 'GET',
              url: 'http://localhost:3000/quran'
          })
          .then((data) => {
              this.quran = data.data.data.surahs
          }).catch((err) => {
              console.log(err);
          });
      },
      changeLogin() {
          this.logout = false
          this.getQuran()
      },
      changeLogout(data) {
        console.log(data);
          this.logout = true
          localStorage.clear()
      },
  },
};
</script>

<style scoped>

</style>