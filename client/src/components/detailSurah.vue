<template>
  <div class="d-inline align-middle card m-2">
    <!-- <button class="btn btn-primary rounded-circle">{{ayah.audio}}<span class="mdc-fab__icon material-icons">favorite</span></button> -->
    <button class="mdc-fab" aria-label="Favorite" v-on:click.prevent="playSurah">
      <i class="material-icons">play_circle_outline</i>
      <audio href={{}}></audio>
    </button>
    <p class="float-right">{{ayah.text}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "detailSurah",
  props: ["ayah"],
  data() {
    return {
      audio: ''
    }
  },
  methods: {
    playSurah() {
        axios({
            method: 'GET',
            url: `${this.ayah.audio}`
        })
        .then((result) => {
            this.audio = result.data
            this.audio.play()
        }).catch((err) => {
            console.log(err);
        });
    }
  }
};
</script>

<style>
.mdc-fab {
  width: 40px;
  height: 40px;
  padding: 2px;
  margin: 4px;
}
</style>