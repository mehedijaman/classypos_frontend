<template>

  <div class="row">
    <div class="col md-4">
      <div class="pull-right">
          <button class="btn btn-lg btn-success" v-for="Categories in productCategories.data" :key="Categories.id" @click.prevent="getProductFahad(Categories.id)">
            {{ Categories.Name }}
          </button>
           <button class="btn btn-lg btn-danger" @click.prevent="AddProductToCart(List.id)" :key="List.id" v-for="List in productinformation.data">
            {{ List.Name }}
          </button>
          <br>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="col-md-6">
          <table class="table table-striped">
            <thead>
            <th :key="column" v-for="column in table.columns">{{ column }}</th>
            </thead>
            <tbody>
            <tr :key="product" v-for="product in products.data">
              <td>{{ product.id }}</td>
              <td>{{ product.Name }}</td>
              <td>{{ product.OpeningQty }}</td>
              <td>{{ product.VendorName }}</td>
              <td>{{ product.BrandName }}</td>
              <td>{{ product.Description }}</td>
              <td>{{ product.SalePrice }}</td>
              <td>
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
    <b-pagination size="sm" :total-rows="100" v-model="products.current_page" :per-page="10"></b-pagination>
    <br>
    <b-modal
      id="details-product-modal"
      ref="detailsProductModal"
      size="lg"
      title="Details Product"
      centered
      hide-footer
    >
      <div class="product-info">
        <p>ID: {{ productData.id }}</p>
        <p>Customer Name: {{ productData.Name }}</p>
        <p>Brand Name: {{ productData.BrandName }}</p>
        <p>Vendor Name: {{ productData.VendorName }}</p>
        <p>Category: {{ productData.CategoryName }}</p>
        <p>Description: {{ productData.Description }}</p>
        <p>City: {{ productData.SalePrice }} </p>
      </div>
    </b-modal>
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
      table: {
        title: 'TechLab IT',
        subTitle: 'Sales  Panel',
        columns: [...tableColumns]
      },
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
    AddProductToCart (ProductID) {
      axios.get('http://techlab.classy.pos/Api/V1/Products/Product/Details/' + ProductID)
        .then((response) => {
          console.log(response.data)
          this.products.data.push(response.data)
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getProductFahad (CategoryID) {
      axios.get('http://techlab.classy.pos/Api/V1/Products/Product/Filter/' + CategoryID + `/0/0/0/0/0?page=${this.products.current_page}`)
        .then((response) => {
          // Every=[]
          // var alif=[];
          // alif=response.data;
          // Every=response.data
          this.productinformation = response.data

          // this.productinformation = response.data
          // console.log(response.data);
          // this.productinformation.data.push(response.data);

          // alert(response.data)
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
      //     axios.delete('http://techlab.classy.pos/Api/V1/Products/Product/Trash/New/' + product.id)
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
