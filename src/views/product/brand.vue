<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <button @click.prevent="showAddBrandModal" type="button" class="btn btn-wd btn-success pull-right">
            Add Brand
          </button>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in table.columns" :key="column">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="brand in brands.data" :key="brand.id">
              <td>{{ brand.id }}</td>
              <td>{{ brand.Name }}</td>
              <td>{{ brand.Manufacturer }}</td>
              <td>
                <b-btn @click.prevent="getBrand(brand)" class="btn-success">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editBrand(brand)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <b-btn @click.prevent="deleteBrand(brand)" class="btn-danger">
                  <i class="fa fa-trash"></i>
                </b-btn>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <b-modal
      id="details-brand-modal"
      ref="detailsBrandModal"
      size="lg"
      title="Details Product"
      centered
      hide-footer
    >
      <div class="brand-info">
        <p>ID: {{ brandData.id }}</p>
        <p>Brand Name: {{ brandData.Name }}</p>
        <p>Brand Manufacturer: {{ brandData.Manufacturer }}</p>
      </div>
    </b-modal>

    <b-modal
      id="add-brand-modal"
      ref="addBrandModal"
      size="lg"
      title="Add Brand"
      centered
      hide-footer
    >

      <div class="add-brand-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Name"
                label-for="product-brand-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input id="product-brand-name"
                          type="text"
                          placeholder="Name"
                          v-model="brandData.Name"
                          required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Manufacturer"
                label-for="product-brand-company"
                :label-cols="3"
                :horizontal="true">
                <b-form-input id="product-brand-company"
                          type="text"
                          placeholder="Manufacturer"
                          v-model="brandData.Manufacturer">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addBrand">
              Add Brand
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-brand-modal"
      ref="editBrandModal"
      size="lg"
      title="Edit Brand"
      centered
      hide-footer
    >

      <div class="edit-brand-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Name"
                label-for="product-brand-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input id="product-brand-name"
                              type="text"
                              placeholder="Name"
                              v-model="brandData.Name"
                              required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Manufacturer"
                label-for="product-brand-company"
                :label-cols="3"
                :horizontal="true">
                <b-form-input id="product-brand-company"
                              type="text"
                              placeholder="Manufacturer"
                              v-model="brandData.Manufacturer">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateBrand(brandData.id)">
              Update Brand
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

  </div>
</template>

<script>
import axios from 'axios'

const tableColumns = ['ID', 'Brand Name', 'Manufacturer', 'Action']

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  data () {
    return {
      table: {
        title: 'Brands in Stock',
        subTitle: 'Recently added brands in main stock.',
        columns: [...tableColumns]
      },
      brandData: {
        id: null,
        Name: null,
        Manufacturer: null
      },
      brands: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4,
      errors: []
    }
  },
  mounted () {
    this.getBrands()
  },
  methods: {
    getBrands () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Brand/List?page=${this.brands.current_page}`)
        .then((response) => {
          this.brands = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    addBrand () {
      axios.post('http://techlab.classy.pos/Api/V1/Products/Brand/New', this.brandData)
        .then((response) => {
          this.brands.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => {
          this.setErrors(response)
          console.log(JSON.stringify(this.errors))
        })
    },
    deleteBrand (brand) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this brand!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Products/Brand/Trash/New/' + brand.id)
            .then((response) => {
              const idx = this.brands.data.indexOf(brand)
              this.brands.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    detailsBrand (brand) {
      axios.get('http://techlab.classy.pos/Api/V1/Products/Brand/Details/' + brand.id)
        .then((resp) => {
          this.brandData = resp.data
        })
        .catch(function () {
          alert('Could not load your Brand: ' + brand.id)
        })
    },
    updateBrand (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Products/Brand/Update/' + id, this.brandData)
        .then((response) => {
          this.brands.data.push(response.data)
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
      this.$refs.addBrandModal.hide()
      this.$refs.editBrandModal.hide()
      this.$refs.detailsBrandModal.hide()
      this.errors = []
      this.brandData = {
        id: null,
        Name: null,
        Manufacturer: null
      }
    },
    showAddBrandModal () {
      this.reset()
      this.$refs.addBrandModal.show()
    },
    editBrand (brand) {
      this.detailsBrand(brand)
      this.$refs.editBrandModal.show()
    },
    getBrand (brand) {
      this.detailsBrand(brand)
      this.$refs.detailsBrandModal.show()
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
</style>
