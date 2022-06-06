<template>
  <div class="row">
    <div class="header col-md-12" style="margin-bottom:5px;">
      <button @click.prevent="invoiceList" type="button" class="btn btn-wd btn-success pull-right" style="margin-left:5px;">
        Invoice List <i class="fa fa-plus"></i>
      </button>
    </div>

    <b-modal
      id="invoice-list-modal"
      ref="invoiceListModal"
      size="lg"
      title="Invoice List"
      centered
      hide-footer
    >
      <div class="product-info">
        <h4>Invoices</h4>
        <table class="table table-striped">
          <thead>
          <th :key="column.id" v-for="column in table.columns">{{ column }}</th>
          </thead>
          <tbody>
          <tr v-for="(invoice, index) in invoices.data" :key="invoice.id">
            <td>{{ invoice.id }}</td>
            <td>{{ invoice.ContactID }}</td>
            <td v-if="invoice.Status === 1"><b-badge variant="success">Paid</b-badge></td>
            <td v-else><b-badge variant="secondary">Unpaid</b-badge></td>
            <td>
              <b-btn @click.prevent="" class="btn-success">
                <i class="fa fa-info"></i>
              </b-btn>
              <b-btn @click.prevent="" class="btn-success">
                <i class="fa fa-edit"></i>
              </b-btn>
              <b-btn @click.prevent="deleteProduct(invoice, index)" class="btn-danger">
                <i class="fa fa-trash"></i>
              </b-btn>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
    <div class="col-md-6 sales-panel-left-column">
      <div class="row">
        <div class="col-md-12 product-search">
          <b-input-group
            class="sales-search-input"
            prepend="Product: "
            :horizontal="true">
            <b-form-input type="text"
            placeholder="Enter Product ID">
            </b-form-input>
          </b-input-group>
        </div>
      </div>
      <div class="container">
        <div v-for="(cart,index) in Cart.row" :key="cart.id">
          <a v-b-toggle="'collapse' + index">
          <div class="row" style="margin-top:10px; background:#f0f0f0">
            <div class="col-md-1"><button class="btn btn-success">{{ProductQuantity[index]}}</button></div>
            
            <div class="col-md-4"><button class="btn btn-success">{{ProductName[index]}}</button></div>
            <div class="col-md-3"><button class="btn btn-warning" style="margin-right:15px;">{{ ProductID[index]}}S1</button></div>
            <div class="col-md-3"><button class="btn btn-primary">{{CostPrice[index] * ProductQuantity[index]}}</button></div>
            <div class="col-md-1"><button class="btn btn-warning" v-on:click="DeleteProduct(index)"><i class="fa fa-trash"></i></button></div>
          </div>
          </a>
          <b-collapse :id="'collapse' + index">
          <div class="row" style="margin-top:10px; background:#f0f0f0">
            <div class="col-md-4"><button class="btn btn-success">{{Discount[index]}}</button></div>
            <!-- <div class="col-md-4"><button class="btn btn-success">{{ProductName[index]}}</button></div> -->
            <div class="col-md-3"><button class="btn btn-warning" style="margin-right:15px;">{{ ProductID[index]}}S1</button></div>
            <div class="col-md-3"><button class="btn btn-primary">{{CostPrice[index] * ProductQuantity[index]}}</button></div>
            <div class="col-md-1"><button class="btn btn-warning" v-on:click="DeleteProduct(index)"><i class="fa fa-trash"></i></button></div>
          </div>
          </b-collapse>
        </div>
        <div style="background:#ffffff" class="container">
          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"><strong>Total Item</strong></div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><strong><span id="InvoiceTotalItem">{{TotalItem}}</span></strong></div>

            <div class="col-xs-4 col-sm-4 col-lg-4 col-md-4"><strong>Sub Total</strong></div>
            <div class="col-xs-2 col-sm-2 col-lg-2 col-md-2"><strong><span id="SubTotal">{{TotalSubTotal}}</span></strong></div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"><strong>Total Qty</strong></div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><strong><span id="InvoiceTotalQty">{{TotalQuantity}}</span></strong></div>

            <div class="col-xs-4 col-sm-4 col-lg-4 col-md-4"><strong>Tax</strong></div>
            <div class="col-xs-2 col-sm-2 col-lg-2 col-md-2"><strong><span id="VatTotal">{{TotalTax}}</span></strong></div>
          </div>
          <div class="row">
            <div class="col-xs-4 col-sm-4 col-lg-4 col-md-4"><strong>Table No.</strong></div>
            <div class="col-xs-2 col-sm-2 col-lg-2 col-md-2"><strong><span id="BottomTableID">0</span></strong></div>

            <div class="col-xs-4 col-sm-4 col-lg-4 col-md-4"><strong>Discount</strong></div>
            <div class="col-xs-2 col-sm-2 col-lg-2 col-md-2"><strong><span id="DiscountTotal">{{TotalDiscount}}</span></strong></div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"><strong>Order ID</strong></div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><strong><span id="BottomOrderID">0</span></strong></div>

            <div class="col-xs-3 col-sm-4 col-lg-4 col-md-4"><strong>Service Charge</strong></div>
            <div class="col-xs-2 col-sm-2 col-lg-2 col-md-2"><strong><span id="ServiceCharge">0</span></strong></div>
          </div>
          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"><strong>Invoice ID</strong></div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><strong><span id="BottomInvoiceID">0</span></strong></div>
            <div class="col-xs-4 col-sm-4 col-lg-4 col-md-4"><strong>Net Total</strong></div>
            <div class="col-xs-2 col-sm-2 col-lg-2 col-md-2"><strong><span id="Total">{{NetTotal}}</span></strong></div>
          </div>

          <div class="row">
            <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" > -->
              <div class="col-xs-3 col-md-3" style="padding:0px 5px 0px 0px;">
                <button class="btn bg-red  btn-block" id="Cancel" v-on:click="Cancel()" :disabled="ClearButtonCheck==false">Clear</button>
              </div>
              <!-- @if(Cookie::get('IsDiscount')==1 && Cookie::get('IsFixedDiscount')==0) -->
              <div class="col-xs-3 col-md-3" style="padding:0px 5px 0px 0px;">
                <button class="btn bg-blue btn-block disabled" :disabled="DiscountButtonCheck==false" id="DiscountOverAll" v-on:click="DiscountOverAll()" >Discount</button>
              </div>
              <!-- @endif -->
              <!-- @if(Cookie::get('IsTax')==1 && Cookie::get('IsFixedTax')==0) -->
              <div class="col-xs-3 col-md-3" style="padding:0px 5px 0px 0px;">
                  <a class="btn bg-yellow btn-block disabled" id="TaxOverall" >VAT</a>
              </div>
              <!-- @endif  -->
              <div class="col-xs-3 col-md-3" style="padding:0px 0px 0px 0px;">
                <a class="btn bg-purple btn-block disabled " id="PrintInvoice">Print Bill</a>
              </div>
            <!-- </div> -->
          </div>

          <div class="row" style="margin-top: 5px;">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <button class="btn bg-red  btn-block btn-lg" id="tender" style="width:106%; margin-left:-15px;" v-on:click="TenderSubmit()" :disabled="PaymentButtonCheck==false"> <i class="fa fa-chevron-circle-right"></i><br><strong>Pay</strong></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 sales-panel-right-column">
      <div class="row">
        <div class="col-md-12 category-search">
          <b-input-group
            class="sales-search-input"
            prepend="Category: "
            :horizontal="true">
            <b-form-input type="text"
                          placeholder="Enter Category Name">
            </b-form-input>
          </b-input-group>
        </div>
      </div>
      <div class="row product-categories">
        <div class="col-md-3 col-sm-6 product-category" v-for="(category) in productCategories.data" :key="category.id">
          <div class="card btn text-center category-body">
              <div class="card-body">
                <div class="h4 mb-0" v-on:click="CategoryFilter(category.id)">{{ category.Name }}</div>
              </div>
          </div>
        </div>
      </div>
      <div class="row products-panel">
        <div class="col-md-3 col-sm-6 product" v-for="product in products.data" :key="product.id">
          <div class="card btn text-center product-body ProductList">
            <div class="card-body">
              <div class="h4 mb-0" v-on:click="ProductAdd(product.id)">{{ product.Name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ProductQuantity}} -->
    <div v-if="Seen" style="font-size:0px;">
      {{TempQuantity}}
      {{TotalItem}}
      {{TotalSubTotal}}
      {{TotalServiceCharge}}
      {{TotalDiscount}}
      {{NetTotal}}
      {{Discount}}
    </div>
    {{Discount}}
    <!-- {{products.data[0]}} -->
    <!-- {{ProductName}} -->
    <!-- {{CostPrice}} -->
     <b-modal
      id="add-category-modal"
      ref="addCategoryModal"
      title="OverAll Discount"
      centered
      size="sm"
      hide-footer
    >

      <div class="add-category-modal-body">
        <b-form validated>
          <div class="form-group">
            <label class="label label-primary">Cash Discount :</label>
            <input type="number" name="dispaid" id="disca" class="form-control" placeholder="Enter Discount By Cash" value="0" autocomplete="off" v-model="OverAllDiscountCash" v-on:keyup="DiscountEnableDisable()">
          </div>
          <div class="form-group">
            <label class="label label-success">% Discount:</label>
            <input type="number" name="returned" id="allpercent" v-model="OverAllDiscountPercentage" class="form-control" placeholder="Enter Percentage of Discount" value="0" autocomplete="off" step=".0001"   autofocus>
            <input type="hidden" name="didi" value="0" id="idid" >
          </div>
          <button type="button" class="btn bg-purple   btn-lg btn-block" id="alldiscount" v-on:click="OverAllDiscountSubmit()"><strong>Apply Discount</strong></button>
        </b-form>
      </div>

    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
