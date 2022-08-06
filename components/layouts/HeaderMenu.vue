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
            <NuxtLink to="/" class="nav-item nav-link">Home</NuxtLink>
            <div v-for="(category, iCategory) in categoryMenu" :key="iCategory">
              <NuxtLink v-if="category.sub_category.length === 0" :to="{path: `/category/${category.slug}`, params: {slug: category.slug}}" class="nav-item nav-link" >{{category.category_name}}</NuxtLink>
              <div class="nav-item dropdown" v-if="category.sub_category.length > 0">
                <NuxtLink :to="{path: `/category/${category.slug}`}" class="nav-link dropdown-toggle" data-toggle="dropdown">{{category.category_name}}</NuxtLink>
                <div class="dropdown-menu" v-for="(sub, iSub) in category.sub_category" :key="iSub">
                  <NuxtLink v-for="(sub, iSub) in category.sub_category" :key="iSub" :to="{path: `/category/${sub.slug}`}" class="dropdown-item">{{sub.category_name}}</NuxtLink>
                </div>
              </div>
            </div>
            <NuxtLink to="/iklan" class="nav-item nav-link">Iklan</NuxtLink>
            <NuxtLink :to="$auth.loggedIn ? '/manage-account': '/auth/login'" class="nav-item nav-link"><i class="fa fa-user"/></NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import  { mapGetters } from 'vuex';
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
  },

  computed: {
    ...mapGetters(['isAuthenticated','loggedInUser'])
  },
}
</script>

<style scoped>
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
  background: rgba(228, 122, 46, .2);
  border-bottom: 2px solid #E47A2E;
  transition: none
}
</style>
