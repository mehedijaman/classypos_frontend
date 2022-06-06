<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <b-btn class="pull-right" @click.prevent="showAddIncome">Add Income</b-btn>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in table.columns" :key="column.id">{{ column }}</th>
            </thead>
            <tbody>
            <tr :key="income.id" v-for="income in incomes.data">
              <td>{{ income.id }}</td>
              <td>{{ income.CategoryName }}</td>
              <td>{{ income.ShopName }}</td>
              <td>{{ income.TerminalName }}</td>
              <td>{{ income.FloorName }}</td>
              <td>{{ income.Account }}</td>
              <td>{{ income.Amount }}</td>
              <td>{{ income.Notes }}</td>
              <td>
                <b-btn @click.prevent="getIncome(income.id)"><i class="fa fa-info"></i></b-btn>
                <b-btn @click.prevent="editIncome(income.id)"><i class="fa fa-edit"></i></b-btn>
                <b-btn class="btn-danger" @click.prevent="deleteIncome(income)" ><i class="fa fa-trash"></i></b-btn>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <b-pagination align="right"
        :total-rows="incomes.total"
        v-model="incomes.current_page"
        :per-page="incomes.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="get-income-modal"
      ref="detailsIncomeModal"
      size="lg"
      title="Add Income"
      centered
      hide-footer
    >
      <div class="bank-info">
        <p>{{ incomeData.id }}</p>
        <p>{{ incomeData.CategoryID }}</p>
        <p>{{ incomeData.ShopID }}</p>
        <p>{{ incomeData.TerminalID }}</p>
        <p>{{ incomeData.FloorID }}</p>
        <p>{{ incomeData.Account }}</p>
        <p>{{ incomeData.Amount }}</p>
        <p>{{ incomeData.Notes }}</p>
        <p>{{ incomeData.Date }}</p>
      </div>
    </b-modal>

    <b-modal
      id="add-income-modal"
      ref="addIncomeModal"
      size="lg"
      title="Add Income"
      centered
      hide-footer
    >

      <div class="add-income-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-4">
            <input type="hidden" v-model="incomeData.UserID">
              <b-form-input type="text"
                        label="Amount"
                        placeholder="Amount"
                        v-model="incomeData.Amount"
                        required
              >
              </b-form-input>
            </div>
            <div class="col-md-4">
              <b-form-input type="text"
                        label="Account"
                        placeholder="Account"
                        v-model="incomeData.Account">
              </b-form-input>
            </div>
            <div class="col-md-4">
              <b-form-input type="date"
                        label="Date"
                        placeholder="Date"
                        v-model="incomeData.Date">
              </b-form-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <label aria-label="label">Category</label>
              <b-form-select class="form-control border-input"
                             v-model="incomeData.CategoryID"
                             required
              >
                <option :value="null" disabled>Select a Category</option>
                <option
                  v-for="incomeCategory in incomeCategories.data"
                  :value="incomeCategory.id"
                  :key="incomeCategory.id">
                  {{ incomeCategory.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Shop</label>
              <b-form-select class="form-control border-input"
                             v-model="incomeData.ShopID"
              >
                <option
                  v-for="incomeShop in incomeShops.data"
                  :value="incomeShop.id"
                  :key="incomeShop.id">
                  {{ incomeShop.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Terminal</label>
              <b-form-select class="form-control border-input"
                             v-model="incomeData.TerminalID">
                <option
                  v-for="incomeTerminal in incomeTerminals.data"
                  :value="incomeTerminal.id"
                  :key="incomeTerminal.id">
                  {{ incomeTerminal.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Shop Floor</label>
              <b-form-select class="form-control border-input"
                             v-model="incomeData.FloorID">
                <option
                  v-for="incomeFloor in incomeFloors.data"
                  :value="incomeFloor.id"
                  :key="incomeFloor.id">
                  {{ incomeFloor.Name }}
                </option>
              </b-form-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>About Income</label>
                <textarea rows="5" class="form-control border-input"
                          placeholder="Here can be your description"
                          v-model="incomeData.Notes">
                </textarea>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addIncome">
              Add Income
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="update-income-modal"
      ref="editIncomeModal"
      size="lg"
      title="Edit Income"
      centered
      hide-footer
    >

      <div class="add-income-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-4">
              <b-form-input type="text"
                        label="Amount"
                        placeholder="Amount"
                        v-model="incomeData.Amount"
                        required
              >
              </b-form-input>
            </div>
            <div class="col-md-4">
              <b-form-input type="text"
                        label="Account"
                        placeholder="Account"
                        v-model="incomeData.Account">
              </b-form-input>
            </div>
            <div class="col-md-4">
              <b-form-input type="date"
                        label="Date"
                        placeholder="Date"
                        v-model="incomeData.Date">
              </b-form-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <label aria-label="label">Category</label>
              <b-form-select class="form-control border-input"
                             v-model="incomeData.CategoryID"
                             required
              >
                <option
                  v-for="incomeCategory in incomeCategories.data"
                  :value="incomeCategory.id"
                  :key="incomeCategory.id">
                  {{ incomeCategory.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Shop</label>
              <b-form-select class="form-control border-input"
                             v-model="incomeData.ShopID"
                             required
              >
                <option :value="null" disabled>Select Shop</option>
                <option
                  v-for="incomeShop in incomeShops.data"
                  :value="incomeShop.id"
                  :key="incomeShop.id">
                  {{ incomeShop.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Terminal</label>
              <b-form-select class="form-control border-input" v-model="incomeData.TerminalID">
                <option :value="null" disabled>Select Terminal</option>
                <option
                  v-for="incomeTerminal in incomeTerminals.data"
                  :value="incomeTerminal.id"
                  :key="incomeTerminal.id">
                  {{ incomeTerminal.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Shop Floor</label>
              <b-form-select class="form-control border-input" v-model="incomeData.FloorID">
                <option
                  v-for="incomeFloor in incomeFloors.data"
                  :value="incomeFloor.id"
                  :key="incomeFloor.id">
                  {{ incomeFloor.Name }}
                </option>
              </b-form-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>About Income</label>
                <textarea rows="5" class="form-control border-input"
                          placeholder="Here can be your description"
                          v-model="incomeData.Notes">
                </textarea>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateIncome(incomeData.id)">
              Update Income
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>
    {{incomeTerminals.data[0].id}}

  </div>
</template>

<script>
import axios from 'axios'

const tableColumns = ['ID', 'Category', 'Shop', 'Terminal', 'Floor', 'Account', 'Amount', 'Notes', 'Action']

export default {
  data () {
    return {
      table: {
        title: 'Incomes overview',
        subTitle: 'Recent income.',
        columns: [...tableColumns]
      },

      incomeData: {
        id: null,
        CategoryID: null,
        ShopID: null,
        UserID: 1,
        TerminalID: null,
        FloorID: null,
        Account: null,
        Amount: null,
        Notes: null,
        Date: null
      },
      UserID: null,
      incomes: {
        total: 0,
        per_page: 10,
        from: 1,
        to: 0,
        current_page: 1
      },
      incomeCategories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      incomeShops: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      incomeTerminals: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      incomeFloors: {
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
    this.getIncomes()
    this.getIncomeCategories()
    this.getIncomeShops()
    this.getIncomeTerminals()
    this.getIncomeFloors()
    this.getUserInformation()
  },
  methods: {
    getIncomes () {
      axios.get(`http://techlab.classy.pos/Api/V1/Accounts/Income/Filter/0/0/0/0/0/0?page=${this.incomes.current_page}`)
        .then((response) => {
          this.incomes = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getIncomeCategories () {
      axios.get(`http://techlab.classy.pos/Api/V1/Accounts/Income/Category/List?page=${this.incomeCategories.current_page}`)
        .then((response) => {
          this.incomeCategories = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getIncomeShops () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Shop/List?page=${this.incomeShops.current_page}`)
        .then((response) => {
          this.incomeShops = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getIncomeTerminals () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Terminal/List?page=${this.incomeTerminals.current_page}`)
        .then((response) => {
          this.incomeTerminals = response.data

          // alert(this.incomeTerminals.data.data.length)
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getIncomeFloors () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Floor/List?page=${this.incomeFloors.current_page}`)
        .then((response) => {
          this.incomeFloors = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    detailsIncome (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Accounts/Income/Details/' + id)
        .then((resp) => {
          this.incomeData = resp.data
        })
        .catch(function (e) {
          alert('Could not load your company' + e.message.toString())
        })
    },
    addIncome () {
      this.incomeData.UserID = this.UserID
      axios.post('http://techlab.classy.pos/Api/V1/Accounts/Income/New', this.incomeData)
        .then((response) => {
          // console.log(response.data)
          // this.incomes.data.push(response.data)
          this.getIncomes()
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    updateIncome (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Accounts/Income/Update/' + id, this.incomeData)
        .then((response) => {
          this.getIncomes()
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    deleteIncome (income) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this income!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Accounts/Income/Trash/New/' + income.id)
            .then((response) => {
              const idx = this.incomes.data.indexOf(income)
              this.incomes.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    getUserInformation () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      axios.get(`http://techlab.classy.pos/Api/UserInformation?token=` + Token)
        .then((response) => {
          this.UserID = response.data.id
        })
        .catch(({response}) => {
          localStorage.setItem('vue-authenticate.vueauth_token', '')
          window.location = '/#/pages/login'
        })
    },
    showAddIncome () {
      this.reset()
      this.incomeData.CategoryID = this.incomeCategories.data[0].id
      this.incomeData.ShopID = this.incomeShops.data[0].id
      this.incomeData.FloorID = this.incomeFloors.data[0].id
      this.incomeData.TerminalID = this.incomeTerminals.data[0].id
      this.$refs.addIncomeModal.show()
    },
    editIncome (id) {
      this.detailsIncome(id)
      this.$refs.editIncomeModal.show()
    },
    getIncome (id) {
      this.detailsIncome(id)
      this.$refs.detailsIncomeModal.show()
    },

    setErrors (response) {
      this.errors = response.data.errors
    },

    setSuccessMessage () {
      this.reset()
    },

    reset () {
      this.$refs.addIncomeModal.hide()
      this.$refs.detailsIncomeModal.hide()
      this.$refs.editIncomeModal.hide()
      this.errors = []
      this.incomeData = {
        Name: null,
        CategoryID: null,
        VendorID: null,
        BrandID: null,
        Description: null,
        SalePrice: null,
        Image: null,
        Date: null
      }
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
  .anti-fade {
    opacity: 1 !important;
  }
</style>
