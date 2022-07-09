<template>
  <div style="width: 15rem">
    <img :src="img" width="100%" />
    <p class="my-4">{{title}}</p>
    <div>
      <NuxtLink to="/payment"><button class="btn btn-primary w-100">Langganan</button></NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsCard",
  props: ["img", "title"],
};
</script>

<style scoped></style>
