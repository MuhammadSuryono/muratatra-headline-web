<template>
  <div>
    <TopHeader :company="companyData" />
    <HeaderMenu />
    <Nuxt />
    <Footer :company="companyData" />
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
  },
  data() {
    return {
      companyData: {}
    }
  },
  methods: {
    company : async function() {
      try {
        let resp = await this.$api.get('company')
        this.companyData = resp.data.data
      }catch (e) {

      }
    }
  },
  updated() {
    console.log("Update")
  },
  async mounted() {
    await this.company()
  }
}
</script>

<style scoped>

</style>
