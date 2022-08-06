<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="text-center">
          <h4 class="font-weight-bold">Masuk Akun</h4>
          Belum Punya Akun ? <NuxtLink to="/auth/register">Daftar Sekarang</NuxtLink>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 mt-4"  style="margin-left: auto; margin-right: auto; display: block;">
        <div class="card">
          <div class="card-body">
            <form @submit.pr.prevent="submitLogin">
              <div class="form-group">
                <label>Email</label>
                <input class="form-control" type="email" placeholder="Email" v-model="username">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input class="form-control" type="password" placeholder="Password" v-model="password">
              </div>
              <button class="btn btn-success" style="width: 100%">Masuk</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  layout: "payment",
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    submitLogin() {
      try {
        this.$auth.loginWith('local', {data: {username: this.username, password: this.password}});
      } catch (e) {
        this.isError = true
        this.password = ""
      }
    }
  }
}
</script>

<style scoped>

</style>
