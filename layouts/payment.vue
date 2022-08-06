<template>
  <div>
    <TopHeader :company="companyData" />
    <hr/>
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TopHeader from '../components/layouts/TopHeader.vue';
export default {
  name: "payment",
  components: { TopHeader },
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
};
</script>

<style>
.bg-info-100 {
  background-color: #17a3b870 !important;;
}
.bg-info-200 {
  background-color: #17a3b8a1 !important;;
}
.bg-info-200 * {
  color: #fff !important;;
}
</style>
