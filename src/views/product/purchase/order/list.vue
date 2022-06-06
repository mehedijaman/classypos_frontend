<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-12 header" style="margin-bottom:10px;">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
          <router-link :to="{ path: '/Purchase/Order/New' }"><button v-if="NewPurchaseOrderPermission" class="btn btn-success pull-right">New Order</button></router-link>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th :key="column.id" v-for="column in table.columns">{{ column }}</th>
            </thead>
            <tbody>
              <tr :key="product.id" v-for="product in products.data">
                <td>{{ product.id }}</td>
                <td>{{ product.CompanyName }}</td>
                <td>{{ product.created_at }}</td>
                <td>{{ product.DeliveryDate }}</td>
                <td>{{ product.Total }}</td>
                <td>
                  <b-btn v-if="PurchaseDetailsPermission" @click.prevent="getProduct(product.id)" class="btn-success">
                    <i class="fa fa-info"></i>
                  </b-btn>
                  <b-btn v-if="PurchaseDeletePermission" @click.prevent="deletePurchaseOrder(product)" class="btn-danger">
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
      title="Purchase Order Details"
      centered
      hide-footer
    >
      <div class="product-info">
      <h4 align="center">Product List</h4>
        <table class="table-condensed table-hover col-md-6" align="center">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(Details,index) in DetailsProductID" :key="Details.id">
              <td>{{DetailsProductID[index]}}</td>
              <td>{{DetailsProductName[index]}}</td>
              <td>{{DetailsQuantity[index]}}</td>
              <td>{{DetailsCostPrice[index]}}</td>
            </tr>
          </tbody>
        </table>
        <hr>
        <table align="center">
         <tr>
            <td>Vendor Name:</td>
            <td>{{DetailsCompanyName}}</td>
          </tr>
          <tr>
            <td>SubTotal:</td>
            <td>{{DetailsSubTotal}}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td>{{DetailsTaxCharge}}</td>
          </tr>
          <tr>
            <td>Shipping Cost:</td>
            <td>{{DetailsShippingCharge}}</td>
          </tr>
          <tr>
            <td>Other Cost:</td>
            <td>{{DetailsOthersCharge}}</td>
          </tr>
          <tr>
            <td>Total Cost:</td>
            <td>{{DetailsTotal}}</td>
          </tr>
          <tr>
            <td>Notes:</td>
            <td>{{DetailsNotes}}</td>
          </tr>
          <tr>
            <td>Reference Number:</td>
            <td>{{DetailsReferenceNumber}}</td>
          </tr>
          <tr>
            <td colspan="1">Delivary Address:</td>
            <td>{{DetailsDelivaryAddress}}</td>
          </tr>
          <tr>
            <td>Purchase Date:</td>
            <td>{{DetailsPurchaseDate}}</td>
          </tr>
          <tr>
            <td>Delivary Date:</td>
            <td>{{DetailsDelivaryDate}}</td>
          </tr>
        </table>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
