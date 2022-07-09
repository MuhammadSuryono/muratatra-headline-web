<template>
  <div>
    <div class="sidebar">
      <div class="sidebar-widget">
        <h2><i class="fas fa-align-justify"></i>Kategori</h2>
        <div class="category">
          <ul class="fa-ul">
            <li v-for="(category, iCategory) in categories" :key="iCategory"><span class="fa-li"><i class="far fa-arrow-alt-circle-right"></i></span><NuxtLink :to="`category/${category.slug}`">{{category.category_name}}</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="sidebar-widget">
        <h2><i class="fas fa-align-justify"></i>Tags</h2>
        <div class="tags">
          <NuxtLink class="mr-1" :to="`tags/${tag.id}`" v-for="(tag, iTag) in tags" :key="iTag">{{tag.name}}</NuxtLink>
        </div>
      </div>

      <div class="sidebar-widget">
        <h2><i class="fas fa-align-justify"></i>E-Paper</h2>
        <div class="image">
          <img width="40%" height="300px" style="box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px;" src="https://i.pinimg.com/736x/6a/a1/45/6aa145b656bd3efc77ac085ae8ee6fbf--journal-news-the-journal.jpg" />
          <NuxtLink to="#" class="btn btn-success btn-sm mt-2 w-50">Baca Edisi Hari Ini</NuxtLink>
          <NuxtLink to="/pdf/news" class="btn btn-outline-secondary btn-sm mt-2 w-50">Baca Edisi Lainnya</NuxtLink>
        </div>
      </div>

      <div class="sidebar-widget">
        <h2><i class="fas fa-align-justify"></i>Ads 1 column</h2>
        <div class="image">
          <a href=""><img src="https://www.beritabaku.com/wp-content/uploads/2021/08/Desain-tanpa-judul-1-1.jpg" alt="Image"></a>
        </div>
      </div>

      <div class="sidebar-widget">
        <h2><i class="fas fa-align-justify"></i>Ads 2 column</h2>
        <div class="image">
          <div class="row">
            <div class="col-sm-6">
              <a href=""><img src="https://binus.ac.id/malang/wp-content/uploads/2019/01/1.jpg" alt="Image"></a>
            </div>
            <div class="col-sm-6">
              <a href=""><img src="https://binus.ac.id/malang/wp-content/uploads/2019/01/1.jpg" alt="Image"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarRight",
  data() {
    return {
      categories: [],
      tags: [],
    }
  },
  methods: {
    getCategory: async function() {
      try {
        let req = await this.$api.get('category/menu?is_menu=false')
        this.categories = req.data.data
      } catch (e) {
        console.log(e)
      }
    },
    getTags: async function() {
      try {
        let req = await this.$api.get('tags?notPaginate')
        this.tags = req.data.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    await this.getCategory()
    await this.getTags()
  }
}
</script>

<style scoped>

</style>
