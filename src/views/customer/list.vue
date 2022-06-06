<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <b-btn class="pull-right" @click.prevent="showAddCustomerModal">Add Customer</b-btn>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in table.columns" :key="column.id">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="customer in customers.data" :key="customer.id">
              <td>{{ customer.id }}</td>
              <td>{{ customer.Name }}</td>
              <td>{{ customer.CompanyName }}</td>
              <td>{{ customer.Phone }}</td>
              <td>{{ customer.Email }}</td>
              <td>{{ customer.City }}</td>
              <td>{{ customer.Address }}</td>
              <td>{{ customer.OpeningBalance }}</td>
              <td>
                <b-btn @click.prevent="getCustomer(customer.id)" class="btn-success">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editCustomer(customer.id)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <b-btn @click.prevent="deleteCustomer(customer)" class="btn-danger">
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
                    :total-rows="customers.total"
                    v-model="customers.current_page"
                    :per-page="customers.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="details-customer-modal"
      ref="detailsCustomerModal"
      size="lg"
      title="Customer Details"
      centered
      hide-footer
    >
      <div class="customer-info">
        <p>ID: {{ customerData.id }}</p>
        <p>Customer Name: {{ customerData.Name }}</p>
        <p>Company Name: {{ customerData.CompanyName }}</p>
        <p>Phone Number: {{ customerData.Phone }}</p>
        <p>Email: {{ customerData.Email }}</p>
        <p>Address: {{ customerData.Address }}</p>
        <p>City: {{ customerData.City }} </p>
        <p> Opening Balance: {{ customerData.OpeningBalance }}</p>
        <p> Status: {{ customerData.Status }}</p>
        <p> Notes: {{ customerData.Notes }}</p>
      </div>
    </b-modal>

    <b-modal
      id="add-customer-modal"
      ref="addCustomerModal"
      size="lg"
      title="Add Customer"
      centered
      hide-footer
    >

      <div class="add-customer-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Name:"
                label-for="customer-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="customer-name"
                          placeholder="Name"
                          v-model="customerData.Name"
                          required
                >
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Company:"
                label-for="customer-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="customer-company-name"
                          placeholder="Company Name"
                          v-model="customerData.CompanyName">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Phone:"
                label-for="customer-phone"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="customer-phone"
                          placeholder="Phone No."
                          v-model="customerData.Phone">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Email:"
                label-for="customer-email"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="email"
                          id="customer-email"
                          placeholder="Email"
                          v-model="customerData.Email">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Address:"
                label-for="customer-address"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="customer-address"
                          placeholder="Address"
                          v-model="customerData.Address">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="City:"
                label-for="customer-city"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="customer-city"
                          placeholder="City"
                          v-model="customerData.City">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Province:"
                label-for="customer-province"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="customer-province"
                          placeholder="Province"
                          v-model="customerData.Province">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Zip Code:"
                label-for="customer-zip"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="customer-zip"
                          placeholder="Zip Code"
                          v-model="customerData.ZipCode">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Balance:"
                label-for="customer-balance"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="number"
                        id="customer-balance"
                        placeholder="Opening Balance"
                        v-model="customerData.OpeningBalance">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Status:"
                label-for="customer-status"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="customer-status" v-model="customerData.Status">
                  <option :value="null" disabled>Status</option>
                  <option :value=1>Active</option>
                  <option :value=0>Deactivate</option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Image"
                label-for="customer-image"
                :label-cols="3"
                :horizontal="true">
                <b-form-file v-model="customerData.Image" id="customer-image" :plain="true"></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-textarea id="customer-description"
                               type="text"
                               placeholder="Notes"
                               v-model="customerData.Notes"
                               :rows="1"
                               :max-rows="6">
              </b-form-textarea>
            </div>
          </div>

          <div class="text-center">
            <b-btn type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addCustomer">
              Add Customer
            </b-btn>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-customer-modal"
      ref="editCustomerModal"
      size="lg"
      title="Add Customer"
      centered
      hide-footer
    >

      <div class="edit-customer-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Name:"
                label-for="customer-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="customer-name"
                              placeholder="Name"
                              v-model="customerData.Name"
                              required
                >
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Company:"
                label-for="customer-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="customer-company-name"
                              placeholder="Company Name"
                              v-model="customerData.CompanyName">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Phone:"
                label-for="customer-phone"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="customer-phone"
                              placeholder="Phone No."
                              v-model="customerData.Phone">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Email:"
                label-for="customer-email"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="email"
                              id="customer-email"
                              placeholder="Email"
                              v-model="customerData.Email">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Address:"
                label-for="customer-address"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="customer-address"
                              placeholder="Address"
                              v-model="customerData.Address">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="City:"
                label-for="customer-city"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="customer-city"
                              placeholder="City"
                              v-model="customerData.City">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Province:"
                label-for="customer-province"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="customer-province"
                              placeholder="Province"
                              v-model="customerData.Province">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Zip Code:"
                label-for="customer-zip"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="customer-zip"
                              placeholder="Zip Code"
                              v-model="customerData.ZipCode">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Balance:"
                label-for="customer-balance"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="number"
                              id="customer-balance"
                              placeholder="Opening Balance"
                              v-model="customerData.OpeningBalance">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Status:"
                label-for="customer-status"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="customer-status" v-model="customerData.Status">
                  <option :value="null" disabled>Status</option>
                  <option :value=1>Active</option>
                  <option :value=0>Deactivate</option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Image"
                label-for="customer-image"
                :label-cols="3"
                :horizontal="true">
                <b-form-file v-model="customerData.Image" id="customer-image" :plain="true"></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-textarea id="customer-description"
                               type="text"
                               placeholder="Notes"
                               v-model="customerData.Notes"
                               :rows="1"
                               :max-rows="6">
              </b-form-textarea>
            </div>
          </div>

          <div class="text-center">
            <b-btn type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateCustomer(customerData.id)">
              Update Customer
            </b-btn>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

  </div>
