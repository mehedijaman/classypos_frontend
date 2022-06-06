<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <h1 class="text-center" style="background:#f0f0f0;color:red">{{Name}}</h1>
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <!-- <div class="header col-md-12">
          <button @click.prevent="showAddProductModal()" type="button" class="btn btn-wd btn-success pull-left">
           + Add Role
          </button>
        </div> -->
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th :key="column.id" v-for="column in table.columns">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="(product) in ledgerList" :key="product.id">
              <td>{{ product.Name }}</td>
              <td>{{ product.Credit }}</td>
              <td>{{ product.Debit }}</td>
              <td>{{ product.Credit - product.Debit }}</td>
              <td>{{ product.Balance }}</td>
              <td>{{ product.created_at }}</td>
              <td>
                <button  class="btn btn-success">
                  <i class="fa fa-edit"></i>
                </button>
                <button  class="btn btn-danger">
                  <i class="fa fa-trash"></i>
                </button>
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
const tableColumns = ['Name', 'Salary', 'Paid', 'Due', 'Balance', 'Date', 'Action']
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  data () {
    return {
      Checking: [],
      table: {
        title: 'Employee Ledger List',
        subTitle: 'Ledger List of an Employee',
        columns: [...tableColumns]
      },
      ledgerList: {

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
  created () {
    this.id = this.$route.params.id
    this.Name = ''
  },
  mounted () {
    this.getProducts()
    this.getLedgers()
    this.UserInformation()
    // this.getUserName()
  },
  methods: {
    getUserName () {
      var UserID = this.id
      axios.get('http://techlab.classy.pos/Api/User/Name/' + UserID)
        .then((response) => {
          this.Name = response.data.name
        })
        .catch(() => {
        })
    },
    UserInformation () {
      var UserID = this.id
      axios.get('http://techlab.classy.pos/Api/User/Role/Previous/' + UserID)
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i] === 0) { this.Checking.push(0) } else { this.Checking.push(1) }
          }
          console.log(response.data)
        })
        .catch(() => {
        })
    },
    getLedgers () {
      var EmployeeID = this.id
      // var UserID = 1
      axios.get('http://techlab.classy.pos/Api/V1/Employees/Employee/Ledger/List/' + EmployeeID)
        .then((response) => {
          this.ledgerList = response.data
          console.log(response.data)
        })
        .catch(() => {
        })
    },
    RoleAssign (ID) {
      var UserID = this.id
      var RoleID = ID
      axios.get('http://techlab.classy.pos/Api/User/Role/Assignment/' + RoleID + '/' + UserID)
        .then((response) => {
          // this.products.push(response.data)
          // this.$refs.detailsProductModal.hide()
        })
        .catch(() => {
        })
    },
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
      // var TokenChanged = Token.replace('Bearer ', '')
      axios.get(`http://techlab.classy.pos/Api/User/Role/Category/List`)
        .then((response) => {
          console.log(response.data)
          // alert(response.data.length)

          this.products = response.data
        })
        .catch(() => {
          // window.location = '/#/pages/login'
          // console.log('handle server error from here')
        })
    },
    getProductCategories () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Category/List?page=${this.products.current_page}`)
        .then((response) => {
          this.productCategories = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getProductVendors () {
      axios.get(`http://techlab.classy.pos/Api/V1/Vendor/List?page=${this.products.current_page}`)
        .then((response) => {
          this.productVendors = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getProductBrands () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Brand/List?page=${this.products.current_page}`)
        .then((response) => {
          this.productBrands = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
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
          axios.delete('http://techlab.classy.pos/Api/V1/Products/Product/Delete/' + product.id)
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
    getTaxes () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Tax/List?page=${this.productTaxes.current_page}`)
        .then((response) => {
          this.productBrands = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
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
    addBrand () {
      axios.post('http://techlab.classy.pos/Api/V1/Products/Brand/New', this.brandData)
        .then((response) => {
          this.setSuccessMessage()
        })
        .catch(({response}) => {
          this.setErrors(response)
          console.log(JSON.stringify(this.errors))
        })
    },
    addVendor () {
      axios.post('http://techlab.classy.pos/Api/V1/Vendor/New', this.vendorData)
        .then((response) => {
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    setErrors (response) {
      this.errors = response.data.errors
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
  .checkbox {
    width:20px;
    height:20px;

  }
</style>
