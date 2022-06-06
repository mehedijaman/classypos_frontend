<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <router-link to="/shop/terminal" class="btn btn-wd btn-success pull-right">
            Shop Terminal
          </router-link>

          <router-link to="/shop/floor" class="btn btn-wd btn-success pull-right">
            Shop Floor
          </router-link>

          <router-link to="/shop/notice" class="btn btn-wd btn-success pull-right">
            Shop Notice
          </router-link>

          <button @click.prevent="showAddShopModal" type="button" class="btn btn-wd btn-success pull-right">
            Add Shop
          </button>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in table.columns" :key="column.id">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="shop in shops.data" :key="shop.id">
              <td>{{ shop.id }}</td>
              <td>{{ shop.Name }}</td>
              <td>{{ shop.Address }}</td>
              <td>{{ shop.Type }}</td>
              <td>
                <b-btn @click.prevent="getShop(shop.id)" class="btn-success">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editShop(shop.id)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <b-btn @click.prevent="deleteShop(shop)" class="btn-danger">
                  <i class="fa fa-trash"></i>
                </b-btn>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <b-pagination align="right"
                    :total-rows="shops.total"
                    v-model="shops.current_page"
                    :per-page="shops.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="details-shop-modal"
      ref="detailsShopModal"
      size="lg"
      title="Details Shop"
      centered
      hide-footer
    >
      <div class="shop-info">
        <p>ID: {{ shopData.id }}</p>
        <p>Shop Name: {{ shopData.Name }}</p>
        <p>Address: {{ shopData.Address }}</p>
        <p>Shop Type: {{ shopData.Type }}</p>
        <p>Phone: {{ shopData.Phone }}</p>
        <p>Licence: {{ shopData.LicenceNo }}</p>
        <p>City: {{ shopData.City }} </p>
      </div>
    </b-modal>

    <b-modal
      id="add-shop-modal"
      ref="addShopModal"
      size="lg"
      title="Add Shop"
      centered
      hide-footer
    >

      <div class="add-shop-modal-body">
        <b-form>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Name:"
                label-for="shop-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="shop-name"
                          placeholder="Enter Shop Name"
                          v-model="shopData.Name">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Legal Name:"
                label-for="shop-legal-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          label="Legal Name"
                          placeholder="Legal Name"
                          v-model="shopData.LegalName">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Shop Type:"
                label-for="shop-type"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="shop-type"
                               v-model="shopData.Type"
                               required>
                  <option :value="null" disabled>Shop Type</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Retail Shop">Retail Shop</option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Address:"
                label-for="shop-address"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="shop-address"
                              placeholder="Address"
                              v-model="shopData.Address">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="City:"
                label-for="shop-city"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="shop-city"
                          placeholder="City"
                          v-model="shopData.City">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Province:"
                label-for="shop-province"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="shop-province"
                          placeholder="Province"
                          v-model.number="shopData.Province">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Phone No:"
                label-for="shop-phone"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="shop-phone"
                          placeholder="Phone No:"
                          v-model="shopData.Phone">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Email:"
                label-for="shop-email"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="email"
                          label="shop-email"
                          placeholder="Email"
                          v-model="shopData.Email">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Website:"
                label-for="shop-website"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              label="shop-website"
                              placeholder="Website"
                              v-model.number="shopData.Website">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Vat Reg:"
                label-for="shop-vat-no"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              label="shop-vat-no"
                              placeholder="Vat Reg. No."
                              v-model.number="shopData.VatRegNo">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Licence:"
                label-for="shop-licence"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="shop-licence"
                          placeholder="Licence No."
                          v-model="shopData.LicenceNo">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Logo"
                label-for="shop-logo"
                :label-cols="3"
                :horizontal="true">
                <b-form-file v-model="shopData.Logo" id="shop-logo" :plain="true"></b-form-file>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <b-form-group
                label="Notes:"
                label-for="shop-notes"
                :label-cols="3"
                :horizontal="true">
                <b-form-textarea id="shop-notes"
                                 v-model="shopData.Notes"
                                 placeholder="Here can be your notes"
                                 :rows="3"
                                 :max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="addShop">
              Add Shop
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-shop-modal"
      ref="editShopModal"
      size="lg"
      title="Edit Shop"
      centered
      hide-footer
    >
      <div class="edit-shop-modal-body">
        <b-form>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Name:"
                label-for="shop-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="shop-name"
                              placeholder="Enter Shop Name"
                              v-model="shopData.Name">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Legal Name:"
                label-for="shop-legal-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              label="Legal Name"
                              placeholder="Legal Name"
                              v-model="shopData.LegalName">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Shop Type:"
                label-for="shop-type"
                :label-cols="3"
                :horizontal="true">
                <b-form-select class="form-control border-input"
                               v-model="shopData.Type"
                               required
                >
                  <option :value="null" disabled>Shop Type</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Retail Shop">Retail Shop</option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Address:"
                label-for="shop-address"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="shop-address"
                              placeholder="Address"
                              v-model="shopData.Address">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="City:"
                label-for="shop-city"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="shop-city"
                              placeholder="City"
                              v-model="shopData.City">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Province:"
                label-for="shop-province"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="shop-province"
                              placeholder="Province"
                              v-model.number="shopData.Province">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Phone No:"
                label-for="shop-phone"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="shop-phone"
                              placeholder="Phone No:"
                              v-model="shopData.Phone">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Email:"
                label-for="shop-email"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="email"
                              label="shop-email"
                              placeholder="Email"
                              v-model="shopData.Email">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Website:"
                label-for="shop-website"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              label="shop-website"
                              placeholder="Website"
                              v-model.number="shopData.Website">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Vat Reg:"
                label-for="shop-vat-no"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              label="shop-vat-no"
                              placeholder="Vat Reg. No."
                              v-model.number="shopData.VatRegNo">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Licence:"
                label-for="shop-licence"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="shop-licence"
                              placeholder="Licence No."
                              v-model="shopData.LicenceNo">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Logo"
                label-for="shop-logo"
                :label-cols="3"
                :horizontal="true">
                <b-form-file v-model="shopData.Logo" id="shop-logo" :plain="true"></b-form-file>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <b-form-group
                label="Notes"
                label-for="shop-notes"
                :label-cols="3"
                :horizontal="true">
                <b-form-textarea id="shop-notes"
                                 v-model="shopData.Notes"
                                 placeholder="Here can be your notes"
                                 :rows="3"
                                 :max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="updateShop(shopData.id)">
              Update Shop
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

  </div>
