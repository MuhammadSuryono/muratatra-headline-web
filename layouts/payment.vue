<template>
  <div>
    <TopHeader />
    <Nuxt />
  </div>
</template>

<script>
import TopHeader from '../components/layouts/TopHeader.vue';
export default {
    name: "payment",
    components: { TopHeader }
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
