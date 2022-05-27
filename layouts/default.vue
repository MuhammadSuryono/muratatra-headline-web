<template>
  <div>
    <TopHeader />
    <HeaderMenu />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import TopHeader from "~/components/layouts/TopHeader";
import HeaderMenu from "~/components/layouts/HeaderMenu";
import Footer from "~/components/layouts/Footer";
export default {
  name: "default",
  components: {
    Footer,
    HeaderMenu,
    TopHeader
  }
}
</script>

<style scoped>

</style>
