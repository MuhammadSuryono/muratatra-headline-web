<template>
  <div class="col-md-12">
    <h2><i class="fas fa-align-justify"></i>Berita Terbaru</h2>
    <h3 class="text-center text-secondary" v-if="latestNews.length === 0"><i class="fas fa-inbox" /> Tidak Ada Berita Terbaru </h3>
    <div class="row" v-if="latestNews.length > 0">
      <div :class="{'col-lg-6': latestNews.length > 1, 'col-lg-12': latestNews.length === 1}" v-if="latestNews.length > 0">
        <div class="mn-img">
          <img :src="latestNews[0].image" />
        </div>
        <div class="mn-content">
          <NuxtLink :to="{path: `read/${latestNews[0].id}`, params: { id: latestNews[0].id }}" class="mn-title">{{latestNews[0].title}}</NuxtLink>
          <a class="mn-date" href=""><i class="far fa-clock"></i>{{latestNews[0].last_update}}</a>
          <p v-html="latestNews[0].content"></p>
        </div>
      </div>
      <div class="col-lg-6" v-if="latestNews.length > 1">
        <div class="mn-list" v-for="(news, iNews) in latestNews" :key="iNews" v-if="iNews > 0">
          <div class="mn-img">
            <img :src="news.image" />
          </div>
          <div class="mn-content">
            <NuxtLink :to="{path: `read/${news.id}`, params: { id: news.id }}" class="mn-title">{{news.title}}</NuxtLink>
            <a class="mn-date" href="#"><i class="far fa-clock"></i>{{news.last_update}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LatestNews",
  data() {
    return {
      latestNews: []
    }
  },
  methods: {
    getLatestNews: async function() {
      try {
        let req = await this.$api.get('news/content/latest-news?limit=6')
        this.latestNews = req.data.data.articles
      } catch (e) {
        console.error(e)
      }
    }
  },
  async mounted() {
    await this.getLatestNews()
  }
}
</script>

<style scoped>

</style>
