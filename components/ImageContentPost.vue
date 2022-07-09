<template>
  <div class="tn-img">
    <img :src="image" :style="stylesImage"/>
    <div class="tn-content">
      <div class="tn-content-inner">
        <a class="tn-date" href="#"><i class="far fa-clock"></i>{{lastUpdate}}</a>
        <NuxtLink class="tn-title" :to="path">{{title}}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageContentPost",
  props: {
    path: {
      default: '/'
    },
    image: {
      default: 'https://editorial.uefa.com/resources/0275-15125e21563a-24bf3cb9bd9d-1000/format/square1/16x9_uclf_poster_3.jpeg'
    },
    lastUpdate: {
      default: '05-Feb-2020'
    },
    title: {
      default: 'Lorem ipsum dolor sit amet adipiscing elit'
    },
    stylesImage: {
      default: ""
    }
  }
}
</script>

<style scoped>

</style>
