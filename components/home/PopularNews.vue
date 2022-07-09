<template>
  <div class="col-md-12">
    <h2><i class="fas fa-align-justify"></i>Berita Populer</h2>
    <h3 class="text-center text-secondary" v-if="popularNews.length === 0"><i class="fas fa-inbox" /> Tidak Ada Berita Populer </h3>
    <div class="row" v-if="popularNews.length > 0">
      <div :class="{'col-lg-6': popularNews.length > 1, 'col-lg-12': popularNews.length === 1}" v-if="popularNews.length > 0">
        <div class="mn-img">
          <img :src="popularNews[0].image" />
        </div>
        <div class="mn-content">
          <NuxtLink :to="{path: `/read/${popularNews[0].id}`, params: { id: popularNews[0].id }}" class="mn-title" href="">{{popularNews[0].title}}</NuxtLink>
          <a class="mn-date" href=""><i class="far fa-clock"></i>{{popularNews[0].last_update}}</a>
          <p v-html="popularNews[0].content"></p>
        </div>
      </div>
      <div class="col-lg-6" v-if="popularNews.length > 1">
        <div class="mn-list" v-for="(news, iNews) in popularNews" :key="iNews" v-if="iNews > 0">
          <div class="mn-img">
            <img :src="news.image" />
          </div>
          <div class="mn-content">
            <NuxtLink :to="{path: `/read/${news.id}`, params: { id: news.id }}" class="mn-title" href="">{{news.title}}</NuxtLink>
            <a class="mn-date" href="#"><i class="far fa-clock"></i>{{news.last_update}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopularNews",
  data() {
    return {
      popularNews: []
    }
  },
  methods: {
    getPopularNews: async function() {
      try {
        let req = await this.$api.get('news/content/popular-news?limit=6')
        this.popularNews = req.data.data.articles
      } catch (e) {
        console.warn(e)
      }
    }
  },
  async mounted() {
    await this.getPopularNews()
  }
}
</script>

<style scoped>

</style>