</template>

<script>
import axios from 'axios'

const tableColumns = ['ID', 'Shop Name', 'Address', 'Type', 'Action']

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  data () {
    return {
      table: {
        title: 'Shops in Stock',
        subTitle: 'Recently added shops in main stock.',
        columns: [...tableColumns]
      },
      shopData: {
        id: null,
        Name: null,
        LegalName: null,
        Type: null,
        Address: null,
        City: null,
        Province: null,
        Phone: null,
        Email: null,
        Website: null,
        Logo: null,
        LicenceNo: null,
        VatRegNo: null,
        Notes: null
      },
      shops: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4
    }
  },
  mounted () {
    this.getShops()
  },
  methods: {
    getShops () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Shop/List?page=${this.shops.current_page}`)
        .then((response) => {
          this.shops = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    addShop () {
      axios.post('http://techlab.classy.pos/Api/V1/Shop/Shop/New', this.shopData)
        .then((response) => {
          this.shops.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    deleteShop (shop) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this shop!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Shop/Shop/Trash/New/' + shop.id)
            .then((response) => {
              const idx = this.shops.data.indexOf(shop)
              this.shops.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    detailsShop (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Shop/Shop/Details/' + id)
        .then((resp) => {
          this.shopData = resp.data
        })
        .catch(function () {
          alert('Could not load your Shop: ' + id)
        })
    },
    updateShop (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Shop/Shop/Update/' + id, this.shopData)
        .then((response) => {
          this.shops.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },

    setErrors (response) {
      this.errors = response.data.errors
    },

    setSuccessMessage () {
      this.reset()
    },

    reset () {
      this.$refs.addShopModal.hide()
      this.$refs.detailsShopModal.hide()
      this.$refs.editShopModal.hide()
      this.errors = []
      this.shopData = {
        id: null,
        Name: null,
        LegalName: null,
        Type: null,
        Address: null,
        City: null,
        Province: null,
        Phone: null,
        Email: null,
        Website: null,
        Logo: null,
        LicenceNo: null,
        VatRegNo: null,
        Notes: null
      }
    },
    showAddShopModal () {
      this.reset()
      this.$refs.addShopModal.show()
    },
    editShop (id) {
      this.detailsShop(id)
      this.$refs.editShopModal.show()
    },
    getShop (id) {
      this.detailsShop(id)
      this.$refs.detailsShopModal.show()
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
  .modal-lg {
    width: 100% !important;
  }
</style>