const tableColumns = ['id', 'Customer Name', 'Status', 'Action']
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}
export default {
  name: 'SalesPanel',
  data () {
    return {
      table: {
        title: 'Invoices',
        subTitle: 'Recently added created invoices.',
        columns: [...tableColumns]
      },
      Seen: true,
      TempQuantity: 0,
      ProductName: [],
      ProductID: [],
      CostPrice: [],
      Discount: [],
      TotalItem: 0,
      validated: 0,
      SomeDiscount: true,
      TotalQuantity: 0,
      TotalSubTotal: 0,
      NetTotal: 0,
      DiscountButtonCheck: false,
      PaymentButtonCheck: false,
      ClearButtonCheck: false,
      TotalTax: 0,
      TotalServiceCharge: 0,
      TotalDiscount: 0,
      OverAllDiscountPercentage: 0,
      OverAllDiscountCash: 0,
      ProductQuantity: [],
      productInCategory: null,
      invoices: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      products: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        CategoryID: null,
        VendorID: null,
        BrandID: null,
        Name: null,
        Description: null
      },
      SaleList: {
        ShopID: 1,
        FloorID: 1,
        TerminalID: 1,
        UserID: 1,
        KOTID: null,
        OrderID: null,
        AdvanceID: null,
        ContactID: 60,
        TotalCost: 0,
        SubTotal: 0,
        TaxTotal: 0,
        ServiceCharge: 0,
        Discount: 13,
        Total: 0,
        PaidMoney: 0,
        ReturnMoney: 0,
        IsVoid: 0,
        IsRefunded: 0,
        IsPaid: 1,
        IsApproved: 1,
        Status: 1,
        Products: []

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
      productBrands: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      Cart: {
        row: []
      },
      offset: 4
    }
  },
  mounted () {
    this.getProducts()
    this.getProductCategories()
    this.getProductVendors()
    this.getProductBrands()
  },
  methods: {
    DiscountEnableDisable () {
      var DiscoutCashValue = this.OverAllDiscountCash / this.TotalSubTotal*100
      this.OverAllDiscountPercentage = DiscoutCashValue

    },
    DiscountOverAll () {
      // alert('Atik Hasan')
      this.$refs.addCategoryModal.show()
    },
    OverAllDiscountSubmit () {
      // alert('Something Will be Done')
      this.TotalDiscount = this.OverAllDiscountPercentage * this.TotalSubTotal / 100
      for (var i = 0;i < this.ProductID.length;i++) {
       this.Discount[i] = this.ProductQuantity[i] * this.CostPrice[i] * this.OverAllDiscountPercentage / 100
        // alert(this.Discount[0])
      }
      this.TotalPriceCalculation()
      this.$refs.addCategoryModal.hide()
    },
    Cancel () {
      this.CostPrice.splice(0, this.CostPrice.length)
      this.ProductName.splice(0, this.ProductName.length)
      this.ProductID.splice(0, this.ProductID.length)
      this.ProductQuantity.splice(0, this.ProductQuantity.length)
      this.Discount.splice(0, this.Discount.length)
      this.TotalItem = 0
      this.TotalQuantity = 0
      this.Cart.row = []
      this.TotalSubTotal = 0
      this.TotalDiscount = 0
      this.NetTotal = 0
      this.DiscountButtonCheck = false
      this.ClearButtonCheck = false
      this.PaymentButtonCheck = false
      // this.TotalDiscount = 0
      // this.NetTotal = 0
    },
    DeleteProduct (index) {
      //  alert(index)
      this.TotalItem--
      this.TotalQuantity = this.TotalQuantity - this.ProductQuantity[index]
      this.Cart.row.splice(index, 1)
      this.CostPrice.splice(index, 1)
      this.Discount.splice(index, 1)
      this.ProductName.splice(index, 1)
      this.ProductID.splice(index, 1)
      this.ProductQuantity.splice(index, 1)
      this.TotalPriceCalculation()
      // this.Quantity.splice(index, 1)
      // alert(this.TotalItem)
      if (this.TotalItem === 0) {
        this.DiscountButtonCheck = false
        this.ClearButtonCheck = false
        this.PaymentButtonCheck = false
        this.TotalDiscount = 0
        this.NetTotal = 0
      }
    },
    TenderSubmit () {
      // alert('Submit')
      // var TotalTenderedValue = this.TotalSubTotal
      for (var i = 0; i < this.ProductID.length; i++) {
        this.SaleList.Products.push({'ProductID': this.ProductID[i], 'ProductName': this.ProductName[i], 'CostPrice': this.CostPrice[i], 'SalePrice': this.CostPrice[i], 'Qty': this.ProductQuantity[i], 'TaxTotal': 0, 'Discount': 0, 'TotalPrice': this.CostPrice[i] * this.ProductQuantity[i], 'ProductLedgerID': 14, 'ShopID': 1})
      }
      axios.post('http://techlab.classy.pos/Api/V1/Sales/Sale/New', this.SaleList)
        .then((response) => {
          console.log(response.data)
          this.Cancel()
          // router.go('/Purchase')
          // window.location = '/#/Purchase/'
          // this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    CategoryFilter (CategoryID) {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      // alert(Token)
      var TokenChanged = Token.replace('Bearer ', '')
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Product/Filter/` + CategoryID + `/0/0/0/0/0?token=` + TokenChanged)
        .then((response) => {
          this.products = response.data
          console.log(response.data.data)
          // this.message[index].splice(0, this.message[index].length)
          // for (var i = 0; i < response.data.data.length; i++) {
          //   this.message[index].push(response.data.data[i])
          // }
        })
        .catch(() => {
          console.log('handle server error from here')
        })
      // alert(index)
      // this.productInCategory = this.products.data.filter(obj => {
      //   return obj.ProductID === index
      // })
      // console.log(this.productInCategory)
    },
    ProductAdd (ProductID) {
      // alert("length" +this.ProductID.length)
      for (var i = 0; i < this.ProductID.length; i++) {
        if (ProductID === this.ProductID[i]) {
          this.TempQuantity++
          this.ProductQuantity[i]++
          this.TotalQuantity++
          this.TotalPriceCalculation()
          return
        }
      }
      axios.get('http://techlab.classy.pos/Api/V1/Products/Product/Details/' + ProductID)
        .then((response) => {
          // this.SomeDiscount.disabled = false
          // alert(response.data.CostPrice)
          this.DiscountButtonCheck = true
          this.ClearButtonCheck = true
          this.PaymentButtonCheck = true
          this.Cart.row.push(0)
          this.ProductName.push(response.data.Name)
          this.ProductQuantity.push(1)
          this.Discount.push(0)
          this.CostPrice.push(response.data.CostPrice)
          this.ProductID.push(response.data.id)
          this.TotalQuantity++
          this.TotalItem++
          this.TotalPriceCalculation()
          // this.PurchaseList.CostPrice[index] = response.data.CostPrice
          // this.PurchaseList.SalePrice[index] = response.data.SalePrice
        })
        .catch(() => {
          console.log('handle server error from here')
        })
      // alert(ProductID)
    },
    // getProductByCategoryID (id) {
    //   this.productInCategory = this.products.data.filter(obj => {
    //     return obj.ProductID === id
    //   })
    //   console.log(this.productInCategory)
    // },
    TotalPriceCalculation () {
      var Total = 0
      for (var i = 0; i < this.ProductID.length; i++) {
        Total = Total + this.ProductQuantity[i] * this.CostPrice[i]
      }
      this.TotalSubTotal = Total
      this.NetTotal = this.TotalSubTotal - this.TotalDiscount
    },
    getProducts () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Product/List?page=${this.products.current_page}`)
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
          console.log(this.productCategories)
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
    invoiceList () {
      axios.get(`http://techlab.classy.pos/Api/V1/Sales/Invoice/List?page=${this.invoices.current_page}`)
        .then((response) => {
          this.invoices = response.data
        })
        .catch((errors) => {
          console.log('Errors: ' + errors)
        })
      this.$refs.invoiceListModal.show()
    }
  }
}
</script>

<style scoped>
  .sales-panel-left-column, .sales-panel-right-column {
    border: 1px solid rgba(222, 222, 222, 0.31);
    background-color: #ffffff;
  }
  .sales-search-input{
    height: 50px;
  }
  .product-search, .category-search {
    padding: 0;
  }
  .product-categories {
    background: #2b2b2b;
    padding: 5px;
  }
  .products-panel {
    background: #f0f3f5;
    padding: 5px;
  }
  .btn:disabled {
    cursor: not-allowed
  }
  .product-category {
    padding-right: 5px;
    padding-left: 5px;
  }
  .category-body {
    background-color: #fc0;
    margin-bottom: 0;
    border-radius: 5px;
    font-weight: 900;
    font-size: 0.75em;
    padding: 0.5em 1em;
    text-shadow: none;
    text-transform: uppercase;
    transition: all 0.25s;
    /*white-space: normal;*/
  }
  .category-body:hover {
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1);
    background-color: #252525;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    color: #f90;
  }
  .category-body:active {
    background-color: #fc0;
    color: #222;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 5px rgba(0,0,0,0.5);
    text-shadow: 0 1px 0 rgba(255,255,255,0.3);
  }
  .ProductList
  {
    /*white-space: normal;*/
  }
</style>
