<template>
  <div class="row">
    <div class="col-md-12 row" style="margin-bottom:13px">
        <div class="input-group col-md-3">
          <input type="text" placeholder="Reference Number" class="form-control" v-model="testPurchase.ReferenceNo">
          <span class="input-group-addon"><button class="btn btn-primary">Ref.Number</button></span>
        </div>
        <div class="input-group col-md-3">
          <select id="vendor" v-model="testPurchase.VendorID" class="form-control">
                  <option :value="null" disabled>Select a Vendor</option>
                  <option
                    v-for="productVendor in productVendors.data"
                    :key="productVendor.id"
                    :value="productVendor.id">
                    {{ productVendor.CompanyName }}
                  </option>
          </select>
          <span class="input-group-addon"><button class="btn btn-primary">Vendor</button></span>
        </div>
        <div class="input-group col-md-3">
          <input type="date" placeholder="Delivary Date" class="form-control" v-model="testPurchase.DeliveryDate">
          <span class="input-group-addon"><button class="btn btn-primary">Deliv. Date</button></span>
        </div>
        <div class="input-group col-md-3">
          <input type="text" placeholder="Delivary Address" class="form-control" v-model="testPurchase.DeliveryAddress">
          <span class="input-group-addon"><button class="btn btn-primary">Address</button></span>
        </div>
    </div>
    <div class="col-md-12 row">
      <div class="col-md-3">
        <select v-model="CategoryInformation[0]" v-on:click="CategoryChange(0)" class="form-control">
          <option disabled value="">Please select one</option>
          <option
            v-for="productCategory in productCategories.data"
            :key="productCategory.id"
            :value="productCategory.id">
            {{ productCategory.Name }}
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <select class="form-control" v-model="ProductInformation[0]" v-on:click="ProductChange(0)">
          <option disabled value="0">Please select one</option>
          <option
                    v-for="FirstProductInformation in message[0]"
                    :key="FirstProductInformation.id"
                    :value="FirstProductInformation.id">
                    {{ FirstProductInformation.Name }}
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <input id="product-description"
                                  type="text"
                                  placeholder="Model Number"
                                  v-model="ModelNumber[0]" class="form-control">
      </div>
      <div class="col-md-3">
        <input id="product-name"
                                  type="text"
                                  placeholder="Description"
                                  v-model="ProductDescription[0]" class="form-control">
      </div>
    </div>
    <div class="col-md-12 row">
      <div class="col-md-2">
        <input id="product-name"
                                  type="text"
                                  placeholder="Custom ID"
                                  v-model="productData.Name" class="form-control">
      </div>
      <div class="col-md-2">
        <input id="product-name"
                                  type="number"
                                  placeholder="Quantity" min="0" v-on:click="TotalPriceCalculation(0)"
                                  v-model="FirstQuantity[0]" class="form-control">
      </div>
      <div class="col-md-2">
        <input id="product-name"
                                  type="number"
                                  min="0"
                                  placeholder="Cost Price"
                                  v-model="FirstCostPrice[0]" v-on:click="TotalPriceCalculation(0)" class="form-control">
      </div>
      <div class="col-md-2">
        <input id="product-description"
                                  type="number"
                                  placeholder="Sale Price"
                                  v-model="FirstSalePrice[0]" class="form-control">
      </div>
      <div class="input-group col-md-4">
        <input type="number" placeholder="SubTotal" v-model="SubTotal[0]" class="form-control" readonly>
        <span class="input-group-btn"><button class="btn btn-success" v-on:click="AddProductToCart()"><i class="fa fa-plus"></i></button></span>
      </div>
    </div>
    <div v-for="(Purchase,index) in PurchaseList.row">
      <div class="col-md-12 row">
        <div class="col-md-3">
          <select v-model="CategoryInformation[index + 1]" v-on:click="CategoryChange(index+1)" class="form-control">
            <option disabled value="">Please select one</option>
            <option
              v-for="productCategory in productCategories.data"
              :key="productCategory.id"
              :value="productCategory.id">
              {{ productCategory.Name }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <select class="form-control" v-model="ProductInformation[index + 1]" v-on:click="ProductChange(index+1)">
            <option disabled value="0">Please select one</option>
            <option
                      v-for="productBrand in message[index + 1]"
                      :key="productBrand.id"
                      :value="productBrand.id">
                      {{ productBrand.Name }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <input id="product-description"
                                    type="text"
                                    placeholder="Model Number"
                                    v-model="ModelNumber[index+1]" class="form-control">
        </div>
        <div class="col-md-3">
          <input id="product-name"
                                    type="text"
                                    placeholder="Description"
                                    v-model="ProductDescription[index+1]" class="form-control">
        </div>
    </div>
    <div class="col-md-12 row">
      <div class="col-md-2">
        <input id="product-name"
                                  type="text"
                                  placeholder="Custom ID"
                                  v-model="productData.Name" class="form-control">
      </div>
      <div class="col-md-2">
        <input id="product-name"
                                  type="number" min="0"
                                  placeholder="Quantity" v-on:click="TotalPriceCalculation(index+1)"
                                  v-model="FirstQuantity[index+1]" class="form-control">
      </div>
      <div class="col-md-2">
        <input id="product-name"
                                  type="number"
                                  placeholder="Cost Price"
                                  min="0"
                                  v-model="FirstCostPrice[index + 1]" v-on:click="TotalPriceCalculation(index+1)" class="form-control">
      </div>
      <div class="col-md-2">
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
      <div class="col-md-12 row" style="margin-top:13px">
        <div class="input-group col-md-2">
          <input type="text" placeholder="Total" class="form-control" v-model="TotalPrice" readonly>
          <span class="input-group-addon"><button class="btn btn-primary">Total</button></span>
        </div>
        <div class="input-group col-md-2">
          <input type="number" placeholder="Shipping Charge" class="form-control" v-model="testPurchase.ShippingCharge">
          <span class="input-group-addon"><button class="btn btn-primary">Shipping</button></span>
        </div>
        <div class="input-group col-md-2">
          <input type="number" placeholder="Tax" class="form-control" v-model="testPurchase.TaxCharge">
          <span class="input-group-addon"><button class="btn btn-primary">Tax</button></span>
        </div>
        <div class="input-group col-md-2">
          <input type="number" placeholder="Ohters Charge" class="form-control" v-model="testPurchase.OtherCharge">
          <span class="input-group-addon"><button class="btn btn-primary">Others</button></span>
        </div>
        <div class="input-group col-md-2">
          <input type="text" placeholder="Notes" class="form-control" v-model="testPurchase.Notes">
          <span class="input-group-addon"><button class="btn btn-primary">Notes</button></span>
        </div>
      </div>
      <div class="form-group" style="margin-top:20px;">
                <div class="col-sm-12">
                  <input type="button" name="submit" value="Purchase" class="btn btn-success btn-flat " id="PurchaseButton" v-on:click="PurchaseOrder">

                  <button id="ResetBtn" class="btn btn-flat btn-primary" type="button">Reset</button>

                  <a type="button" href="/Product" class="btn btn-flat btn-danger">Cancel</a>
                </div>
      </div>
      <p v-if="seen" style="font-size:0px;">
        {{TemporarySalePrice}}
        {{TemporaryCostPrice}}
      </p>
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
        VendorID: 1,
        ReferenceNo: 0,
        Notes: '',
        DeliveryAddress: '',
        DeliveryDate: '',
        TotalPrice: 0,
        SubTotalPrice: 0,
        TaxCharge: 0,
        OtherCharge: 0,
        ShippingCharge: 0,
        Products: []
      },
      seen: true,
      CategoryInformation: [0],
      ProductInformation: [0],
      TemporaryCostPrice: 0,
      TemporarySalePrice: 0,
      TotalPrice: 0,
      FirstCostPrice: [''],
      FirstSalePrice: [''],
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
      message: [[], []],
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
    AuthCheck () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === null || Token === '') {
        window.location = '/#/pages/login'
      }
    },
    PurchaseOrder () {
      this.testPurchase.SubTotalPrice = this.TotalPrice
      this.testPurchase.TotalPrice = parseInt(this.TotalPrice) + parseInt(this.testPurchase.ShippingCharge) + parseInt(this.testPurchase.TaxCharge) + parseInt(this.testPurchase.OtherCharge)
      for (var i = 0; i < this.FirstCostPrice.length; i++) {
        if (this.FirstQuantity[i] > 0) {
          this.testPurchase.Products.push([this.ProductInformation[i], this.ProductDescription[i], this.ModelNumber[i], this.FirstCostPrice[i], this.FirstQuantity[i]])
        }
      }
      this.PurchaseList.row = []
      this.FirstSalePrice[0] = 0
      this.FirstCostPrice[0] = 0
      this.FirstQuantity[0] = 0
      axios.post('http://techlab.classy.pos/Api/V1/Purchase/Order/New', this.testPurchase)
        .then((response) => {
          alert('Purchase Order Created')
          console.log(response.data)
          this.testPurchase.ReferenceNo = ''
          this.testPurchase.Notes = ''
          this.testPurchase.DeliveryAddress = ''
          this.testPurchase.DeliveryDate = ''
          this.testPurchase.TotalPrice = ''
          this.testPurchase.SubTotalPrice = ''
          this.testPurchase.TaxCharge = ''
          this.testPurchase.ShippingCharge = ''
          this.testPurchase.OtherCharge = ''
          // router.go('/Purchase')
          window.location = '/#/Purchase/'
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
      this.TotalPrice = Total
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
      this.FirstSalePrice.push('')
      this.FirstQuantity.push('')
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
      this.FirstQuantity.splice(index + 1, 1)
      var Total = 0
      for (var i = 0; i < this.FirstCostPrice.length; i++) {
        Total = Total + this.FirstCostPrice[i] * this.FirstQuantity[i]
      }
      this.TotalPrice = Total
    },
    getProducts () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Product/Filter/200/0/0/0/0/0?page=${this.products.current_page}`)
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
      axios.get(`http://techlab.classy.pos/Api/V1/Vendors/Vendor/List?page=${this.products.current_page}`)
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
