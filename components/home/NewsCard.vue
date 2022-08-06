<template>
  <div style="width: 15rem; margin-right: auto; margin-left: auto; display: block; border: #3a3a3a solid" class="text-center">
    <img :src="img" width="100%" class="border" />
    <p class="my-4">{{title}}</p>
    <div>
      <NuxtLink :to="`/payment/${edition}`"><button class="btn btn-primary w-100">Langganan</button></NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsCard",
  props: ["img", "title", "edition"],
};
</script>

<style scoped></style>
