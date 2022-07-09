<template>
  <div class="top-news">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 tn-left">
          <ImageContentPost :path="`read/${mainBanner.id}`" :image="mainBanner.image" styles-image="height: 505px; object-fit: cover" :title="mainBanner.title" :last-update="mainBanner.last_update" />
        </div>
        <div class="col-md-6 tn-right">
          <div class="row">
            <div class="col-md-6" v-for="(sub, iSub) in subTopNews" :key="iSub" >
              <ImageContentPost :path="`read/${sub.id}`" :image="sub.image" styles-image="height: 239px; object-fit: cover" :title="sub.title" :last-update="sub.last_update" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNews",
  data() {
    return {
      mainBanner: {
        id: 0,
        title: "Default Content Banner",
        image: "https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif",
        last_update: "2022-06-07 10:09:00"
      },
      subTopNews: [
        {
          id: 0,
          title: "Default Content Banner",
          image: "https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif",
          last_update: "2022-06-07 10:09:00"
        },
        {
          id: 0,
          title: "Default Content Banner",
          image: "https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif",
          last_update: "2022-06-07 10:09:00"
        },
        {
          id: 0,
          title: "Default Content Banner",
          image: "https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif",
          last_update: "2022-06-07 10:09:00"
        },
        {
          id: 0,
          title: "Default Content Banner",
          image: "https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif",
          last_update: "2022-06-07 10:09:00"
        }
      ],
    }
  },
  methods: {
    getTopNews: async function() {
      try {
        let req = await this.$api.get('news/content/top-news?limit=5')
        let article = req.data.data.articles
        if (article.length > 0) {
          this.mainBanner = article[0]
        }

        if (article.length > 1) {
          article.forEach((item, index) => {
            if (index !== 0) {
              this.subTopNews[index - 1] = item
            }
          })
        }
      } catch (e) {
        console.error(e)
      }
    }
  },
  async mounted() {
    await this.getTopNews()
  }
}
</script>

<style scoped>

</style>
