<template>
  <div class="row">
    <button class="btn btn-success" v-on:click="DeletefromLocal()">Delete</button>
    <div class="container">
      <div class="row" style="margin-bottom:3px">
        <div class="input-group col-md-3">
          <select v-model="CategoryInformation[0]" v-on:click="CategoryChange(0)" class="form-control">
            <option disabled value="0">Please select one</option>
            <option
              v-for="productCategory in productCategories.data"
              :key="productCategory.id"
              :value="productCategory.id">
              {{ productCategory.Name }}
            </option>
          </select>
          <span class="input-group-addon"><button class="btn btn-primary">Category Name</button></span>
        </div>
        <div class="input-group col-md-3">
          <select id="vendor" v-on:click="VendorChange()" v-model="VendorsID" class="form-control">
            <option value="0" disabled>Select a Vendor</option>
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
          <span class="input-group-addon"><button class="btn btn-primary">From Date</button></span>
        </div>
        <div class="input-group col-md-3">
          <input type="date" placeholder="Delivary Address" class="form-control" v-model="testPurchase.DeliveryAddress">
          <span class="input-group-addon"><button class="btn btn-primary">To Date</button></span>
        </div>
      </div>
      <div class="row" style="margin-bottom:12px;">
        <div class="input-group col-md-3">
          <select v-model="testPurchase.ShopID" class="form-control" v-on:click="DistributeEnable()">
            <option disabled value="null">Please select one</option>
            <option
              v-for="shop in shops.data"
              :key="shop.id"
              :value="shop.id">
              {{ shop.Name }}
            </option>
          </select>
          <span class="input-group-addon"><button class="btn btn-primary">Shop</button></span>
        </div>
        <div class="input-group col-md-3">
          <input type="text" v-model="BarCodeID" class="form-control" >
          <span class="input-group-addon"><button class="btn btn-primary" v-on:click="BarCodeSearch()">BarCode</button></span>
        </div>

      </div>
    </div>
    <div class="col-md-12 card">
    <div id="name">Fahad</div>
      <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th :key="column.id" v-for="column in table.columns">{{ column }}</th>
            </thead>
            <tbody>
              <tr :key="product.id" v-for="(product,index) in products.data" v-if="FirstQuantity[index]>0">
                <td><input type="checkbox" class="checkbox" v-on:click="CheckProduct(index)" v-model="ProductChecking[index]"></td>
                <td>{{ product.id }}</td>
                <td>{{ product.Name }}</td>
                <td>{{ product.created_at }}</td>
                <td>{{ product.VendorName }}</td>
                <td>{{ product.CostPrice }}</td>
                <td><input type="number" v-model="FirstQuantity[index]" class="form-control" style="background:transparent; border:0px"></td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <button :disabled="validated == 1" class="btn btn-success btn-lg form-control offset-md-4" v-on:click="BarCodeGeneration()">BarCode</button>
        </div>
      </div>
    </div>
     <b-modal
      id="BarCodeModal"
      ref="BarCodeModal"
      size="lg"
      title="BarCode"
    >
      <div class="barcode-modal-body">
        <div id="app">
          <div v-for="(barcode, index) in testPurchase.Products" :key="barcode.id">
            <div v-for="codes in BarCodeQty[index]" :key="codes.id">
              <barcode v-model="BarCodePrint[index]" style="float:left; " height="20px" fontSize="12" format="CODE128" tag="img"></barcode>
            </div>
          </div>
        </div>

        <!-- <b-form validated enctype="multipart/form-data">
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="addVendor">
              Add Vendor
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form> -->
      </div>
      <button class="btn btn-success btn-lg pull-bottom" v-on:click="PrintBarCode()">Print</button>

    </b-modal>
      <p v-if="seen" style="font-size:0px;">
        {{TemporarySalePrice}}
        {{TemporaryCostPrice}}
      </p>
      <!-- {{BarCodePrint}} -->
      {{employeeData}}
      <!-- {{products}} -->
    </div>
