<template>
  <div>
    <div class="sidebar">
      <div class="sidebar-widget">
        <h2><i class="fas fa-align-justify"></i>Berita Utama</h2>
        <div class="category">
          <ul class="fa-ul">
            <li v-for="(top, iTop) in topNews" :key="iTop">
              <span class="fa-li"><i class="far fa-arrow-alt-circle-right"></i></span>
              <NuxtLink :to="`/read/${top.id}`">{{top.title}}</NuxtLink><br/>
              <small class="text-muted">{{top.last_update}}</small>
            </li>
          </ul>
        </div>
      </div>

      <div class="sidebar-widget">
        <h2><i class="fas fa-align-justify"></i>Popular</h2>
        <div class="category">
          <ul class="fa-ul">
            <li v-for="(popular, iTop) in popularNews" :key="iTop">
              <span class="fa-li"><i class="far fa-arrow-alt-circle-right"></i></span>
              <NuxtLink :to="`/read/${popular.id}`">{{popular.title}}</NuxtLink><br/>
              <small class="text-muted">{{popular.last_update}}</small>
            </li>
          </ul>
        </div>
      </div>

      <SidebarAdvertisement />
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarRightCategory",
  data() {
    return {
      popularNews: [],
      topNews: []
    }
  },
  methods: {
    getTags: async function() {
      try {
        let req = await this.$api.get(`news/content/popular-news?limit=5&slug=${this.$route.params.slug}`)
        this.popularNews = req.data.data.articles
      } catch (e) {
        console.log(e)
      }
    },
    getTopNews: async function() {
      try {
        let req = await this.$api.get(`news/content/top-news?limit=5&slug=${this.$route.params.slug}`)
        this.topNews = req.data.data.articles
        console.log(this.topNews)
      } catch (e) {
        console.log(e)
      }
    },

  },
  async mounted() {
    await this.getTags()
    await this.getTopNews()
  }
}
</script>

<style scoped>

</style>
