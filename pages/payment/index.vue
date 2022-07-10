<template>
  <div class="container my-5 col-md-6 col-sm-12">
    <h4>Rincian Pembayaran</h4>
    <p>Berikut pilihan paket yang tersedia</p>

    <div>
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            class="nav-link"
            href="#"
            v-for="(tabs, iTabs) in subscriptionTabs"
            :key="iTabs"
            :class="{ active: isActive(tabs.id) }"
            @click.prevent="
              [setActiveItem(tabs.id), setActiveSubscription(tabs.id)]
            "
          >
            {{ tabs.title }}
          </a>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane"
          :class="{ 'active show': isActive(subscription.id) }"
        >
          <div class="card w-100 mt-3">
            <div class="card-header py-md-4 bg-info-200">
              <div
                class="container d-sm-block d-md-flex justify-content-between align-items-center"
              >
                <h5>{{ subscription.title }}</h5>
                <div>
                  <div class="d-flex">
                    <h5>
                      {{
                        decimalToRp(
                          discount(subscription.price, subscription.discount)
                        )
                      }}
                    </h5>
                    &nbsp;
                    <span class="text-muted"
                      >/ {{ subscription.duration }}</span
                    >
                  </div>
                  <div
                    :class="[subscription.discount <= 0 ? 'd-none' : 'd-flex']"
                  >
                    <s>{{ decimalToRp(subscription.price) }}</s>
                    &nbsp;
                    <span class="badge badge-danger-custom">
                      -{{ subscription.discount }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">Periode pembayaran</h5>
              <div class="d-flex justify-content-between font-weight-bold">
                <span class="text-muted">Tanggal Aktif</span>
                <span class="text-muted">
                  {{ subscription.periodStart }}
                </span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-muted">Tanggal Berakhir</span>
                <span class="text-muted">
                  {{ subscription.periodEnd }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5 d-block text-center">
      <small>No rek Mandiri:</small>
      <h4 class="text-info">
        {{ noRek }}
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
        <h5 class="text-info">
          {{ decimalToRp(discount(subscription.price, subscription.discount)) }}
        </h5>
      </div>
    </div>

    <div class="mt-5">
      <button
        type="button"
        class="btn btn-primary w-100"
        data-toggle="modal"
        data-target="#paymentModal"
        @click="isShowModal()"
      >
        Upload Bukti Pembayaran
      </button>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="paymentModal"
      tabindex="-1"
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
import moment from "moment";

export default {
  name: "payment",
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
      subscriptionTabs: [
        {
          id: "monthly",
          title: "Premium 1 Bulan",
        },
        {
          id: "yearly",
          title: "Premium 1 Tahun",
        },
      ],
      activeItem: "monthly",
    };
  },
  mounted() {
    this.setActiveSubscription(this.activeItem);
  },
  methods: {
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
    async copyText() {
      try {
        await navigator.clipboard.writeText(this.noRek);
        alert("Copied");
      } catch ($e) {
        alert("Cannot copy");
      }
    },
    hideModal() {
      $("#paymentModal").modal("hide");
    },
    isShowModal() {
      $("#paymentModal").modal("show");
    },
    setActiveItem(item) {
      this.activeItem = item;
    },
    setActiveSubscription(subscription) {
      const [monthly, yearly] = this.subscriptionTabs;

      if (subscription === monthly.id) this.getMonthlySubscription();
      if (subscription === yearly.id) this.getYearlySubscription();
    },
    isActive(item) {
      return this.activeItem === item;
    },
    decimalToRp(number) {
      return "Rp. " + number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    discount(price, discount) {
      return price - (price * discount) / 100;
    },
    getMonthlySubscription() {
      const monthly = {
        id: "monthly",
        title: "Premium 1 Bulan",
        price: 50000,
        discount: 0,
        duration: "1 Bulan",
        periodStart: moment().format("D MMM YYYY"),
        periodEnd: moment().add(1, "months").format("D MMM YYYY"),
      };

      this.subscription = monthly;
    },
    getYearlySubscription() {
      const yearly = {
        id: "yearly",
        title: "Premium 1 Tahun",
        price: 600000,
        discount: 40,
        duration: "1 Tahun",
        periodStart: moment().format("D MMM YYYY"),
        periodEnd: moment().add(1, "year").format("D MMM YYYY"),
      };

      this.subscription = yearly;
    },
    async selectFile(e) {
      const file = e.target.files[0];

      /* Make sure file exists */
      if (!file) return;

      this.defaultImageLabel = file.name;
      this.evidence = file;
    },
  },
};
</script>

<style>
.badge-danger-custom {
  background-color: #ffb6be;
  color: #f24f5f !important;
  line-height: normal !important;
}
</style>
