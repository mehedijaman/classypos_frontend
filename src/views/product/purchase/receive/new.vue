<template>
  <div class="row">
    <div class="container">
      <div class="row" style="margin-bottom:13px">
        <div class="input-group col-md-3">
          <input type="text" placeholder="Order ID" class="form-control" v-model="testPurchase.PurchaseOrderID">
          <span class="input-group-addon"><button class="btn btn-primary" v-on:click="LoadOrder()">Load Order</button></span>
        </div>
        <div class="input-group col-md-3">
          <select id="vendor" v-model="testPurchase.ContactID" class="form-control" v-on:click="PurchaseEnabled()">
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
          <input type="text" placeholder="Delivary Address" class="form-control" v-model="testPurchase.DeliveryAddress">
          <span class="input-group-addon"><button class="btn btn-primary">Address</button></span>
        </div>
        <div class="input-group col-md-3">
          <input type="text" placeholder="BarCode ID" class="form-control" v-model="BarCodeValue">
          <span class="input-group-addon"><button class="btn btn-primary" v-on:click="BarCodeProductAddition()">BarCode</button></span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <select v-model="CategoryInformation[0]" v-on:click="CategoryChange(0)" class="form-control">
            <option disabled value="0">Please select A Category</option>
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
        <div class="col-md-2">
          <input id="product-description"
                                  type="text"
                                  placeholder="Model Number"
                                  v-model="ModelNumber[0]" class="form-control">
        </div>
        <div class="col-md-2">
          <input id="product-name"
                                  type="text"
                                  placeholder="Custom ID"
                                  v-model="FirstCustomID[0]" class="form-control">
        </div>
        <div class="col-md-2">
          <!-- <input id="product-name"
                                  type="text"
                                  placeholder="Description"
                                  v-model="ProductDescription[0]" class="form-control"> -->
          <b-btn v-b-toggle="'collapse' + 1000" variant="primary">Additional Information</b-btn>
          <!-- <b-collapse id="collapse1" class="mt-2">
            <b-card>
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <button class="form-control">Add Something</button>
                </div>
              </div>
            </div>
              <p class="card-text">Collapse contents Here</p>
              <b-btn v-b-toggle.collapse1_inner size="lg">Toggle Inner Collapse</b-btn>
              <b-collapse id=collapse1_inner class="mt-2">
                <b-card>Hello!</b-card>
              </b-collapse>
            </b-card>
          </b-collapse> -->
        </div>
      </div>
      <!-- <div class="row">
        <b-collapse id="collapse1">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <button class="form-control">Add Something</button>
              </div>
              <div class="col-md-12">
                <button class="form-control">Add Something</button>
              </div>
            </div>
          </div>
        </b-collapse>
      </div> -->
      <b-collapse :id="'collapse' + 1000">
        <div class="row">
          <div class="col-md-3">
            <input id="product-name"
                                    type="text"
                                    placeholder="WareHouse" min="0"
                                    v-model="WareHouseID[0]" class="form-control">
          </div>
          <div class="input-group col-md-3">
            <input id="product-name"
                                    type="text"
                                    min="0"
                                    placeholder="Rack"
                                    v-model="RackID[0]" class="form-control">
            <!-- <span class="input-group-btn"><button class="btn btn-warning">Expiry Date</button></span> -->

          </div>
          <div class="col-md-2">
            <input id="product-name"
                                    type="color"
                                    min="0"
                                    placeholder="Color"
                                    v-model="ColorCode[0]" class="form-control">
          </div>
          <div class="col-md-2">
            <input id="product-description"
                                    type="text"
                                    placeholder="Description"
                                    v-model="ProductDescription[0]" class="form-control">
          </div>
          <div class="col-md-2">
            <input type="text" placeholder="BarCode" v-model="BarCodeID[0]" class="form-control">
            <!-- <span class="input-group-btn"><button class="btn btn-success" v-on:click="AddProductToCart()"><i class="fa fa-plus"></i></button></span> -->
          </div>
        </div>
      </b-collapse>
      <div class="row">
        <div class="col-md-3">
          <input id="product-name"
                                  type="number"
                                  placeholder="Quantity" min="0" v-on:click="TotalCalculation(0)"
                                  v-model="FirstQuantity[0]" class="form-control">
        </div>
        <div class="input-group col-md-3">
          <input id="product-name"
                                  type="date"
                                  min="0"
                                  placeholder="Expiry date"
                                  v-model="FirstExpiryDate[0]" class="form-control">
          <span class="input-group-btn"><button class="btn btn-warning">Expiry Date</button></span>

        </div>
        <div class="col-md-2">
          <input id="product-name"
                                  type="number"
                                  min="0"
                                  placeholder="Cost Price"
                                  v-model="FirstCostPrice[0]" v-on:click="TotalCalculation(0)" class="form-control">
        </div>
        <div class="col-md-2">
          <input id="product-description"
                                  type="number"
                                  placeholder="Sale Price"
                                  v-model="FirstSalePrice[0]" class="form-control">
        </div>
        <div class="input-group col-md-2">
          <input type="number" placeholder="SubTotal" v-model="SubTotal[0]" class="form-control" readonly>
          <span class="input-group-btn"><button class="btn btn-success" v-on:click="AddProductToCart()"><i class="fa fa-plus"></i></button></span>
        </div>
      </div>
      <!-- </b-collapse> -->
    </div>
    <div class="container">
      <div v-for="(Purchase,index) in PurchaseList.row" :key="Purchase.id">
        <div class="row">
          <div class="col-md-3">
            <select v-model="CategoryInformation[index + 1]" v-on:click="CategoryChange(index+1)" class="form-control">
              <option disabled value="0">Please select a Category</option>
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
                      :selected="true"
                      :value="productBrand.id">
                      {{ productBrand.Name }}
              </option>
            </select>
          </div>
          <div class="col-md-2">
            <input id="product-description"
                                    type="text"
                                    placeholder="Model Number"
                                    v-model="ModelNumber[index+1]" class="form-control">
          </div>
          <div class="col-md-2">
          <input id="product-name"
                                  type="text"
                                  placeholder="Custom ID"
                                  v-model="FirstCustomID[index+1]" class="form-control">
        </div>
          <div class="col-md-2">
            <b-btn v-b-toggle="'collapse' + index" variant="primary">Additional Information</b-btn>
            <!-- <input id="product-name"
                                    type="text"
                                    placeholder="Description"
                                    v-model="ProductDescription[index+1]" class="form-control"> -->
          </div>
        </div>
        <b-collapse :id="'collapse' + index">
        <div class="row">
          <div class="col-md-3">
            <input id="product-name"
                                    type="number" min="0"
                                    placeholder="WareHouse"
                                    v-model="WareHouseID[index+1]" class="form-control">
          </div>
          <div class="col-md-3">
            <input id="product-name"
                                    type="date"
                                    min="0"
                                    placeholder="Rack"
                                    v-model="RackID[index+1]" class="form-control">
          </div>
          <div class="col-md-2">
            <input id="product-name"
                                    type="color"
                                    placeholder="Color"
                                    min="0"
                                    v-model="ColorCode[index + 1]" class="form-control">
          </div>
          <div class="col-md-2">
            <input id="product-description"
                                    type="text"
                                    placeholder="Product Description"
                                    v-model="ProductDescription[index + 1]" class="form-control">
          </div>
          <div class="col-md-2">
            <input type="text" placeholder="BarCode" v-model="BarCodeID[index+1]" class="form-control">
          </div>
        </div>
        </b-collapse>
        <div class="row">
          <div class="col-md-3">
            <input id="product-name"
                                    type="number" min="0"
                                    placeholder="Quantity" v-on:click="TotalCalculation(index+1)"
                                    v-model="FirstQuantity[index+1]" class="form-control">
          </div>
          <div class="input-group col-md-3">
            <input id="product-name"
                                    type="date"
                                    min="0"
                                    placeholder="Expiry date"
                                    v-model="FirstExpiryDate[index+1]" class="form-control">
            <span class="input-group-btn"><button class="btn btn-warning">Expiry Date</button></span>
          </div>
          <div class="col-md-2">
            <input id="product-name"
                                    type="number"
                                    placeholder="Cost Price"
                                    min="0"
                                    v-model="FirstCostPrice[index + 1]" v-on:click="TotalCalculation(index+1)" class="form-control">
          </div>
          <div class="col-md-2">
            <input id="product-description"
                                    type="number"
                                    placeholder="Sale Price"
                                    v-model="FirstSalePrice[index + 1]" class="form-control">
          </div>
          <div class="input-group col-md-2">
            <input type="number" placeholder="SubTotal" v-model="SubTotal[index+1]" class="form-control" readonly>
            <span class="input-group-btn"><button class="btn btn-danger" v-on:click="DeleteProductFromCart(index)"><i class="fa fa-minus"></i></button></span>
          </div>
        </div>
      </div>
    </div>
      <div class="col-md-12 row" style="margin-top:13px">
        <div class="input-group col-md-2">
          <input type="text" placeholder="Total" class="form-control" v-model="testPurchase.Total" readonly>
          <span class="input-group-addon"><button class="btn btn-primary">Total</button></span>
        </div>
        <div class="input-group col-md-2">
          <input type="number" placeholder="Shipping Charge" class="form-control" v-model="testPurchase.ShippingCharge" v-on:click="TotalCalculation()">
          <span class="input-group-addon"><button class="btn btn-primary">Shipping</button></span>
        </div>
        <div class="input-group col-md-2">
          <input type="number" placeholder="Tax" class="form-control" v-model="testPurchase.TaxCharge" v-on:click="TotalCalculation()">
          <span class="input-group-addon"><button class="btn btn-primary">Tax</button></span>
        </div>
        <div class="input-group col-md-2">
          <input type="number" placeholder="Ohters Charge" class="form-control" v-model="testPurchase.OtherCharge" v-on:click="TotalCalculation()">
          <span class="input-group-addon"><button class="btn btn-primary">Others</button></span>
        </div>
        <div class="input-group col-md-2">
          <input type="number" placeholder="Batch Number" class="form-control" v-model="testPurchase.BatchNumber">
          <span class="input-group-addon"><button class="btn btn-primary">Batch</button></span>
        </div>
        <div class="input-group col-md-2">
          <input type="text" placeholder="Memo" class="form-control" v-model="testPurchase.Notes">
          <span class="input-group-addon"><button class="btn btn-primary">Memo</button></span>
        </div>
      </div>
      <div class="col-md-12 row" style="margin-top:13px">
        <div class="input-group col-md-3">
          <input type="text" placeholder="Total" class="form-control" v-model="testPurchase.Payable" readonly>
          <span class="input-group-addon"><button class="btn btn-primary">Payable</button></span>
        </div>
        <div class="input-group col-md-3">
          <input type="number" placeholder="Paid" class="form-control" v-model="testPurchase.Paid" v-on:click="PaymentOption()">
          <span class="input-group-addon"><button class="btn btn-primary">Cash</button></span>
        </div>
        <div class="input-group col-md-3">
          <input type="number" placeholder="Due" class="form-control" v-model="testPurchase.Due" readonly>
          <span class="input-group-addon"><button class="btn btn-primary">Due</button></span>
        </div>
       <!--  <div class="input-group col-md-2">
          <input type="number" placeholder="Ohters Charge" class="form-control" v-model="testPurchase.OtherCharge">
          <span class="input-group-addon"><button class="btn btn-primary">Others</button></span>
        </div>
        <div class="input-group col-md-2">
          <input type="number" placeholder="Batch Number" class="form-control" v-model="testPurchase.BatchNumber">
          <span class="input-group-addon"><button class="btn btn-primary">Batch</button></span>
        </div> -->
        <div class="col-md-3">
          <select class="form-control" v-model="testPurchase.IsBank">
          <!-- <span class="input-group-addon"><button class="btn btn-primary">Memo</button></span> -->
          <option value="0">Cash</option>
          <option value="1">Bank</option>
          </select>
        </div>
      </div>
      <div class="col-md-12 row" style="margin-top:13px" v-if="testPurchase.IsBank==1">
        <div class="input-group col-md-3">
          <select class="form-control" v-model="testPurchase.BankID">
            <option
              v-for="Bank in banks.data"
              :key="Bank.BankID"
              :value="Bank.BankID">
              {{ Bank.Name }}
            </option>
          </select>
          <span class="input-group-addon"><button class="btn btn-primary">Bank</button></span>
        </div>
        <div class="input-group col-md-3">
          <input type="number" placeholder="Cheque Number" class="form-control" v-model="testPurchase.ChequeNumber">
          <span class="input-group-addon"><button class="btn btn-primary">Cheque</button></span>
        </div>
        <div class="input-group col-md-3">
          <input type="number" placeholder="B.Amount" class="form-control" v-model="testPurchase.BankAmount" v-on:click="PaymentOption()">
          <span class="input-group-addon"><button class="btn btn-primary">B.Amount</button></span>
        </div>
       <!--  <div class="col-md-2">
          <select class="form-control" v-model="testPurchase.IsBank">
          <span class="input-group-addon"><button class="btn btn-primary">Memo</button></span>
          <option value="0">Cash</option>
          <option value="1">Bank</option>
          </select>
        </div> -->
      </div>
      <div class="form-group" style="margin-top:20px;">
        <div class="col-sm-12">
          <input type="button" name="submit" value="Purchase" class="btn btn-success btn-flat " id="PurchaseButton" v-on:click="PurchaseOrder" :disabled="validated == 0">

          <button id="ResetBtn" class="btn btn-flat btn-primary" type="button">Reset</button>

          <a type="button" href="/Product" class="btn btn-flat btn-danger">Cancel</a>
        </div>
      </div>
      <p v-if="seen" style="font-size:0px;">
        {{TemporarySalePrice}}
        {{TemporaryCostPrice}}
      </p>
      <!-- {{testPurchase.BankID}} -->
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
        ContactID: null,
        PurchaseOrderID: 0,
        Notes: '',
        BatchNumber: 0,
        DeliveryAddress: '',
        DeliveryDate: '',
        Total: 0,
        SubTotal: 0,
        TaxCharge: 0,
        OtherCharge: 0,
        ShippingCharge: 0,
        IsBank: 0,
        IsCash: 0,
        BankID: 0,
        ChequeNumber: null,
        BankAmount: 0,
        Payable: 0,
        Paid: 0,
        Due: 0,
        Payment: [],
        ReceivedProduct: []
      },
      validated: 0,
      seen: true,
      BarCodeValue: 0,
      CategoryInformation: [0],
      ProductInformation: [0],
      Asif: 33,
      TemporaryCostPrice: 0,
      TemporarySalePrice: 0,
      Total: 0,
      FirstCostPrice: [''],
      FirstSalePrice: [''],
      FirstExpiryDate: [''],
      FirstCustomID: [''],
      FirstQuantity: [''],
      ProductDescription: [''],
      WareHouseID: [''],
      BarCodeID: [''],
      RackID: [''],
      ColorCode: [''],
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
      banks: {
        total: 0,
        per_page: 10,
        from: 1,
        to: 0,
        current_page: 1
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
    this.getBanks()
  },
  methods: {
    BarCodeProductAddition () {
      // this.AddProductToCart()
      var ProductEntryCheck = 0
      // alert(this.products.data.length)
      var ID = this.BarCodeValue
      for (var i = 0; i < this.ProductInformation.length; i++) {
        if (ID === this.ProductInformation[i]) {
          this.FirstQuantity[i] = this.FirstQuantity[i] + 1
          this.TotalCalculation(i)
          ProductEntryCheck = 1
        }
      }
      if (ProductEntryCheck === 0) {
        this.message.push([])
        this.PurchaseList.row.push(2)
        this.PurchaseList.CostPrice.push(0)
        this.PurchaseList.SalePrice.push(0)
        this.PurchaseList.CategoryID.push(0)
        this.PurchaseList.ProductID.push(0)
        for (i = 0; i < this.products.data.length; i++) {
          // eslint-disable-next-line
          if (ID == this.products.data[i].id) {
            var ProductName = this.products.data[i].Name
            var BarCodeCostPrice = this.products.data[i].CostPrice
            var BarCodeSalePrice = this.products.data[i].SalePrice
            break
          }
        }
        this.message[this.message.length - 1].push({id: this.BarCodeValue, Name: ProductName})
        this.CategoryInformation.push(0)
        this.ProductInformation.push(0)
        this.FirstCostPrice.push('')
        this.FirstExpiryDate.push('')
        this.FirstSalePrice.push('')
        this.FirstQuantity.push('')
        this.FirstCustomID.push('')
        this.ProductDescription.push('')
        this.ColorCode.push('')
        this.WareHouseID.push('')
        this.RackID.push('')
        this.BarCodeID.push('')
        this.SubTotal.push('')
        this.ModelNumber.push('')
        this.ProductInformation[this.message.length - 1] = ID
        this.FirstCostPrice[this.message.length - 1] = BarCodeCostPrice
        this.FirstSalePrice[this.message.length - 1] = BarCodeSalePrice
        this.FirstQuantity[this.message.length - 1] = 1
        this.SubTotal[this.message.length - 1] = BarCodeCostPrice
        this.TotalCalculation(0)
        this.Notes.push('')
        this.ProductList.push({ProductListForCategory: [ 0, 0, 0 ]})
        this.PaymentOption()
      }
    },
    PaymentOption () {
      if (this.testPurchase.Paid == null) {
        this.testPurchase.Paid = 0
      }

      if (this.testPurchase.BankAmount == null) {
        this.testPurchase.BankAmount = 0
      }
      this.testPurchase.Due = this.testPurchase.Payable - this.testPurchase.Paid - this.testPurchase.BankAmount
      // alert(this.testPurchase.Due)
    },
    PurchaseEnabled () {
      if (this.testPurchase.Payable > 0 && this.testPurchase.ContactID > 0) {
        this.validated = 1
      } else {
        this.validated = 0
      }
    },
    getBanks () {
      axios.get(`http://techlab.classy.pos/Api/V1/Banks/Bank/List?page=${this.banks.current_page}`)
        .then((response) => {
          this.banks = response.data
          this.testPurchase.BankID = this.banks.data[0].BankID
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    LoadOrder () {
      this.PurchaseList.row = []
      this.FirstSalePrice[0] = 0
      this.FirstCostPrice[0] = 0
      this.FirstQuantity[0] = 0
      var id = this.testPurchase.PurchaseOrderID
      axios.get('http://techlab.classy.pos/Api/V1/Purchase/Order/Details/' + id)
        .then((resp) => {
          for (var i = 0; i < resp.data[1].length - 1; i++) {
            this.PurchaseList.row.push(0)
          }
          this.message[0].splice(0, this.message[0].length)
          this.message[0].push({id: resp.data[1][0].ProductID, Name: resp.data[1][0].Name})

          this.FirstCostPrice[0] = resp.data[1][0].Price
          this.FirstSalePrice[0] = resp.data[1][0].SalePrice
          this.FirstQuantity[0] = resp.data[1][0].Qty
          this.CategoryInformation[0] = resp.data[1][0].CategoryID
          this.ProductInformation[0] = resp.data[1][0].ProductID
          this.SubTotal[0] = this.FirstCostPrice[0] * this.FirstQuantity[0]
          for (i = 1; i < resp.data[1].length; i++) {
            this.FirstCostPrice[i] = resp.data[1][i].Price
            this.FirstSalePrice[i] = resp.data[1][i].SalePrice
            this.FirstQuantity[i] = resp.data[1][i].Qty
            this.SubTotal[i] = this.FirstCostPrice[i] * this.FirstQuantity[i]
            this.message[i].splice(0, this.message[i].length)
            this.ProductInformation[i] = resp.data[1][i].ProductID
            this.CategoryInformation[i] = resp.data[1][i].CategoryID
            this.message[i].push({id: resp.data[1][i].ProductID, Name: resp.data[1][i].Name})
          }
          // this.message[0].splice(0, this.message[0].length)
          // for (var i = 0; i < response.data.data.length; i++) {
          // this.message[0].push({id:resp.data[1][0].ProductID,Name:resp.data[1][0].Name})
          // }
          // this.ProductInformation[0] = resp.data[1][0].ProductID
          this.testPurchase.DeliveryAddress = resp.data[0].DeliveryAddress
          this.testPurchase.DeliveryDate = resp.data[0].DeliveryDate
          this.testPurchase.ContactID = resp.data[0].ContactID
          // this.testPurchase.SubTotal = resp.data[0].SubTotal
          this.testPurchase.Total = resp.data[0].SubTotal
          this.testPurchase.TaxCharge = resp.data[0].TaxCharge
          this.testPurchase.OtherCharge = resp.data[0].OtherCharge
          this.testPurchase.ShippingCharge = resp.data[0].ShippingCharge
          this.testPurchase.Payable = parseInt(this.testPurchase.Total, 10) + parseInt(this.testPurchase.TaxCharge, 10) + parseInt(this.testPurchase.OtherCharge, 10) + parseInt(this.testPurchase.ShippingCharge)
          console.log(resp.data)
        })
        .catch(function () {
          alert('Could not load your PurchaseOrder: ' + id)
        })
    },
    AuthCheck () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === null || Token === '') {
        // alert(Token)
        window.location = '/#/pages/login'
      }
    },
    PurchaseOrder () {
      this.testPurchase.SubTotal = this.testPurchase.Total
      this.testPurchase.Total = parseInt(this.testPurchase.Total) + parseInt(this.testPurchase.ShippingCharge) + parseInt(this.testPurchase.TaxCharge) + parseInt(this.testPurchase.OtherCharge)
      for (var i = 0; i < this.FirstCostPrice.length; i++) {
        if (this.FirstQuantity[i] > 0) {
          // this.testPurchase.ReceivedProduct.push({'ProductID':this.ProductInformation[i],'Description': this.ProductDescription[i],'Model':this.ModelNumber[i],'CostPrice': this.FirstCostPrice[i],'Qty': this.FirstQuantity[i]})
          this.testPurchase.ReceivedProduct.push({'ProductID': this.ProductInformation[i], 'Description': this.ProductDescription[i], 'Model': this.ModelNumber[i], 'CostPrice': this.FirstCostPrice[i], 'Qty': this.FirstQuantity[i], 'ExpiredDate': this.FirstExpiryDate[i], 'CustomID': this.FirstCustomID[i], 'SalePrice': this.FirstSalePrice[i], 'Status': 1, 'BatchNo': this.testPurchase.BatchNumber})
        }
      }
      if (this.testPurchase.Total > 0) {
        this.testPurchase.IsCash = 1
      } else {
        this.testPurchase.IsCash = 0
      }
      if (this.testPurchase.BankAmount > 0) {
        this.testPurchase.IsBank = 1
      } else {
        this.testPurchase.IsBank = 0
      }
      this.testPurchase.Paid = parseInt(this.testPurchase.Paid)
      var TotalVendorPaid = parseInt(this.testPurchase.Paid) + parseInt(this.testPurchase.BankAmount)
      this.testPurchase.BankAmount = parseInt(this.testPurchase.BankAmount)
      this.testPurchase.Payment.push({'CashAmount': this.testPurchase.Paid, 'BankID': this.testPurchase.BankID, 'ChequeNumber': this.testPurchase.ChequeNumber, 'IsBank': this.testPurchase.IsBank, 'IsCash': this.testPurchase.IsCash, 'Withdraw': this.testPurchase.BankAmount, 'Deposit': 0, 'Debit': this.testPurchase.Paid, 'Credit': 0, 'ContactCredit': this.testPurchase.Payable, 'ContactDebit': TotalVendorPaid, 'ContactID': this.testPurchase.ContactID, 'UserID': this.testPurchase.UserID})
      axios.post('http://techlab.classy.pos/Api/V1/Purchase/Receive/New', this.testPurchase)
        .then((response) => {
          // alert('Products Purchased Successfully!')
          // alert(response.data)
          console.log(response.data)
          this.PurchaseList.row = []
          this.FirstSalePrice[0] = 0
          this.FirstCostPrice[0] = 0
          this.FirstQuantity[0] = 0
          this.CategoryInformation[0] = 0
          this.ProductInformation[0] = 0
          this.SubTotal[0] = 0
          this.testPurchase.ContactID = 0
          // alert('Purchase Order Created')
          this.testPurchase.PurchaseOrderID = ''
          this.testPurchase.ReferenceNo = ''
          this.testPurchase.Notes = ''
          this.testPurchase.DeliveryAddress = ''
          this.testPurchase.DeliveryDate = ''
          this.testPurchase.Total = ''
          this.testPurchase.SubTotal = ''
          this.testPurchase.TaxCharge = ''
          this.testPurchase.ShippingCharge = ''
          this.testPurchase.OtherCharge = ''
          this.testPurchase.BatchNumber = ''
          this.testPurchase.Payable = ''
          this.testPurchase.Due = ''
          this.testPurchase.Paid = ''

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
    TotalCalculation (index) {
      this.SubTotal[index] = this.FirstCostPrice[index] * this.FirstQuantity[index]
      var Total = 0
      for (var i = 0; i < this.FirstCostPrice.length; i++) {
        Total = Total + this.FirstCostPrice[i] * this.FirstQuantity[i]
      }
      this.testPurchase.Total = Total
      this.testPurchase.Payable = parseInt(this.testPurchase.Total) + parseInt(this.testPurchase.ShippingCharge) + parseInt(this.testPurchase.TaxCharge) + parseInt(this.testPurchase.OtherCharge)
      this.PurchaseEnabled()
      this.PaymentOption()
      // alert(this.FirstCostPrice.length
      // this.Total=this.Total+this.FirstCostPrice[index]*this.FirstQuantity[index]
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
      this.ColorCode.push('')
      this.WareHouseID.push('')
      this.RackID.push('')
      this.BarCodeID.push('')
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
      this.Total = Total
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
