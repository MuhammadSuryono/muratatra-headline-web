<template>
  <div class="header">
    <div class="container">
      <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <a href="#" class="navbar-brand">MENU</a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
          <div class="navbar-nav m-auto">
            <NuxtLink to="/" class="nav-item nav-link active">Home</NuxtLink>
            <NuxtLink :to="{path: `/category/${category.slug}`, params: {slug: category.slug}}" class="nav-item nav-link" v-for="(category, iCategory) in categoryMenu" :key="iCategory">{{category.category_name}}</NuxtLink>
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Dropdown</a>
              <div class="dropdown-menu">
                <a href="#" class="dropdown-item">Sub Item 1</a>
                <a href="#" class="dropdown-item">Sub Item 2</a>
              </div>
            </div>
            <a href="single-page.html" class="nav-item nav-link">Single Page</a>
            <a href="contact.html" class="nav-item nav-link">Contact Us</a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",
  data() {
    return {
      categoryMenu: []
    }
  },
  methods: {
    getCategoryMenu: async function() {
      try {
        let req = await this.$api.get('category/menu?is_menu=true')
        this.categoryMenu = req.data.data
      } catch (e) {
        console.warn(e)
      }
    }
  },
  async mounted() {
    await this.getCategoryMenu()
  }
}
</script>

<style scoped>

</style>
