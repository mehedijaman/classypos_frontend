<template>
  <div class="row">
    <div class="container">
      <div class="row" style="margin-bottom:13px">
        <div class="input-group col-md-6">
          <input type="text" placeholder="Purchase ID" class="form-control" v-model="testPurchase.PurchaseID">
          <span class="input-group-addon"><button class="btn btn-primary" v-on:click="LoadPurchase()">Load Purchase</button></span>
        </div>
        <div class="input-group col-md-6">
          <select id="vendor" v-model="testPurchase.ContactID" class="form-control">
                  <option :value="0" disabled>Select a Vendor</option>
                  <option
                    v-for="productVendor in productVendors.data"
                    :key="productVendor.id"
                    :value="productVendor.id">
                    {{ productVendor.CompanyName }}
                  </option>
          </select>
          <span class="input-group-addon"><button class="btn btn-primary">Vendor</button></span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <select v-model="CategoryInformation[0]" v-on:click="CategoryChange(0)" class="form-control">
            <option disabled value="0">Please select a Category</option>
            <option
              v-for="productCategory in productCategories.data"
              :key="productCategory.id"
              :value="productCategory.id">
              {{ productCategory.Name }}
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <select class="form-control" v-model="ProductInformation[0]" v-on:click="ProductChange(0)">
          <option disabled value="0">Please select a Product</option>
          <option
                    v-for="FirstProductInformation in message[0]"
                    :key="FirstProductInformation.id"
                    :value="FirstProductInformation.id">
                    {{ FirstProductInformation.Name }}
          </option>
        </select>
        </div>
        <div class="col-md-4">
          <input id="product-name"
                                  type="number"
                                  placeholder="Quantity" min="0" v-on:click="TotalPriceCalculation(0)"
                                  v-model="FirstQuantity[0]" class="form-control">
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <input id="product-name"
                                  type="number"
                                  min="0"
                                  placeholder="Cost Price"
                                  v-model="FirstCostPrice[0]" v-on:click="TotalPriceCalculation(0)" class="form-control">
        </div>
        <div class="col-md-4">
          <input id="product-name"
                                  type="number"
                                  min="0"
                                  placeholder="Sale Price"
                                  v-model="FirstSalePrice[0]" v-on:click="TotalPriceCalculation(0)" class="form-control">
        </div>
        <div class="input-group col-md-4">
          <input type="number" placeholder="SubTotal" v-model="SubTotal[0]" class="form-control" readonly>
          <span class="input-group-btn"><button class="btn btn-success" v-on:click="AddProductToCart()"><i class="fa fa-plus"></i></button></span>
        </div>
      </div>
    </div>
    <div class="container">
      <div v-for="(Purchase,index) in PurchaseList.row" :key="Purchase.id">
        <div class="row">
          <div class="col-md-4">
            <select v-model="CategoryInformation[index + 1]" v-on:click="CategoryChange(index+1)" class="form-control">
              <option disabled value="0">Please Select a Category</option>
              <option
                v-for="productCategory in productCategories.data"
                :key="productCategory.id"
                :value="productCategory.id">
                {{ productCategory.Name }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-control" v-model="ProductInformation[index + 1]" v-on:click="ProductChange(index+1)">
              <option disabled value="0">Please Select a Product</option>
              <option
                      v-for="productBrand in message[index + 1]"
                      :key="productBrand.id"
                      :selected="true"
                      :value="productBrand.id">
                      {{ productBrand.Name }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <input id="product-name"
                                    type="number" min="0"
                                    placeholder="Quantity" v-on:click="TotalPriceCalculation(index+1)"
                                    v-model="FirstQuantity[index+1]" class="form-control">
          </div>

        </div>
        <div class="row">
          <div class="col-md-4">
            <input id="product-name"
                                    type="number"
                                    placeholder="Cost Price"
                                    min="0"
                                    v-model="FirstCostPrice[index + 1]" v-on:click="TotalPriceCalculation(index+1)" class="form-control">
          </div>
          <div class="col-md-4">
            <input id="product-description"
                                    type="number"
                                    placeholder="Sale Price"
                                    v-model="FirstSalePrice[index + 1]" class="form-control">
          </div>
          <div class="input-group col-md-4">
            <input type="number" placeholder="SubTotal" v-model="SubTotal[index+1]" class="form-control" readonly>
            <span class="input-group-btn"><button class="btn btn-danger" v-on:click="DeleteProductFromCart(index)"><i class="fa fa-minus"></i></button></span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row" style="margin-top:13px">
        <div class="input-group col-md-4">
          <input type="text" placeholder="Total" class="form-control" v-model="testPurchase.TotalPrice" readonly>
          <span class="input-group-addon"><button class="btn btn-primary">Total</button></span>
        </div>
        <div class="input-group col-md-4">
          <input type="text" placeholder="Return Reason" class="form-control" v-model="testPurchase.ReturnReason">
          <span class="input-group-addon"><button class="btn btn-primary">Return Reason</button></span>
        </div>
        <div class="input-group col-md-4">
          <input type="text" placeholder="Memo Number" class="form-control" v-model="testPurchase.MemoNo">
          <span class="input-group-addon"><button class="btn btn-primary">Memo Number</button></span>
        </div>
      </div>
    </div>

      <div class="form-group" style="margin-top:20px;">
                <div class="col-sm-12">
                  <input type="button" name="submit" value="Return" class="btn btn-success btn-flat " id="PurchaseButton" v-on:click="PurchaseOrder">

                  <button id="ResetBtn" class="btn btn-flat btn-primary" type="button">Reset</button>

                  <a type="button" href="/Product" class="btn btn-flat btn-danger">Cancel</a>
                </div>
      </div>
      <p v-if="seen" style="font-size:0px;">
        {{TemporarySalePrice}}
        {{TemporaryCostPrice}}
      </p>
      {{testPurchase.ReceivedProduct}}
    </div>
</template>
<script>
import axios from 'axios'

const tableColumns = ['ID', 'Product Name', 'Quantity', 'Unit Price', 'Discount', 'Tax', 'SubTotal', 'Action']
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}
export default {
  data () {
    return {
      testPurchase: {
        UserID: 1,
        ContactID: 0,
        VendorID: 1,
        ShopID: 1,
        PurchaseID: null,
        MemoNo: '',
        ReturnReason: '',
        DeliveryAddress: '',
        DeliveryDate: '',
        TotalPrice: 0,
        SubTotalPrice: 0,
        TaxCharge: 0,
        OtherCharge: 0,
        ShippingCharge: 0,
        ReturnedProducts: []
      },
      seen: true,
      CategoryInformation: [0],
      ProductInformation: [0, 0, 0],
      TemporaryCostPrice: 0,
      TemporarySalePrice: 0,
      TotalPrice: 0,
      Total: 0,
      FirstCostPrice: [''],
      FirstSalePrice: [''],
      FirstExpiryDate: [''],
      FirstCustomID: [''],
      FirstQuantity: [''],
      ProductDescription: [''],
      SubTotal: [''],
      ModelNumber: [''],
      allproducts: [],
      ProductIDforDetails: '',
      table: {
        title: 'TechLab IT',
        subTitle: 'Sales  Panel',
        columns: [...tableColumns]
      },
      PurchaseList: {
        row: [],
        CostPrice: [0],
        SalePrice: [0],
        ProductID: [0],
        CategoryID: [0],
        Quantity: ['']
      },
      ProductList: {
        ProductListForCategory: [0]
      },
      message: [[]],
      productData: {
        CategoryID: null,
        VendorID: null,
        BrandID: null,
        TaxId: null,
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
      },
      items: [
        { total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          Name: null,
          id: null },
        { total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          Name: null,
          id: null }
      ],
      products: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        ID: null,
        CategoryID: null,
        VendorID: null,
        BrandID: null,
        Name: null,
        Description: null
      },

      productCategories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        Name: null
      },
      productVendors: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },

      productinformation: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        Name: null,
        id: null
      },
      productdescription: {
        id: [19, 20],
        Name: ['Polo', 'Lux']
      },
      producttocart: {
        ID: null,
        CategoryID: null,
        VendorID: null,
        Name: null,
        BrandID: null
      },
      productBrands: {
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
    this.getProducts()
    this.getProductCategories()
    this.getProductVendors()
    this.getProductBrands()
    this.AuthCheck()
  },
  methods: {
    LoadPurchase () {
      this.PurchaseList.row = []
      this.message = [[]]
      this.FirstSalePrice[0] = 0
      this.FirstCostPrice[0] = 0
      this.FirstQuantity[0] = 0
      var id = this.testPurchase.PurchaseID
      axios.get('http://techlab.classy.pos/Api/V1/Purchase/Receive/Details/' + id)
        .then((resp) => {
          for (var i = 0; i < resp.data[1].length - 1; i++) {
            this.PurchaseList.row.push(0)
            this.message.push([])
            this.FirstCostPrice.push(0)
            this.FirstQuantity.push(0)
          }
          // alert(resp.data[1][0].Name)
          this.message[0].splice(0, this.message[0].length)
          this.message[0].push({id: resp.data[1][0].ProductID, Name: resp.data[1][0].Name})
          this.FirstCostPrice[0] = resp.data[1][0].CostPrice
          this.FirstSalePrice[0] = resp.data[1][0].SalePrice
          this.FirstQuantity[0] = resp.data[1][0].Qty
          this.CategoryInformation[0] = resp.data[1][0].CategoryID
          this.ProductInformation[0] = resp.data[1][0].ProductID
          this.SubTotal[0] = this.FirstCostPrice[0] * this.FirstQuantity[0]
          for (i = 1; i < resp.data[1].length; i++) {
            this.FirstCostPrice[i] = resp.data[1][i].CostPrice
            this.FirstSalePrice[i] = resp.data[1][i].SalePrice
            this.FirstQuantity[i] = resp.data[1][i].Qty
            this.SubTotal[i] = this.FirstCostPrice[i] * this.FirstQuantity[i]
            this.message[i].splice(0, this.message[i].length)
            this.ProductInformation[i] = resp.data[1][i].ProductID
            this.CategoryInformation[i] = resp.data[1][i].CategoryID
            this.message[i].push({id: resp.data[1][i].ProductID, Name: resp.data[1][i].Name})
          }
          this.testPurchase.DeliveryAddress = resp.data[0].DeliveryAddress
          this.testPurchase.DeliveryDate = resp.data[0].DeliveryDate
          this.testPurchase.ContactID = resp.data[0].ContactID
          this.testPurchase.TotalPrice = resp.data[0].SubTotal
          this.testPurchase.TaxCharge = resp.data[0].TaxCharge
          this.testPurchase.OtherCharge = resp.data[0].OtherCharge
          this.testPurchase.ShippingCharge = resp.data[0].ShippingCharge
          console.log(resp.data)
        })
        .catch(function () {
          alert('Could not load your PurchaseOrder: ' + id)
        })
    },
    AuthCheck () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === null || Token === '') {
        window.location = '/#/pages/login'
      }
    },
    PurchaseOrder () {
      this.testPurchase.SubTotalPrice = this.testPurchase.TotalPrice
      this.testPurchase.TotalPrice = parseInt(this.testPurchase.TotalPrice) + parseInt(this.testPurchase.ShippingCharge) + parseInt(this.testPurchase.TaxCharge) + parseInt(this.testPurchase.OtherCharge)
      this.testPurchase.Total = this.testPurchase.TotalPrice
      for (var i = 0; i < this.FirstCostPrice.length; i++) {
        if (this.FirstQuantity[i] > 0) {
          this.testPurchase.ReturnedProducts.push({'ProductLedgerID': this.ProductInformation[i], 'Qty': this.FirstQuantity[i], 'Price': this.FirstCostPrice[i], 'ProductID': this.ProductInformation[i]})
        }
      }
      this.PurchaseList.row = []
      this.FirstSalePrice[0] = 0
      this.FirstCostPrice[0] = 0
      this.FirstQuantity[0] = 0
      axios.post('http://techlab.classy.pos/Api/V1/Purchase/Return/New', this.testPurchase)
        .then((response) => {
          alert(response.data)
          alert('Purchase Return Done')
          this.testPurchase.ReferenceNo = ''
          // this.testPurchase.Notes = ''
          // this.testPurchase.DeliveryAddress = ''
          // this.testPurchase.DeliveryDate = ''
          // this.testPurchase.TotalPrice = ''
          // this.testPurchase.SubTotalPrice = ''
          // this.testPurchase.TaxCharge = ''
          // this.testPurchase.ShippingCharge = ''
          // this.testPurchase.OtherCharge = ''
          // this.testPurchase.ReturnReason = ''
          // router.go('/Purchase')
          // window.location = '/#/Purchase/'
          // this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    ProductChange (index) {
      var ProductID = this.ProductInformation[index]
      axios.get('http://techlab.classy.pos/Api/V1/Products/Product/Details/' + ProductID)
        .then((response) => {
          this.FirstCostPrice[index] = response.data.CostPrice
          this.FirstSalePrice[index] = response.data.SalePrice
          this.TemporaryCostPrice = response.data.CostPrice
          this.TemporarySalePrice = response.data.SalePrice
        })
        .catch(() => {
          console.log('handle server error from here')
        })
      this.FirstCostPrice[index] = this.TemporaryCostPrice
      this.FirstSalePrice[index] = this.TemporarySalePrice
      this.testPurchase.Products[index][4] = 412
    },
    CategoryChange (index) {
      var CategoryID = this.CategoryInformation[index]
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      var TokenChanged = Token.replace('Bearer ', '')
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Product/Filter/` + CategoryID + `/0/0/0/0/0?token=` + TokenChanged)
        .then((response) => {
          this.message[index].splice(0, this.message[index].length)
          for (var i = 0; i < response.data.data.length; i++) {
            this.message[index].push(response.data.data[i])
          }
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    TotalPriceCalculation (index) {
      this.SubTotal[index] = this.FirstCostPrice[index] * this.FirstQuantity[index]
      var Total = 0
      for (var i = 0; i < this.FirstCostPrice.length; i++) {
        Total = Total + this.FirstCostPrice[i] * this.FirstQuantity[i]
      }
      this.testPurchase.TotalPrice = Total
      // alert(this.FirstCostPrice.length
      // this.TotalPrice=this.TotalPrice+this.FirstCostPrice[index]*this.FirstQuantity[index]
    },
    ProductToInformation (index) {
      var ProductID = this.PurchaseList.ProductID[index]
      axios.get('http://techlab.classy.pos/Api/V1/Products/Product/Details/' + ProductID)
        .then((response) => {
          this.PurchaseList.CostPrice[index] = response.data.CostPrice
          this.PurchaseList.SalePrice[index] = response.data.SalePrice
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    AddProductToCart () {
      this.message.push([])
      this.PurchaseList.row.push(2)
      this.PurchaseList.CostPrice.push(0)
      this.PurchaseList.SalePrice.push(0)
      this.PurchaseList.CategoryID.push(0)
      this.PurchaseList.ProductID.push(0)
      this.CategoryInformation.push(0)
      this.ProductInformation.push(0)
      this.FirstCostPrice.push('')
      this.FirstExpiryDate.push('')
      this.FirstSalePrice.push('')
      this.FirstQuantity.push('')
      this.FirstCustomID.push('')
      this.ProductDescription.push('')
      this.SubTotal.push('')
      this.ModelNumber.push('')
      this.Notes.push('')
      this.ProductList.push({ProductListForCategory: [ 0, 0, 0 ]})
    },
    DeleteProductFromCart (index) {
      this.PurchaseList.row.splice(index, 1)
      this.FirstCostPrice.splice(index + 1, 1)
      this.FirstSalePrice.splice(index + 1, 1)
      this.FirstExpiryDate.splice(index + 1, 1)
      this.FirstQuantity.splice(index + 1, 1)
      var Total = 0
      for (var i = 0; i < this.FirstCostPrice.length; i++) {
        Total = Total + this.FirstCostPrice[i] * this.FirstQuantity[i]
      }
      this.TotalPrice = Total
    },
    getProducts () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Product/Filter/0/0/0/0/0/0?page=${this.products.current_page}`)
        .then((response) => {
          this.products = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
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
      axios.get(`http://techlab.classy.pos/Api/V1/Contacts/Vendor/List?page=${this.products.current_page}`)
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
    setErrors (response) {
      this.errors = response.data.errors
    },
    setSuccessMessage () {
      this.reset()
    },
    reset () {
      this.$refs.detailsProductModal.hide()
      this.$refs.editProductModal.hide()
      this.errors = []
      this.productData = {
        CategoryID: null,
        VendorID: null,
        BrandID: null,
        TaxId: null,
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
