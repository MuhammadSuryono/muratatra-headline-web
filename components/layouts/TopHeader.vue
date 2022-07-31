<template>
  <div class="top-header">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-3 col-md-4">
          <div class="logo">
            <a href="/">
              <img :src="company.logo" alt="Logo">
            </a>
          </div>
        </div>
        <div class="col-lg-6 col-md-4">
          <div class="search">
            <input type="text" placeholder="Search">
            <button><i class="fa fa-search"></i></button>
          </div>
        </div>
        <div class="col-lg-3 col-md-4">
          <div class="social">
            <a target="_blank" :href="social.url_social_media" class="mr-1" v-for="(social, iSocial) in company.social_medias" :key="iSocial"><i :class="social.icon"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  props: {
    company: {
      default: {}
    }
  },
  mounted() {
    console.log(this.company)
  },
  updated() {
    console.log(this.company)
  }
}
</script>

<style scoped>

</style>
