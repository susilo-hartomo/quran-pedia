<template>
  <div class="card p-3 mb-2">
    <div class="d-inline-flex">
      <h2 class="mr-4">{{surah.number}}</h2>
      <div class="float-left">
        <h4>{{surah.name}}</h4>
        <small>Surah Name: {{surah.englishName}}</small>
      </div>
      <div class="ml-auto float-right">
        <h4>{{surah.englishNameTranslation}}</h4>
        <small>Type surah : {{ surah.revelationType}} / {{surah.ayahs.length}} ayah</small>
      </div>
      <div>
        <button class="btn btn-outline-info" v-on:click.prevent="$emit('detailSurah', ayahs)">
            detail
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "surah",
  props: ["surah"],
  data() {
    return {
      ayahs : this.surah.ayahs
    };
  }
};
</script>

<style>
</style>