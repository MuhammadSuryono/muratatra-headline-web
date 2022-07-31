<template>
  <div>
    <div class="items-center bg-primary-web font-sans text-grey-60 rounded-lg text-left w-full">
      <div class="flex flex-col">
        <div class="flex flex-row items-center">
          <div class="p-4 text-center my-5 rounded-full flex items-center justify-center relative">
            <img :src="`https://ui-avatars.com/api/?name=Primeskills&background=FF4500&color=fff&rounded=true`" alt="profile" />
          </div>
          <div class="text-center">
            <h1 class="font-sans font-bold text-base text-customTextColor">Muhammad Suryono</h1>
            <p class="font-sans text-sm text-grey-50">Tidak Berlangganan</p>
            <b class="text-sm text-grey-50"></b>
          </div>
        </div>
        <div class="mx-3 mb-3">
          <NuxtLink to="#">
            <button class="btn-success btn mb-3" style="width: 100%">Perbarui Langganan</button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="border">
      <div class="list-group p-1">
        <NuxtLink to="/manage-account/me" class="list-group-item list-group-item-action">
          <i class="fa fa-user"/> Akun Saya </NuxtLink>
        <NuxtLink to="#" class="list-group-item list-group-item-action">
          <i class="fa fa-building"/> Transaksi </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarManageAccount"
}
</script>

<style scoped>

.bg-primary-web {
  background: rgba(228, 122, 46, .2);
}
</style>
