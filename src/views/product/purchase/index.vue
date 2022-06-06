<template>
  <div class="row">
    <div class="col-md-12 row">
      <div class="col-md-2">
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
      <div class="col-md-2">
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
        <select class="form-control">
          <option disabled value="0">Please select one</option>
          <option
                v-for="productBrand in productBrands.data"
                :key="productBrand.id"
                :value="productBrand.id">
                {{ productBrand.Name }}
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
                                  placeholder="Description"
                                  v-model="productData.Name" class="form-control">
      </div>
      <div class="col-md-2">
        <input id="product-name"
                                  type="text"
                                  placeholder="Batch Number"
                                  v-model="productData.Name" class="form-control">
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
      <div class="col-md-2">
        <select id="product-brand" v-model="productData.BrandID" class="form-control">
              <option  value="null" selected>Select status</option>
              <option  value="1">Active</option>
              <option  value="0">InActive</option>
        </select>
      </div>
      <div class="input-group col-md-2">
        <input type="text" placeholder="Notes" class="form-control">
        <span class="input-group-btn"><button class="btn btn-success" v-on:click="AddProductToCart()"><i class="fa fa-plus"></i></button></span>
      </div>
    </div>

    <!-- <div class="row col-md-12">
=======
    <div>
      <div class="row col-md-12">
>>>>>>> ee764635418d12cb3f8e263fe3a0bfe565e42bb7
        <div class="col-md-2">
            <b-form-select id="product-category" @change="CategoryChange()" v-model="productData.CategoryID">
              <option :value="null" disabled selected>Select a Category</option>
              <option
                v-for="productCategory in productCategories.data"
                :key="productCategory.id"
                :value="productCategory.id">
                {{ productCategory.Name }}
              </option>
            </b-form-select>
        </div>
        <div class="col-md-2">
            <b-form-select id="product-brand" v-model="productData.BrandID">
              <option disabled :value="null" selected>Select Product</option>
              <option
                v-for="productBrand in productinformation.data"
                :key="productBrand.id"
                :value="productBrand.id">
                {{ productBrand.Name }}
              </option>
            </b-form-select>
        </div>
        <div class="col-md-2">
            <b-form-select id="product-brand" v-model="productData.BrandID">
              <option disabled :value="null" selected>Select Brand</option>
              <option
                v-for="productBrand in productBrands.data"
                :key="productBrand.id"
                :value="productBrand.id">
                {{ productBrand.Name }}
              </option>
            </b-form-select>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-description"
                                  type="text"
                                  placeholder="Model Number"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-description"
                                  type="text"
                                  placeholder="Description"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-name"
                                  type="text"
                                  placeholder="Batch Number"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
      </div>
      <div class="row col-md-12" style="margin-top:5px;">
        <div class="col-md-2">
          <b-form-input id="product-name"
                                  type="text"
                                  placeholder="Custom ID"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-name"
                                  type="number"
                                  placeholder="Quantity"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-name"
                                  type="number"
                                  placeholder="Cost Price"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-description"
                                  type="number"
                                  placeholder="Sale Price"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
            <b-form-select id="product-brand" v-model="productData.BrandID">
              <option  value="null" selected>Select status</option>
              <option  value="1">Active</option>
              <option  value="0">InActive</option>
            </b-form-select>
        </div>
        <div class="col-md-2">
          <b-input-group>
            <b-form-input id="product-notes"
                                    type="text"
                                    placeholder="Notes"
                                    v-model="productData.Name">
            </b-form-input>
            <b-input-group-append>
              <b-btn variant="success" @click.prevent="AddProductToCart()"><i class="fa fa-plus" ></i></b-btn>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div> -->
    <div v-for="(Purchase,index) in PurchaseList.row">
      <div class="col-md-12 row">
        <div class="col-md-2">
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
        <div class="col-md-2">
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
        <div class="col-md-2">
          <select class="form-control">
            <option disabled value="0">Please select one</option>
            <option
                  v-for="productBrand in productBrands.data"
                  :key="productBrand.id"
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
                                    placeholder="Description"
                                    v-model="productData.Name" class="form-control">
        </div>
        <div class="col-md-2">
          <input id="product-name"
                                    type="text"
                                    placeholder="Batch Number"
                                    v-model="productData.Name" class="form-control">
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
      <div class="col-md-2">
        <select id="product-brand" v-model="productData.BrandID" class="form-control">
              <option  value="null" selected>Select status</option>
              <option  value="1">Active</option>
              <option  value="0">InActive</option>
        </select>
      </div>
      <div class="input-group col-md-2">
        <input type="text" placeholder="Notes" class="form-control">
        <span class="input-group-btn"><button class="btn btn-danger" v-on:click="DeleteProductFromCart(index)"><i class="fa fa-minus"></i></button></span>
      </div>
    </div>
      <!-- <div class="row col-md-12">
        <div class="col-md-2">
            <b-form-select id="product-category-child" @change="getProductFahad(index)" v-model="Akib">
              <option :value="null" disabled selected >Select a Category</option>
              <option
                v-for="productCategory in productCategories.data"
                :key="productCategory.id"
                :value="productCategory.id">
                {{ productCategory.Name }}
              </option>
            </b-form-select>
        </div>
        <div class="col-md-2">
            <b-form-select id="product-brand" v-model="productData.ProductID" >
              <option disabled :value="null" selected>Select Product</option>
              <option
                v-for="productBrand in productinformation.data"
                :key="productBrand.id"
                :value="productBrand.id">
                {{ productBrand.Name }}
              </option>
            </b-form-select>
        </div>

        <div class="col-md-2">
            <b-form-select id="product-brand" v-model="productData.BrandID">
              <option disabled :value="null" selected>Select Brand</option>
              <option
                v-for="productBrand in productBrands.data"
                :key="productBrand.id"
                :value="productBrand.id">
                {{ productBrand.Name }}
              </option>
            </b-form-select>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-description"
                                  type="text"
                                  placeholder="Model Number"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-description"
                                  type="text"
                                  placeholder="Description"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-name"
                                  type="text"
                                  placeholder="Batch Number">
          </b-form-input>
        </div>
      </div> -->
      <!-- <div class="row col-md-12" style="margin-top:5px;">
        <div class="col-md-2">
          <b-form-input id="product-name"
                                  type="text"
                                  placeholder="Custom ID"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-name"
                                  type="number"
                                  placeholder="Quantity"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-name"
                                  type="number"
                                  placeholder="Cost Price"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
          <b-form-input id="product-description"
                                  type="number"
                                  placeholder="Sale Price"
                                  v-model="productData.Name">
          </b-form-input>
        </div>
        <div class="col-md-2">
            <b-form-select id="product-brand" v-model="productData.BrandID">
              <option  value="null" selected>Select status</option>
              <option  value="1">Active</option>
              <option  value="0">InActive</option>
            </b-form-select>
        </div>
        <div class="col-md-2">
          <b-input-group>
            <b-form-input id="product-notes"
                                    type="text"
                                    placeholder="Notes"
                                    v-model="productData.Name">
            </b-form-input>
            <b-input-group-append>
              <b-btn variant="danger" @click.prevent="DeleteProductFromCart(index)"><i class="fa fa-minus" ></i></b-btn>
            </b-input-group-append>
          </b-input-group>
        </div> -->
      </div>
      <div class="col-md-12 row" style="margin-top:13px">
        <div class="input-group col-md-2">
          <input type="text" placeholder="Total" class="form-control" v-model="TotalPrice">
          <span class="input-group-addon"><button class="btn btn-primary">Total</button></span>
        </div>
      </div>
      <p v-if="seen" style="font-size:0px;">
        {{TemporarySalePrice}}
        {{TemporaryCostPrice}}
      </p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import $ from 'jquery'