const tableColumns = ['ID', 'Company Name', 'Order Date', 'Delivery Date', 'Price', 'Action']
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}
export default {
  data () {
    return {
      table: {
        title: 'Purchase Order List',
        subTitle: 'Recently Ordered Purchases.',
        columns: [...tableColumns]
      },
      NewPurchaseOrderPermission: false,
      PurchaseDetailsPermission: false,
      PurchaseDeletePermission: false,
      DetailsCostPrice: [],
      DetailsSalePrice: [],
      DetailsProductID: [],
      DetailsProductName: [],
      DetailsQuantity: [],
      DetailsDelivaryAddress: '',
      DetailsDelivaryDate: '',
      DetailsPurchaseDate: '',
      DetailsSubTotal: 0,
      DetailsTaxCharge: 0,
      DetailsShippingCharge: 0,
      DetailsOthersCharge: 0,
      DetailsReferenceNumber: '',
      DetailsCompanyName: '',
      DetailsNotes: '',
      DetailsTotal: 0,
      productData: {
        CategoryID: null,
        VendorID: null,
        BrandID: null,
        TaxID: null,
        Name: null,
        Unit: null,
        OpeningQty: null,
        Qty: null,
        MinQtyLevel: null,
        CostPrice: null,
        SalePrice: null,
        AllowNegative: null,
        AllowReturn: null,
        HasAttribute: null,
        ApplyTax: null,
        Status: null,
        Image: null,
        Description: null
      },
      vendorData: {
        id: null,
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
      },
      categoryData: {
        id: null,
        Name: null,
        Color: null,
        Image: null,
        Status: null
      },
      brandData: {
        id: null,
        Name: null,
        Manufacturer: null
      },
      products: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      productCategories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      productVendors: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      productBrands: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      productTaxes: {
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
    // this.pagePermissionCheck()
    this.PurchaseOrderList()
    // this.getProductCategories()
    // this.getProductVendors()
    // this.getProductBrands()
    this.AuthCheck()
    this.PermissionCheck('PurchaseDetails')
    this.PermissionCheck('PurchaseDelete')
    this.PermissionCheck('NewPurchaseOrder')
  },
  created () {
    this.PurchaseOrderList()
    var Token = localStorage.getItem('vue-authenticate.vueauth_token')
    axios.get(`http://techlab.classy.pos/Api/User/Permission/PurchaseOrderList?token=` + Token)
      .then((response) => {
        // if (response.data === 'Empty Array') { window.history.back() } else {
        //   this.PurchaseOrderList()
        //   this.AuthCheck()
        //   this.PermissionCheck('PurchaseDetails')
        //   this.PermissionCheck('PurchaseDelete')
        //   this.PermissionCheck('NewPurchaseOrder')
        // }
        if (response.data === 'Empty Array') {
          window.history.back()
        } else {
          this.PurchaseOrderList()
          this.AuthCheck()
          this.PermissionCheck('PurchaseOrderDetails')
          this.PermissionCheck('PurchaseOrderDelete')
          this.PermissionCheck('NewPurchaseOrder')
        }
      })
      .catch(() => {
        // window.location = '/#/pages/login'
        // console.log('handle server error from here')
      })
  },
  methods: {
    AuthCheck () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === null || Token === '') {
        window.location = '/#/pages/login'
      }
    },
    PermissionCheck (RoleName) {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      axios.get(`http://techlab.classy.pos/Api/User/Permission/` + RoleName + `?token=` + Token)
        .then((response) => {
          if (RoleName === 'PurchaseDetails') {
            if (response.data === 'Empty Array') {
              this.PurchaseDetailsPermission = false
            } else {
              this.PurchaseDetailsPermission = true
            }
          }
          if (RoleName === 'PurchaseDelete') {
            if (response.data === 'Empty Array') {
              this.PurchaseDeletePermission = false
            } else {
              this.PurchaseDeletePermission = true
            }
          }
          if (RoleName === 'PurchaseOrderDetails') {
            if (response.data === 'Empty Array') {
              this.PurchaseDetailsPermission = false
            } else {
              this.PurchaseDetailsPermission = true
            }
          }
          if (RoleName === 'PurchaseOrderDelete') {
            if (response.data === 'Empty Array') {
              this.PurchaseDeletePermission = false
            } else {
              this.PurchaseDeletePermission = true
            }
          }
          if (RoleName === 'NewPurchaseOrder') {
            if (response.data === 'Empty Array') {
              this.NewPurchaseOrderPermission = false
            } else {
              this.NewPurchaseOrderPermission = true
            }
          }
          if (RoleName === 'NewPurchaseOrder') {
            if (response.data === 'Empty Array') {
              this.NewPurchaseOrderPermission = false
            } else {
              this.NewPurchaseOrderPermission = true
            }
          }
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    PurchaseOrderList () {
      axios.get(`http://techlab.classy.pos/Api/V1/Purchase/Order/List`)
        .then((response) => {
          this.products = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    deletePurchaseOrder (product) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this product!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Purchase/Order/Trash/New/' + product.id)
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
      axios.get('http://techlab.classy.pos/Api/V1/Purchase/Order/Details/' + id)
        .then((resp) => {
          this.productData = resp.data
          // alert(resp.data[0].OthersCharge)
          this.DetailsDelivaryAddress = resp.data[0].DeliveryAddress
          this.DetailsPurchaseDate = resp.data[0].created_at
          this.DetailsDelivaryDate = resp.data[0].DeliveryDate
          this.DetailsTaxCharge = resp.data[0].TaxCharge
          this.DetailsShippingCharge = resp.data[0].ShippingCharge
          this.DetailsOthersCharge = resp.data[0].OtherCharge
          this.DetailsSubTotal = resp.data[0].SubTotal
          this.DetailsTotal = resp.data[0].Total
          this.DetailsNotes = resp.data[0].Notes
          this.DetailsReferenceNumber = resp.data[0].ReferenceNo
          this.DetailsCompanyName = resp.data[0].CompanyName
          this.DetailsCostPrice = []
          this.DetailsProductID = []
          this.DetailsProductName = []
          this.DetailsQuantity = []
          for (var i = 0; i < resp.data[1].length; i++) {
            this.DetailsCostPrice.push(resp.data[1][i].Price)
            this.DetailsQuantity.push(resp.data[1][i].Qty)
            this.DetailsProductID.push(resp.data[1][i].ProductID)
            this.DetailsProductName.push(resp.data[1][i].Name)
          }
          console.log(resp.data)
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
      this.reset()
      this.$refs.addProductModal.show()
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