</template>

<script>
import axios from 'axios'

const tableColumns = ['ID', 'Name', 'Company Name', 'Phone No.', 'Email', 'City', 'Address', 'Opening Balance']

export default {
  data () {
    return {
      table: {
        title: 'Customers overview',
        subTitle: 'Your customer details.',
        columns: [...tableColumns]
      },
      customerData: {
        id: null,
        Name: null,
        CompanyName: null,
        Phone: null,
        Email: null,
        Address: null,
        City: null,
        Province: null,
        ZipCode: null,
        Country: null,
        Image: null,
        Notes: null,
        OpeningBalance: null,
        Status: null
      },
      customers: {
        total: 0,
        per_page: 10,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4
    }
  },
  mounted () {
    this.getCustomers()
  },
  methods: {
    getCustomers () {
      axios.get(`http://techlab.classy.pos/Api/V1/Customers/Customer/Filter/0/0/0/0/0/0?page=${this.customers.current_page}`)
        .then((response) => {
          this.customers = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    detailsCustomer (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Customers/Customer/Details/' + id)
        .then((response) => {
          this.customerData = response.data
        })
        .catch(function (e) {
          alert('Could not load your customer ' + e.message.toString())
        })
    },
    addCustomer () {
      axios.post('http://techlab.classy.pos/Api/V1/Customers/Customer/New', this.customerData)
        .then((response) => {
          this.customers.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch((response) => this.setErrors(response))
    },
    updateCustomer (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Customers/Customer/Update/' + id, this.customerData)
        .then((response) => {
          // this.customers.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch((response) => this.setErrors(response))
    },

    deleteCustomer (customer) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this customer!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Customers/Customer/Trash/New/' + customer.id)
            .then((response) => {
              const idx = this.customers.data.indexOf(customer)
              this.customers.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },

    setErrors (response) {
      this.errors = response.data.errors
    },
    setSuccessMessage () {
      this.reset()
    },
    editCustomer (id) {
      this.detailsCustomer(id)
      this.$refs.editCustomerModal.show()
    },
    showAddCustomerModal () {
      this.reset()
      this.$refs.addCustomerModal.show()
    },
    getCustomer (id) {
      this.detailsCustomer(id)
      this.$refs.detailsCustomerModal.show()
    },

    reset () {
      this.$refs.addCustomerModal.hide()
      this.$refs.detailsCustomerModal.hide()
      this.$refs.editCustomerModal.hide()
      this.errors = []
      this.customerData = {
        id: null,
        Name: null,
        CompanyName: null,
        Phone: null,
        Email: null,
        Address: null,
        City: null,
        Province: null,
        ZipCode: null,
        Country: null,
        Image: null,
        Notes: null,
        OpeningBalance: null,
        Status: null
      }
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
</style>
