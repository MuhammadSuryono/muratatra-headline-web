<template>
  <div class="container">
    <div class="col-lg-8 col-md-8 col-sm-12" style="margin-left: auto; margin-right: auto; display: block">
      <div class="card w-100 mt-3">
        <div class="card-header py-5 bg-info-200">
          <div class="container d-flex justify-content-between align-items-center">
            <h5>Paket {{dataOrder.packet_name}}</h5>
            <div>
              <div class="d-flex">
                <h5>Rp. {{$numberFormat(dataOrder.disc !== '0' ? (dataOrder.total * dataOrder.disc) / 100 : dataOrder.total)}}</h5>
                <span class="text-muted">/ {{dataOrder.duration}} {{dataOrder.unit}}</span>
              </div>
              <div class="float-right">
                <span class="badge badge-danger" v-if="dataOrder.disc !== 0">
                  <s>Rp. {{$numberFormat(dataOrder.total)}}</s>
                </span>
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
              Rp. {{$numberFormat(dataOrder.grand_total)}}
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
                <label>Jumlah Yang Dibayar</label>
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
                <label>Bukti Pembayaran</label>
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
      name: "",
      senderRekening: "",
      price: "",
      destRekening: "",
      evidence: "",
      subscription: {},
      defaultImageLabel: "Choose file...",
      noRek: 5833736282927622,
      fileName: "",
      file: null,
      orderNumber: "",
      dataOrder: {
        order_number: "",
        packet_name: "",
        total: 0,
        grand_total: 0,
        disc: 0,
        duration: 0,
        unit: "month"
      }
    }
  },
  async mounted() {
    this.orderNumber = await this.$queryUrl().order
    await this.getOrder()
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
    async getOrder() {
      try {
        let resp = await this.$api2.get('subscription/order?orderNumber=' + this.orderNumber)
        this.dataOrder = resp.data.data
      } catch (e) {
        console.log(e)
      }
    },
    async submitConfirmPayment() {
      try {
        const { name, senderRekening, price, destRekening, evidence, fileName } = this;

        const response = await this.$api2.post(
          `/subscription/submit/payment`,
          {
            order_number: this.orderNumber,
            sender: name,
            total_payment: price,
            document_transaction: fileName,
            number_of_rekening_payment: destRekening,
            number_of_rekening_sender: senderRekening
          }
        );
        let dta = response.data
        if (dta.status !== "OK") {
          alert(dta.message)
        } else {
          alert(dta.message)
          $('#paymentModal').modal('hide')
          window.location.href = "/"
        }

      } catch (error) {
        console.log(error);
      }
    },
    async selectFile(event) {
      try {
        var formData = new FormData();
        formData.append("file", event.target.files[0]);
        let resp = await this.$api.post('news/attachment', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.fileName = resp.data.data.file_path

      } catch(e) {
        console.log(e)
      }
    }
  },
}
</script>

<style scoped>

</style>