</template>
<script>
import axios from 'axios'
import VueBarcode from 'vue-barcode'
// import localforage from 'localforage'
const tableColumns = ['Select', 'ID', 'Product Name', 'Entry Date', 'Vendor Name', 'Cost Price', 'Quantity']
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}
export default {
  components: {
    'barcode': VueBarcode
  },
  data () {
    return {
      employeeData: [
        { id: '01', name: 'Gopal K Varma', age: 35, email: 'contact@tutorialspoint.com' },
        { id: '02', name: 'Prasad', age: 24, email: 'prasad@tutorialspoint.com' }
      ],
      testPurchase: {
        ContactID: 1,
        ShopID: null,
        FloorID: 1,
        TerminalID: 1,
        Status: 1,
        Products: []

      },
      BarCodeQty: [],
      BarCodePrint: [],
      TotalPrintableQuantity: 0,
      Alif: 110,
      BarCodeID: null,
      validated: 1,
      VendorsID: 0,
      seen: true,
      CategoryInformation: [0],
      ProductInformation: [0],
      TemporaryCostPrice: 0,
      TemporarySalePrice: 0,
      TotalPrice: 0,
      FirstCostPrice: [],
      FirstSalePrice: [],
      FirstQuantity: [],
      ProductChecking: [],
      FirstProductID: [],
      FirstProductName: [],
      ProductDescription: [],
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
    // this.getProducts()
    this.getProductCategories()
    this.getProductVendors()
    this.getProductBrands()
    this.AuthCheck()
    this.getShopList()
  },
  created () {
    // this.PurchaseReceiveList()
    var Token = localStorage.getItem('vue-authenticate.vueauth_token')
    axios.get(`http://techlab.classy.pos/Api/User/Permission/ProductDistribute?token=` + Token)
      .then((response) => {
        if (response.data === 'Empty Array') { window.history.back() } else {
          // this.PurchaseReceiveList()
          // this.AuthCheck()
          // this.PermissionCheck('PurchaseDetails')
          // this.PermissionCheck('PurchaseDelete')
          // this.PermissionCheck('NewPurchase')
        }
      })
      .catch(() => {
        localStorage.setItem('vue-authenticate.vueauth_token', '')
        window.location = '/#/pages/login'
      })
  },
  methods: {
    CheckProduct (index) {
      if (this.ProductChecking[index] === false) {
        this.ProductChecking[index] = true
      } else {
        this.ProductChecking[index] = false
      }
      this.validated = 1
      for (var i = 0; i < this.ProductChecking.length; i++) {
        if (this.ProductChecking[i] === true && this.testPurchase.ShopID > 0 && this.FirstQuantity[i] > 0) {
          this.validated = 0
          break
        }
      }
    },
    DistributeEnable () {
      for (var i = 0; i < this.ProductChecking.length; i++) {
        if (this.ProductChecking[i] === true) {
          this.validated = 0
          break
        }
      }
      // this.validated = 0
    },
    PrintBarCode () {
      var html = '<html>'
      html += document.getElementById('app').innerHTML
      html += '</html>'

      var printWin = window.open('', '', 'left=10, top=10,width=500, height=500,toolbar=0,scrollbars=0,status  =0')
      printWin.document.write(html)
      printWin.document.close()
      printWin.focus()
      printWin.print()
      printWin.close()
    },
    BarCodeGeneration () {
      this.BarCodeQty = []
      this.BarCodePrint = []
      this.TotalPrintableQuantity = 0
      for (var i = 0; i < this.FirstQuantity.length; i++) {
        if (this.FirstQuantity[i] > 0 && this.ProductChecking[i] === true) {
          // this.FirstProductID[i] = 15
          // alert(this.FirstQuantity[i])
          this.testPurchase.Products.push({'ProductLedgerID': this.FirstProductID[i], 'Qty': this.FirstQuantity[i]})
          this.TotalPrintableQuantity = parseInt(this.TotalPrintableQuantity) + parseInt(this.FirstQuantity[i])
          this.BarCodeQty.push(parseInt(this.FirstQuantity[i]))
          this.BarCodePrint.push(this.FirstProductID[i])
        }
      }
      // alert(this.testPurchase.Products[0].Qty)
      this.Alif = parseInt(this.testPurchase.Products[0].Qty)
      this.$refs.BarCodeModal.show()
    },
    AuthCheck () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === null || Token === '') {
        window.location = '/#/pages/login'
      }
    },
    BarCodeSearch () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Product/Ledger/` + this.BarCodeID)
        .then((response) => {
          this.FirstQuantity = []
          this.FirstProductID = []
          for (var i = 0; i < response.data.length; i++) {
            this.FirstQuantity.push(response.data[i].Qty)
            this.FirstProductID.push(response.data[i].id)
          }
          this.products = response
          // alert(this.product.data.data.length)
          console.log(response.data)
          // this.message[index].splice(0, this.message[index].length)
          // for (var i = 0; i < response.data.data.length; i++) {
          //   this.message[index].push(response.data.data[i])
        })
        .catch(() => {
          console.log('handle server error from here')
        })
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
          // alert('Purchase Order Created')
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
      // this.testPurchase.Products[index][4] = 412
    },
    VendorChange () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      var TokenChanged = Token.replace('Bearer ', '')
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Product/Filter/0/` + this.VendorsID + `/0/0/0/0?token=` + TokenChanged)
        .then((response) => {
          this.products = response.data
          console.log(response.data)
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    CategoryChange (index) {
      var CategoryID = this.CategoryInformation[index]
      // var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      // var TokenChanged = Token.replace('Bearer ', '')
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Product/Ledger/` + CategoryID + `/0/0/0`)
        .then((response) => {
          this.FirstQuantity = []
          this.FirstProductID = []
          for (var i = 0; i < response.data.data.length; i++) {
            this.FirstQuantity.push(response.data.data[i].Qty)
            this.FirstProductID.push(response.data.data[i].id)
            this.FirstProductName.push(response.data.data[i].Name)
            this.ProductChecking.push(false)
          }
          this.products = response.data
          // alert(this.product.data.data.length)
          console.log(response.data)
          // this.message[index].splice(0, this.message[index].length)
          // for (var i = 0; i < response.data.data.length; i++) {
          //   this.message[index].push(response.data.data[i])
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
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Product/Filter/0/0/0/0/0/0?page=${this.products.current_page}`)
        .then((response) => {
          this.FirstQuantity = []
          for (var i = 0; i < response.data.data.length; i++) {
            this.FirstQuantity.push(response.data.data[i].Qty)
            this.ProductChecking.push(false)
            this.FirstProductID.push(response.data.data[i].id)
          }
          this.products = response.data
          console.log(response.data.data)
          console.log(this.products)
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
    getShopList () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Shop/List?page=${this.products.current_page}`)
        .then((response) => {
          this.shops = response.data
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
        ShopID: null,
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
  .checkbox {
    width:18px;
    height:18px;
  }
  .subtitle {
    margin-bottom: 20px;
  }
</style>
