<template>

  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="text-center">
          <h4 class="font-weight-bold">Masuk Akun</h4>
          Sudah Punya Akun ? <NuxtLink to="/auth/login">Masuk Sekarang</NuxtLink>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 mt-4"  style="margin-left: auto; margin-right: auto; display: block;">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="submitRegister">
              <div class="form-group">
                <label>Nama Lengkap</label>
                <input class="form-control" type="text" v-model="form.full_name" placeholder="Nama Lengkap" required>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input class="form-control" type="email" v-model="form.email"  placeholder="Email" required>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input class="form-control" type="password" v-model="form.password"  placeholder="Password" required>
              </div>
              <div class="form-group">
                <label>Password Konfirmasi</label>
                <input class="form-control" type="password" v-model="form.password_confirmation"  placeholder="Password Konfirmasi" required>
              </div>
              <button class="btn btn-success" style="width: 100%">Daftar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  layout: "payment",
  data() {
    return {
      form: {
        full_name: null,
        email: null,
        password: null,
        password_confirmation: null,
      }
    }
  },
  methods: {
    submitRegister: async function() {
      if (this.form.password !== this.form.password_confirmation) alert("Password tidak sama")
      else {
        try {
          let req = await this.$api.post(`customer/register`, this.form)
          if (req.data.message !== "success") alert(req.data.message)
          else {
            alert("Success register")
            await this.$router.push("/auth/login")
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
