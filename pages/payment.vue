<template>
    <div class="container my-5 w-50">
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
            @click.prevent="[setActiveItem(tabs.id), setActiveSubscription(tabs.id)]"
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
            <div class="card-header py-5 bg-info-200">
              <div
                class="container d-flex justify-content-between align-items-center"
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
              <p class="card-text">
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
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5 d-block text-center">
      <small>No rek Mandiri:</small>
      <h4 class="text-info">5833736282927622</h4>
    </div>

    <div class="mt-5">
      <h5>Detail Pembayaran</h5>
      <p class="text-muted">Silahkan melakukan pembayaran senilai total pesanan dengan nomor rekening yang diatas</p>
        <div class="text-muted d-flex justify-content-between">
          <h5>Total Pembayaran</h5>
          <h5 class="text-info">
            {{ decimalToRp(discount(subscription.price, subscription.discount)) }}
          </h5>
      </div>
    </div>

    <div class="mt-5">
      <button type="button" class="btn btn-primary w-100" @click="isShowModal()">Upload Bukti Pembayaran</button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="paymentModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
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
      //
      subscription: {},
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
    // this.getMonthlySubscription()
    this.setActiveSubscription(this.activeItem);
  },
  methods: {
    isShowModal() {
      $("#paymentModal").modal("show");
    },
    setIsShowModal() {
      this.isShowModal = !this.isShowModal
    },
    setActiveItem(item) {
      this.activeItem = item;
    },
    setActiveSubscription(subscription) {
      const [monthly, yearly] = this.subscriptionTabs

      if (subscription === monthly.id) this.getMonthlySubscription()
      if (subscription === yearly.id) this.getYearlySubscription()
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
      }

      this.subscription = monthly
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
      }

      this.subscription = yearly
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
