<template>
  <div class="container my-3">
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <h4 class="font-weight-bold">Rincian Pembayaran</h4>
            <p>Berikut pilihan paket yang tersedia</p>
            <div class="row mx-3">
              <Loading v-if="subsTabs.length === 0" />
              <div class="col-lg-4 col-sm-12 col-md-4 mb-2 card-packet"
                   @click="selectPacket(packet.id, iPacket)"
                   v-for="(packet, iPacket) in subsTabs" :key="iPacket">
                <div class="card p-3"
                     :class="{'card-packet-selected': packet.id === packetSelected }"
                     style="height: 200px">
                  <span class="text-center font-weight-bold " style="font-size: 16pt">{{packet.packet_name}}</span>
                  <div class="text-center mt-2">
                    <span><small>Rp.</small> <b>{{$numberFormat(packet.disc !== '0' ? (packet.price * packet.disc) / 100 : packet.price)}}</b></span><br/>
                    <small>/{{packet.duration !== 1 ? packet.duration : ''}} {{packet.unit}}</small><br/>
                    <span class="text-muted" v-if="packet.disc !== '0'"><s>Rp. {{$numberFormat(packet.price)}}</s></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 border p-3" style="height: 500px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px;">
        <h5 class="text-muted mt-4 mb-3">Paket {{packetSelectedInformation.packet_name}}</h5>

        <div class="d-flex justify-content-between row">
          <div class="col-8 font-weight-bold" v-if="packetSelectedInformation.disc !== '0'">
            Diskon {{packetSelectedInformation.disc}}%
          </div>
          <div class="col-4 font-weight-bold" v-if="packetSelectedInformation.disc !== '0'">
            Rp. {{$numberFormat((packetSelectedInformation.price * packetSelectedInformation.disc) / 100)}}
          </div>
          <div class="col-8 font-weight-bold">
            Paket Koran
          </div>
          <div class="col-4 font-weight-bold">
            <s class="text-muted" v-if="packetSelectedInformation.disc !== '0'">Rp. {{$numberFormat(packetSelectedInformation.price)}}</s>
            <span v-if="packetSelectedInformation.disc === '0'">Rp. {{$numberFormat(packetSelectedInformation.price)}}</span>
          </div>
        </div>
        <hr/>
        <h5 class="text-muted mb-1">Pajak dan Biaya Lainnya</h5>
        <div class="d-flex justify-content-between row">
          <div class="col-8 font-weight-bold">
            PPN 11%
          </div>
          <div class="col-4 font-weight-bold">
            Rp. 0
          </div>
        </div>
        <hr/>
        <div class="d-flex justify-content-between row">
          <div class="col-8 font-weight-bold">
            Total
          </div>
          <div class="col-4 font-weight-bold">
            Rp. {{$numberFormat(packetSelectedInformation.disc !== '0' ? (packetSelectedInformation.price * packetSelectedInformation.disc) / 100 : packetSelectedInformation.price)}}
          </div>
        </div>
        <div class="row mt-5 mx-1">
          <button class="btn w-100" @click="createOrder" :disabled="isSubmit">
            <div class="spinner-border spinner-border-sm" role="status" v-if="isSubmit"></div>
            {{isSubmit ? 'Sedang membuat order...':'Lanjutkan'}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "_editionnew",
  middleware: 'auth',
  layout: "payment",
  data() {
    return {
      subsTabs: [],
      packetSelected: null,
      packetSelectedInformation: {
        packet_name: "",
        disc: "0",
        price: 0
      },
      isSubmit: false
    };
  },
  async mounted() {
    await this.getDataPacket()
  },
  methods: {
    async getDataPacket() {
      try {
        let resp = await this.$api2.get("koran/paket")
        this.subsTabs = resp.data.data
        if (this.subsTabs.length > 0) {
          this.packetSelected = this.subsTabs[0].id
          this.packetSelectedInformation = this.subsTabs[0]
        }
      } catch (e) {
      }
    },

    selectPacket(id, index) {
      this.packetSelected = id
      this.packetSelectedInformation = this.subsTabs[index]
    },

    createOrder() {
      this.isSubmit = true
      this.$store.commit('order/addOrderNumber', "38945345v49534")
      setTimeout(() => {
        this.$router.push("checkout")
      }, 3000)
    }
  }
}
</script>

<style scoped>
.card-packet {
  background-color: #ffffff;
  color: black;
}

.card-packet :hover {
  background-color: #48a4e0;
  color: #ffffff;
  cursor: pointer;
}

.card-packet-selected {
  background-color: #48a4e0;
  color: #ffffff;
}
</style>
