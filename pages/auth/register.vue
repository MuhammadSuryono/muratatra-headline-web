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
            <form>
              <div class="form-group">
                <label>Email</label>
                <input class="form-control" type="text" placeholder="Email">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input class="form-control" type="password" placeholder="Password">
              </div>
              <div class="form-group">
                <label>Password Konfirmasi</label>
                <input class="form-control" type="password" placeholder="Password Konfirmasi">
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
  name: "register",
  layout: "payment",
}
</script>

<style scoped>

</style>
