<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <button @click.prevent="showAddCategoryModal" type="button" class="btn btn-wd btn-success pull-right">
            Add Category
          </button>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in table.columns" :key="column.id">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="category in categories.data" :key="category.id">
              <td>{{ category.id }}</td>
              <td>{{ category.Name }}</td>
              <td :style="{background: category.Color}">{{ category.Color }}</td>
              <td v-if="category.Status === 0"><b-badge variant="secondary">InActive</b-badge></td>
              <td v-else><b-badge variant="success">Active</b-badge></td>
              <td>
                <b-btn @click.prevent="getCategory(category.id)" class="btn-success">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editCategory(category.id)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <b-btn @click.prevent="deleteCategory(category)" class="btn-danger">
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
                    :total-rows="categories.total"
                    v-model="categories.current_page"
                    :per-page="categories.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="details-category-modal"
      ref="detailsCategoryModal"
      title="Details Product"
      centered
      hide-footer
    >
      <table class="table table-bordered table-striped text-center">
        <tr>
          <td>ID:</td>
          <td>{{ categoryData.id }}</td>
        </tr>
        <tr>
          <td>Name:</td>
          <td>{{ categoryData.Name }}</td>
        </tr>
        <tr>
          <td>Color:</td>
          <td>{{ categoryData.Color }}</td>
        </tr>
        <tr>
          <td>Status:</td>
          <td v-if="categoryData.Status === true"><b-badge variant="success">Active</b-badge></td>
          <td v-else><b-badge variant="secondary">InActive</b-badge></td>
        </tr>
       </table>
    </b-modal>

    <b-modal
      id="add-category-modal"
      ref="addCategoryModal"
      size="lg"
      title="Add Category"
      centered
      hide-footer
    >

      <div class="add-category-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-12">
              <b-form-group
                label="Name:"
                label-for="income-category-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              label="Name"
                              placeholder="Name"
                              v-model="categoryData.Name"
                              id="income-category-name"
                              required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-12">
              <b-form-group
                label="Color"
                label-for="income-category-color"
                :label-cols="3"
                :horizontal="true">
                <b-form-input id="income-category-color"
                              type="color"
                              v-model="categoryData.Color">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-12">
              <b-form-group
                label="Category Status:"
                label-for="category-status"
                :label-cols="6"
                :horizontal="true">
                <c-switch type="icon"
                          v-model="categoryData.Status"
                          variant="success"
                          v-bind="{on: '\uf00c', off: '\uf00d'}"
                          :pill="true"/>
              </b-form-group>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addCategory">
              Add Category
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-category-modal"
      ref="editCategoryModal"
      size="lg"
      title="Edit Category"
      centered
      hide-footer
    >

      <div class="edit-category-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Name:"
                label-for="income-category-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              label="Name"
                              placeholder="Name"
                              v-model="categoryData.Name"
                              id="income-category-name"
                              required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Color:"
                label-for="income-category-color"
                :label-cols="3"
                :horizontal="true">
                <b-form-input id="income-category-color"
                              type="color"
                              v-model="categoryData.Color">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-12">
              <b-form-group
                label="Category Status:"
                label-for="category-status"
                :label-cols="3"
                :horizontal="true">
                <c-switch type="icon"
                          v-model="categoryData.Status"
                          variant="success"
                          v-bind="{on: '\uf00c', off: '\uf00d'}"
                          :pill="true"/>
              </b-form-group>
            </div>

          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateCategory(categoryData.id)">
              Update Category
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
import cSwitch from '../../../components/Switch'

const tableColumns = ['ID', 'Category Name', 'Color', 'Status', 'Action']

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  components: {
    cSwitch
  },
  data () {
    return {
      table: {
        title: 'Categories in Stock',
        subTitle: 'Recently added categories in main stock.',
        columns: [...tableColumns]
      },
      categoryData: {
        id: null,
        Name: null,
        Color: null,
        Status: null
      },
      categories: {
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
    this.getCategories()
  },
  methods: {
    getCategories () {
      axios.get(`http://techlab.classy.pos/Api/V1/Accounts/Income/Category/List?page=${this.categories.current_page}`)
        .then((response) => {
          this.categories = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    addCategory () {
      if (this.categoryData.Status === false) {
        this.categoryData.Status = 0
      } else {
        this.categoryData.Status = 1
      }
      axios.post('http://techlab.classy.pos/Api/V1/Accounts/Income/Category/New', this.categoryData)
        .then((response) => {
          this.categories.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => {
          this.setErrors(response)
        })
    },
    deleteCategory (category) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this category!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Accounts/Income/Category/Delete/' + category.id)
            .then((response) => {
              const idx = this.categories.data.indexOf(category)
              this.categories.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    detailsCategory (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Accounts/Income/Category/Details/' + id)
        .then((resp) => {
          this.categoryData = resp.data
          if (resp.data.Status === 1) {
            this.categoryData.Status = true
          } else {
            this.categoryData.Status = false
          }
        })
        .catch(function () {
          alert('Could not load your Category: ' + id)
        })
    },
    updateCategory (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Accounts/Income/Category/Update/' + id, this.categoryData)
        .then((response) => {
          this.getCategories()
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
      this.$refs.addCategoryModal.hide()
      this.$refs.editCategoryModal.hide()
      this.$refs.detailsCategoryModal.hide()
      this.errors = []
      this.categoryData = {
        id: null,
        Name: null,
        Color: null,
        Status: null
      }
    },
    showAddCategoryModal () {
      this.reset()
      this.categoryData.Status = true
      this.$refs.addCategoryModal.show()
    },
    editCategory (id) {
      this.detailsCategory(id)
      this.$refs.editCategoryModal.show()
    },
    getCategory (id) {
      this.detailsCategory(id)
      this.$refs.detailsCategoryModal.show()
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
</style>
