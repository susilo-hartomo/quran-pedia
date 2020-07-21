<template>
  <div style="height: 100vh; ">
    <nav class="navbar navbar-light fixed-top" style="background-color: blueviolet;">
      <div class="container">
        <a class="navbar-brand text-white">
          <img
            src="../../assets/img/img1.jpg"
            width="30"
            height="30"
            class="d-inline-block align-top mr-2"
            alt
          />
          My-Quran
        </a>
        <button class="btn btn-outline-light" v-on:click.prevent="$emit('loggedOut', true)">Logout</button>
      </div>
    </nav>
    <div class="container mt-5 fixed-top">
      <div class="mt-5 jarak"></div>

      <!-- List Surah -->
      <div v-if="listSurah == true">
        <div class="display-4 mb-4">List Surahs</div>
        <div class="card pr-4 pl-4 pt-2 list-surah mt-2" style="height: 450px">
          <surah
            v-for="(surah, index) in quran"
            :surah="surah"
            :key="index"
            @detailSurah="detailSurah"
            class="d-flex mt-1 surah"
          ></surah>
        </div>
      </div>

      <!-- Detail Surah -->
      <div v-else>
        <div class="display-4 mb-4 justify-content-center">{{titleDetailSurah}}</div>
        <div class="card pr-4 pl-4 pt-2 list-surah mt-2" style="min-height: 200px">
          <detailSurah v-for="(ayah, index) in detailContentSurah" :ayah="ayah" :key="index"></detailSurah>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import surah from "./surah";
import detailSurah from "./detailSurah";

export default {
  name: "isLogin",
  props: ["quran", "listSurah"],
  data() {
    return {
      listSurah: this.listSurah,
      detailContentSurah: [],
      titleDetailSurah: this.quran[0].ayahs[0].text
    };
  },
  components: {
    surah,
    detailSurah
  },
  methods: {
    detailSurah(ayahs) {
      this.detailContentSurah = ayahs;
      this.listSurah = false;
    }
  },
  created() {
    listSurah: true;
  }
};
</script>

<style>
.jarak {
  background-color: aqua;
}

.list-surah {
  overflow: scroll;
}

.surah:hover {
  box-shadow: 2px 8px 20px #69676757;
}
</style>