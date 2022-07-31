<template>
  <Home/>
</template>

<script>
import Home from "~/components/home/Home";
export default {
  name: 'IndexPage',
  layout: 'default',
  components: {
    Home
  },
  head() {
    return {
      title: this.$titleTab('Home')
    }
  }
}
</script>
