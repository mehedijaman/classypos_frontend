<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <button @click.prevent="showAddTaxModal" type="button" class="btn btn-wd btn-success pull-right">
            Add Tax
          </button>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in table.columns" :key="column.id">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="tax in taxes.data" :key="tax.id">
              <td>{{ tax.id }}</td>
              <td>{{ tax.Name }}</td>
              <td>{{ tax.Percent }}</td>
              <td v-if="tax.Status === 1"><b-badge variant="success">Active</b-badge></td>
              <td v-else><b-badge variant="secondary">InActive</b-badge></td>
              <td>
                <b-btn @click.prevent="getTax(tax.id)" class="btn-success">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editTax(tax.id)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <b-btn @click.prevent="deleteTax(tax)" class="btn-danger">
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
                    :total-rows="taxes.total"
                    v-model="taxes.current_page"
                    :per-page="taxes.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="details-Tax-modal"
      ref="detailsTaxModal"
      title="Tax Details"
      centered
      hide-footer
    >
      <div class="Tax-info">
        <table class="table table-bordered table-striped text-center">
          <tr>
            <td>ID:</td>
            <td>{{ taxData.id }}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{{ taxData.Name }}</td>
          </tr>
          <tr>
            <td>Percent:</td>
            <td>{{ taxData.Percent }}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td v-if="taxData.Status === true"><b-badge variant="success">Active</b-badge></td>
            <td v-else><b-badge variant="secondary">InActive</b-badge></td>
          </tr>
        </table>
      </div>
    </b-modal>

    <b-modal
      id="add-Tax-modal"
      ref="addTaxModal"
      title="Add Tax"
      centered
      hide-footer
    >

      <div class="add-Tax-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-12">
              <b-form-group
                label="Name:"
                label-for="Tax-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="Tax-name"
                          placeholder="Name"
                          v-model="taxData.Name"
                          required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-12">
              <b-form-group
                label="Percent:"
                label-for="Tax-percent"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="Tax-percent"
                              placeholder="Percent"
                              v-model="taxData.Percent"
                              required>
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="col-md-12">
            <b-form-group
              label="Status:"
              label-for="tax-status"
              :label-cols="3"
              :horizontal="true">
              <c-switch type="icon"
                        v-model="taxData.Status"
                        variant="success"
                        v-bind="{on: '\uf00c', off: '\uf00d'}"
                        :pill="true"
                        :checked="false"/>
            </b-form-group>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addTax">
              Add Tax
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-Tax-modal"
      ref="editTaxModal"
      title="Edit Tax"
      centered
      hide-footer
    >

      <div class="edit-Tax-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-12">
              <b-form-group
                label="Name:"
                label-for="Tax-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="Tax-name"
                              placeholder="Name"
                              v-model="taxData.Name"
                              required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-12">
              <b-form-group
                label="Percent:"
                label-for="Tax-percent"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="Tax-percent"
                              placeholder="Percent"
                              v-model="taxData.Percent"
                              required>
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="col-md-12">
            <b-form-group
              label="Status:"
              label-for="tax-status"
              :label-cols="3"
              :horizontal="true">
              <c-switch type="icon"
                        v-model="taxData.Status"
                        variant="success"
                        v-bind="{on: '\uf00c', off: '\uf00d'}"
                        :pill="true"
                        :checked="false"/>
            </b-form-group>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateTax(taxData.id)">
              Update Tax
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

  </div>
</template>

<script>
import cSwitch from '../../components/Switch'
import axios from 'axios'

const tableColumns = ['ID', 'Name', 'Percent', 'Status', 'Action']

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
        title: 'Taxes in Stock',
        subTitle: 'Recently added taxes.',
        columns: [...tableColumns]
      },
      taxData: {
        id: null,
        Name: null,
        Percent: null,
        Status: false
      },
      taxes: {
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
    this.getTaxes()
  },
  methods: {
    getTaxes () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Tax/List?page=${this.taxes.current_page}`)
        .then((response) => {
          this.taxes = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    addTax () {
      if (this.taxData.Status === false) {
        this.taxData.Status = 0
      } else {
        this.taxData.Status = 1
      }
      axios.post('http://techlab.classy.pos/Api/V1/Products/Tax/New', this.taxData)
        .then((response) => {
          this.taxes.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => {
          this.setErrors(response)
          console.log(JSON.stringify(this.errors))
        })
    },
    deleteTax (tax) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Tax!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Products/Tax/Trash/New/' + tax.id)
            .then((response) => {
              const idx = this.taxes.data.indexOf(tax)
              this.taxes.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    detailsTax (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Products/Tax/Details/' + id)
        .then((resp) => {
          this.taxData = resp.data
          if (resp.data.Status === 1) {
            this.taxData.Status = true
          } else {
            this.taxData.Status = false
          }
        })
        .catch(function () {
          alert('Could not load your Tax: ' + id)
        })
    },
    updateTax (id) {
      if (this.taxData.Status === false) {
        this.taxData.Status = 0
      } else {
        this.taxData.Status = 1
      }
      axios.put('http://techlab.classy.pos/Api/V1/Products/Tax/Update/' + id, this.taxData)
        .then((response) => {
          this.taxes.data.push(response.data)
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
      this.$refs.addTaxModal.hide()
      this.$refs.editTaxModal.hide()
      this.$refs.detailsTaxModal.hide()
      this.errors = []
      this.taxData = {
        id: null,
        Name: null,
        Percent: null,
        Status: null
      }
    },
    showAddTaxModal () {
      this.reset()
      this.$refs.addTaxModal.show()
    },
    editTax (id) {
      this.detailsTax(id)
      this.$refs.editTaxModal.show()
    },
    getTax (id) {
      this.detailsTax(id)
      this.$refs.detailsTaxModal.show()
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
</style>