const tableColumns = ['ID', 'Product Name', 'Quantity', 'Unit Price', 'Discount', 'Tax', 'SubTotal', 'Action']
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}
export default {
  data () {
    return {
      seen: true,
      CategoryInformation: [0],
      ProductInformation: [0],
      TemporaryCostPrice: 0,
      TemporarySalePrice: 0,
      Imran: [11, 12],
      Wasim: [0, 33],
      Khan: 43,
      TotalPrice: 0,
      FirstCostPrice: [''],
      FirstSalePrice: [''],
      FirstQuantity: [''],
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
        ProductListForCategory: [0],
        row: [1]
      },
      message: [[], [], [], [], []],
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
      Everything: ['FirstLineProductID', 'SecondLineProductID'],
      FirstLineProductID: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        Name: null,
        id: null
      },
      SecondLineProductID: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        Name: null,
        id: null
      },
      ThirdLineProductID: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        Name: null,
        id: null
      },
      FirstLineProductName: {
        ProductName: ''
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
    this.getProductFahad(4)
  },
  methods: {
    ProductChange (index) {
      var ProductID = this.ProductInformation[index]
      var self = this
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
    },
    CategoryChange (index) {
      // var ss=this.CategoryInformation
      // alert("Index Is"+index)

      var CategoryID = this.CategoryInformation[index]
      this.items[0].message = 'Azib'
      // CategoryID=$('#product-category-child').val()
      axios.get('http://techlab.classy.pos/Api/V1/Products/Product/Filter/' + CategoryID + `/0/0/0/0/0?page=${this.products.current_page}`)
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
          // var x=response.data
          // alert(ProductData.CategoryID)
          // this.items.$set(index, val)
          this.PurchaseList.CostPrice[index] = response.data.CostPrice
          this.PurchaseList.SalePrice[index] = response.data.SalePrice
          // this.Imran[0]=this.Imran[0]+1,
          // this.Khan=21
          // this.CostPrice=response.data.CostPrice
          // this.SalePrice=response.data.SalePrice
          // this.productinformation = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    AddProductToCart () {
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
      this.ModelNumber.push('')
      this.Notes.push('')
      this.message.push([])
      // this.message[0].push({id:14,Name:'Kazi'})
      this.ProductList.push({ProductListForCategory: [ 0, 0, 0]})
      // this.items.$set(index, val)
    },
    DeleteProductFromCart (index) {
      this.PurchaseList.row.splice(index, 1)
    },
    getProductFahad (CategoryID) {
      axios.get('http://techlab.classy.pos/Api/V1/Products/Product/Filter/' + CategoryID + `/0/0/0/0/0?page=${this.products.current_page}`)
        .then((response) => {
          this.productinformation = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
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
      const idx = this.products.data.indexOf(product)
      this.products.data.splice(idx, 1)
      // this.products.data.splice(product)

      // this.$swal({
      //   title: 'Are you sure?',
      //   text: 'You will not be able to recover this product!',
      //   type: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#dd002f',
      //   confirmButtonText: 'Yes, delete it!'
      // })
      //   .then((result) => {
      //     axios.delete('http://techlab.classy.pos/Api/V1/Products/Product/Delete/' + product.id)
      //       .then((response) => {
      //         const idx = this.products.data.indexOf(product)
      //         this.products.data.splice(idx, 1)
      //       })
      //       .catch(function (resp) {
      //         alert('Could not delete data')
      //       })
      //   })
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
