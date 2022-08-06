<template>
  <div class="container">
    <div class="col-lg-8 col-md-8 col-sm-12" style="margin-left: auto; margin-right: auto; display: block">
      <h5 class="font-weight-bold">#{{orderNumber}}</h5>
      <div class="card w-100 mt-3">
        <div class="card-header py-5 bg-info-200">
          <div class="container d-flex justify-content-between align-items-center">
            <h5>Judul</h5>
            <div>
              <div class="d-flex">
                <h5></h5>
                <span class="text-muted">/ </span>
              </div>
              <div>
                <span class="badge badge-danger-custom"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">Periode pembayaran</h5>
          <div class="d-flex justify-content-between font-weight-bold">
            <span class="text-muted">Tanggal Aktif</span>
            <span class="text-muted"></span>
          </div>
          <div class="d-flex justify-content-between">
            <span class="text-muted">Tanggal Berakhir</span>
            <span class="text-muted"></span>
          </div>
        </div>
      </div>

      <div class="my-5 d-block text-center">
        <small>No rek Mandiri:</small>
        <h4 class="text-info">
          {{noRek}}
          <button
            type="button"
            class="btn btn-secondary btn-sm border-0"
            data-container="body"
            data-toggle="popover"
            data-placement="top"
            @click="copyText"
            data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
          >
            <i class="fas fa-copy"></i>
          </button>
        </h4>
      </div>

      <div class="mt-5">
        <h5>Detail Pembayaran</h5>
        <p class="text-muted">
          Silahkan melakukan pembayaran senilai total pesanan dengan nomor
          rekening yang diatas
        </p>
        <div class="text-muted d-flex justify-content-between">
          <h5>Total Pembayaran</h5>
          <h5 class="text-info text-center font-weight-bold">
              Rp. 50.000
          </h5>
        </div>
      </div>

      <div class="mt-5">
        <button
          type="button"
          class="btn w-100"
          data-toggle="modal"
          data-target="#paymentModal"
        >
          Upload Bukti Pembayaran
        </button>
      </div>
    </div>

    <div
      class="modal fade"
      id="paymentModal"
      tabindex="-1"
      data-backdrop="static"
      aria-labelledby="paymentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="paymentModalLabel">
              Konfirmasi Pembayaran
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form v-on:submit.prevent="submitConfirmPayment">
            <div class="modal-body">
              <div class="form-group">
                <label for="name">Nama Pengirim</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="name"
                  placeholder="Ex. John Doe"
                  required
                />
              </div>
              <div class="form-group">
                <label for="rekeningSender">Nomor Rekening Pengirim</label>
                <input
                  type="number"
                  class="form-control"
                  id="rekeningSender"
                  v-model="senderRekening"
                  placeholder="623884xxxx"
                  required
                />
              </div>
              <div class="form-group">
                <label for="price">Jumlah Yang Dibayar</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Rp</span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="50.000"
                    aria-label="Price"
                    v-model="price"
                    name="price"
                    aria-describedby="basic-addon1"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="rekeningDest">Nomor Rekening Tujuan</label>
                <input
                  type="number"
                  class="form-control"
                  id="rekeningDest"
                  v-model="destRekening"
                  placeholder="623884xxxx"
                  required
                />
              </div>
              <div class="form-group">
                <label for="image">Bukti Pembayaran</label>
                <div class="custom-file mb-3">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="validatedCustomFile"
                    @change="selectFile"
                    required
                  />
                  <label class="custom-file-label" for="validatedCustomFile">{{
                      defaultImageLabel
                    }}</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Kirim</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  middleware: 'auth',
  layout: "payment",
  data() {
    return {
      name: "wew",
      senderRekening: "",
      price: "",
      destRekening: "",
      evidence: "",
      subscription: {},
      defaultImageLabel: "Choose file...",
      noRek: 5833736282927622,
    }
  },
  mounted() {
    console.log(this.orderNumber)
  },
  methods: {
    async copyText() {
      try {
        await navigator.clipboard.writeText(this.noRek);
        alert("Copied");
      } catch ($e) {
        alert("Cannot copy");
      }
    },
    async submitConfirmPayment() {
      try {
        const { name, senderRekening, price, destRekening, evidence } = this;

        const form = new FormData();
        form.append("name", name);
        form.append("sender_rekening", senderRekening);
        form.append("price", price);
        form.append("dest_rekening", destRekening);
        form.append("evidence", evidence);

        const response = await this.$api.post(
          `/api/v1/subscriptions/${this.subscription.id}/confirm`,
          form
        );

        this.hideModal();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    orderNumber() {
      return this.$store.getters["order/getOrderNumber"]
    },
  },
}
</script>

<style scoped>

</style>
