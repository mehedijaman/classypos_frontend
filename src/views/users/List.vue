<template>
  <div class="row">
    <h1>{{id}}</h1>
    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <button @click.prevent="showAddProductModal()" type="button" class="btn btn-wd btn-success pull-left">
           + Add Role
          </button>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th :key="column.id" v-for="column in table.columns">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.email }}</td>
              <td>
                <router-link :to="{path: '/User/Role/'+product.id}">
                  <b-btn class="btn-success">
                    <i class="fa fa-key"></i>
                  </b-btn>
                </router-link>
                <b-btn @click.prevent="deleteProduct(product)" class="btn-danger">
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
                    :total-rows="products.total"
                    v-model="products.current_page"
                    :per-page="products.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="details-product-modal"
      ref="detailsProductModal"
      size="lg"
      title="Add New Role"
      centered
      hide-footer
    >
      <div class="row">
        <div class="col-md-6">
          <input type="text" placeholder="Enter Role Name" class="form-control" v-model="RoleAdd.RoleName">
        </div>
        <div class="col-md-6">
          <input type="text" placeholder="Enter Route Name" class="form-control" v-model="RoleAdd.RoleRoute">
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 offset-md-2 pull-left" style="margin-top:20px">
          <input type="button" value="Add New Role" v-on:click="AddRole()" class="btn btn-success form-control">
        </div>
        <div class="col-md-3 offset-md-1" style="margin-top:20px">
          <input type="button" value="Cancel" class="btn btn-danger form-control">
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
const tableColumns = ['ID', 'Name', 'Email', 'Action']
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  data () {
    return {
      table: {
        title: 'List of Users',
        subTitle: 'List of Human Resource in the Organization',
        columns: [...tableColumns]
      },
      productData: {
        RoleCategoryID: null,
        RoleCategoryName: null,
        RoleRouteName: null
      },

      products: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      RoleAdd: {
        RoleName: null,
        RoleRoute: null
      },
      offset: 4
    }
  },
  mounted () {
    this.getProducts()
  },
  created () {
    this.id = this.$route.params.id
    // this.PurchaseReceiveList()
    var Token = localStorage.getItem('vue-authenticate.vueauth_token')
    axios.get(`http://techlab.classy.pos/Api/User/Permission/UserList?token=` + Token)
      .then((response) => {
        if (response.data === 'Empty Array') { window.history.back() } else {
          this.getProducts()
        }
      })
      .catch(() => {
        localStorage.setItem('vue-authenticate.vueauth_token', '')
        window.location = '/#/pages/login'
      })
  },
  methods: {
    AddRole () {
      axios.post(`http://techlab.classy.pos/Api/User/Role/Category/New`, this.RoleAdd)
        .then((response) => {
          // console.log(response.data)
          // alert(response.data.RoleCategoryName)
          this.products.push(response.data)
          this.$refs.detailsProductModal.hide()
        })
        .catch(() => {
          // window.location = '/#/pages/login'
          // console.log('handle server error from here')
        })
    },
    getProducts () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === null || Token === '') {
        window.location = '/#/pages/login'
      }
      axios.get(`http://techlab.classy.pos/Api/User/List`)
        .then((response) => {
          console.log(response.data)
          this.products = response.data
        })
        .catch(() => {
          // window.location = '/#/pages/login'
          // console.log('handle server error from here')
        })
    },

    deleteProduct (product) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this product!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Products/Product/Trash/New/' + product.id)
            .then((response) => {
              const idx = this.products.data.indexOf(product)
              this.products.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    detailsProduct (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Products/Product/Details/' + id)
        .then((resp) => {
          this.productData = resp.data
        })
        .catch(function () {
          alert('Could not load your Product: ' + id)
        })
    },
    updateProduct (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Products/Product/Update/' + id, this.productData)
        .then((response) => {
          this.products.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    addProduct () {
      axios.post('http://techlab.classy.pos/Api/V1/Products/Product/New', this.productData)
        .then((response) => {
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    addCategory () {
      axios.post('http://techlab.classy.pos/Api/V1/Products/Category/New', this.categoryData)
        .then((response) => {
          this.setSuccessMessage()
        })
        .catch(({response}) => {
          this.setErrors(response)
          console.log(JSON.stringify(this.errors))
        })
    },
    setSuccessMessage () {
      this.$swal({
        title: 'Done!',
        // text: 'You will not be able to recover this product!',
        type: 'success',
        timer: 1000
      })
      this.reset()
    },

    reset () {
      this.$refs.addProductModal.hide()
      this.$refs.addCategoryModal.hide()
      this.$refs.addBrandModal.hide()
      this.$refs.addVendorModal.hide()
      this.$refs.detailsProductModal.hide()
      this.$refs.editProductModal.hide()
      this.errors = []
      this.productData = {
        CategoryID: null,
        VendorID: null,
        BrandID: null,
        TaxID: null,
        Name: null,
        Description: null,
        Image: null,
        OpeningQty: null,
        Qty: null,
        MinQtyLevel: null,
        CostPrice: null,
        SalePrice: null,
        Unit: null,
        AllowNegative: null,
        AllowReturn: null,
        HasAttribute: null,
        ApplyTax: null,
        Status: null
      }
      this.vendorData = {
        CompanyName: null,
        ContactName: null,
        Address: null,
        City: null,
        Province: null,
        ZipCode: null,
        Country: null,
        ContactPhone: null,
        CompanyPhone: null,
        Fax: null,
        Email: null,
        Website: null,
        Image: null,
        Notes: null,
        OpeningBalance: null,
        Status: null
      }
      this.categoryData = {
        Name: null,
        Color: null,
        Image: null,
        Status: null
      }
      this.brandData = {
        Name: null,
        Manufacturer: null
      }
    },
    showAddCategoryModal () {
      this.reset()
      this.$refs.addCategoryModal.show()
    },
    showAddBrandModal () {
      this.reset()
      this.$refs.addBrandModal.show()
    },
    showAddVendorModal () {
      this.reset()
      this.$refs.addVendorModal.show()
    },
    showAddProductModal () {
      // this.reset()
      this.$refs.detailsProductModal.show()
    },
    editProduct (id) {
      this.detailsProduct(id)
      this.$refs.editProductModal.show()
    },
    getProduct (id) {
      this.detailsProduct(id)
      this.$refs.detailsProductModal.show()
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
</style>
