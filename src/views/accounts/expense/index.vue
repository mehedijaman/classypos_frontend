<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <b-btn class="pull-right" @click.prevent="showAddExpense">Add Expense</b-btn>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in table.columns" :key="column.id">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="expense in expenses.data" :key="expense.id">
              <td>{{ expense.id }}</td>
              <td>{{ expense.ExpenseBy }}</td>
              <td>{{ expense.CategoryName }}</td>
              <td>{{ expense.ShopName }}</td>
              <td>{{ expense.TerminalName }}</td>
              <td>{{ expense.FloorName }}</td>
              <td>{{ expense.Account }}</td>
              <td>{{ expense.Amount }}</td>
              <td>{{ expense.Notes }}</td>
              <td>
                <b-btn @click.prevent="getExpense(expense.id)"><i class="fa fa-info"></i></b-btn>
                <b-btn @click.prevent="editExpense(expense.id)"><i class="fa fa-edit"></i></b-btn>
                <b-btn class="btn-danger" @click.prevent="deleteExpense(expense)" ><i class="fa fa-trash"></i></b-btn>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div>
      <b-pagination align="right"
        :total-rows="expenses.total"
        v-model="expenses.current_page"
        :per-page="expenses.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="get-expense-modal"
      ref="detailsExpenseModal"
      title="Add Expense"
      centered
      hide-footer
    >
      <div class="bank-info">
        <p>{{ expenseData.id }}</p>
        <p>{{ expenseData.ExpenseBy }}</p>
        <p>{{ expenseData.CategoryID }}</p>
        <p>{{ expenseData.ShopID }}</p>
        <p>{{ expenseData.TerminalID }}</p>
        <p>{{ expenseData.FloorID }}</p>
        <p>{{ expenseData.Account }}</p>
        <p>{{ expenseData.Amount }}</p>
        <p>{{ expenseData.Notes }}</p>
        <p>{{ expenseData.Date }}</p>
      </div>
    </b-modal>

    <b-modal
      id="add-expense-modal"
      ref="addExpenseModal"
      size="lg"
      title="Add Expense"
      centered
      hide-footer
    >

      <div class="add-expense-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-3">
              <b-form-input type="text"
                        label="Expense By"
                        placeholder="Expense by"
                        v-model="expenseData.ExpenseBy"
                        required
              >
              </b-form-input>
            </div>
            <div class="col-md-3">
              <b-form-input type="number"
                        label="Amount"
                        placeholder="Amount"
                        v-model="expenseData.Amount"
                        required
              >
              </b-form-input>
            </div>
            <div class="col-md-3">
              <b-form-input type="text"
                        label="Account"
                        placeholder="Account"
                        v-model="expenseData.Account">
              </b-form-input>
            </div>
            <div class="col-md-3">
              <b-form-input type="date"
                        label="Date"
                        placeholder="Date"
                        v-model="expenseData.Date">
              </b-form-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <label aria-label="label">Category</label>
              <b-form-select class="form-control border-input"
                             v-model="expenseData.CategoryID"
                             required
              >
                <option
                  v-for="expenseCategory in expenseCategories.data"
                  :value="expenseCategory.id"
                  :key="expenseCategory.id">
                  {{ expenseCategory.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Shop</label>
              <b-form-select class="form-control border-input"
                             v-model="expenseData.ShopID"
              >
                <option
                  v-for="expenseShop in expenseShops.data"
                  :value="expenseShop.id"
                  :key="expenseShop.id">
                  {{ expenseShop.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Terminal</label>
              <b-form-select class="form-control border-input"
                             v-model="expenseData.TerminalID">
                <option
                  v-for="expenseTerminal in expenseTerminals.data"
                  :value="expenseTerminal.id"
                  :key="expenseTerminal.id">
                  {{ expenseTerminal.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Shop Floor</label>
              <b-form-select class="form-control border-input"
                             v-model="expenseData.FloorID">
                <option
                  v-for="expenseFloor in expenseFloors.data"
                  :value="expenseFloor.id"
                  :key="expenseFloor.id">
                  {{ expenseFloor.Name }}
                </option>
              </b-form-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>About Expense</label>
                <textarea rows="5" class="form-control border-input"
                          placeholder="Here can be your description"
                          v-model="expenseData.Notes">
                </textarea>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addExpense">
              Add Expense
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="update-expense-modal"
      ref="editExpenseModal"
      size="lg"
      title="Edit Expense"
      centered
      hide-footer
    >

      <div class="edit-expense-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-3">
              <b-form-input type="text"
                        label="Expense By"
                        placeholder="Expense by"
                        v-model="expenseData.ExpenseBy"
                        required
              >
              </b-form-input>
            </div>
            <div class="col-md-3">
              <b-form-input type="number"
                        label="Amount"
                        placeholder="Amount"
                        v-model="expenseData.Amount"
                        required
              >
              </b-form-input>
            </div>
            <div class="col-md-3">
              <b-form-input type="text"
                        label="Account"
                        placeholder="Account"
                        v-model="expenseData.Account">
              </b-form-input>
            </div>
            <div class="col-md-3">
              <b-form-input type="date"
                        label="Date"
                        placeholder="Date"
                        v-model="expenseData.Date">
              </b-form-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <label aria-label="label">Category</label>
              <b-form-select class="form-control border-input"
                             v-model="expenseData.CategoryID"
                             required
              >
                <option
                  v-for="expenseCategory in expenseCategories.data"
                  :value="expenseCategory.id"
                  :key="expenseCategory.id">
                  {{ expenseCategory.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Shop</label>
              <b-form-select class="form-control border-input"
                             v-model="expenseData.ShopID"
              >
                <option
                  v-for="expenseShop in expenseShops.data"
                  :value="expenseShop.id"
                  :key="expenseShop.id">
                  {{ expenseShop.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Terminal</label>
              <b-form-select class="form-control border-input"
                             v-model="expenseData.TerminalID">
                <option
                  v-for="expenseTerminal in expenseTerminals.data"
                  :value="expenseTerminal.id"
                  :key="expenseTerminal.id">
                  {{ expenseTerminal.Name }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-3">
              <label aria-label="label">Shop Floor</label>
              <b-form-select class="form-control border-input"
                             v-model="expenseData.FloorID">
                <option
                  v-for="expenseFloor in expenseFloors.data"
                  :value="expenseFloor.id"
                  :key="expenseFloor.id">
                  {{ expenseFloor.Name }}
                </option>
              </b-form-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>About Expense</label>
                <textarea rows="5" class="form-control border-input"
                          placeholder="Here can be your description"
                          v-model="expenseData.Notes">
                </textarea>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateExpense(expenseData.id)">
              Update Expense
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

const tableColumns = ['ID', 'Expense By', 'Category Name', 'Shop Name', 'Terminal Name', 'Floor Name', 'Account', 'Amount', 'Notes', 'Action']

export default {
  data () {
    return {
      table: {
        title: 'Expenses overview',
        subTitle: 'Recent expense.',
        columns: [...tableColumns]
      },
      expenseData: {
        id: null,
        CategoryID: null,
        ExpenseBy: null,
        ShopID: null,
        TerminalID: null,
        FloorID: null,
        Account: null,
        Amount: null,
        Notes: null,
        Date: null
      },
      expenses: {
        total: 0,
        per_page: 10,
        from: 1,
        to: 0,
        current_page: 1
      },
      expenseCategories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      expenseShops: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      expenseTerminals: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      expenseFloors: {
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
    this.getExpenses()
    this.getExpenseCategories()
    this.getExpenseShops()
    this.getExpenseTerminals()
    this.getExpenseFloors()
  },
  methods: {
    getExpenses () {
      axios.get(`http://techlab.classy.pos/Api/V1/Accounts/Expense/Filter/0/0/0/0/0/0?page=${this.expenses.current_page}`)
        .then((response) => {
          this.expenses = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getExpenseCategories () {
      axios.get(`http://techlab.classy.pos/Api/V1/Accounts/Expense/Category/List?page=${this.expenseCategories.current_page}`)
        .then((response) => {
          this.expenseCategories = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getExpenseShops () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Shop/List?page=${this.expenseShops.current_page}`)
        .then((response) => {
          this.expenseShops = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getExpenseTerminals () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Terminal/List?page=${this.expenseTerminals.current_page}`)
        .then((response) => {
          this.expenseTerminals = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getExpenseFloors () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Floor/List?page=${this.expenseFloors.current_page}`)
        .then((response) => {
          this.expenseFloors = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    detailsExpense (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Accounts/Expense/Details/' + id)
        .then((resp) => {
          this.expenseData = resp.data
        })
        .catch(function (e) {
          alert('Could not load your company' + e.message.toString())
        })
    },
    addExpense () {
      this.expenseData.UserID = 1
      axios.post('http://techlab.classy.pos/Api/V1/Accounts/Expense/New', this.expenseData)
        .then((response) => {
          this.getExpenses()
          // this.expenses.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    updateExpense (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Accounts/Expense/Update/' + id, this.expenseData)
        .then((response) => {
          this.getExpenses()
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    deleteExpense (expense) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this expense!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Accounts/Expense/Trash/New/' + expense.id)
            .then((response) => {
              const idx = this.expenses.data.indexOf(expense)
              this.expenses.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    showAddExpense () {
      this.reset()
      this.expenseData.CategoryID = this.expenseCategories.data[0].id
      this.expenseData.ShopID = this.expenseShops.data[0].id
      this.expenseData.FloorID = this.expenseFloors.data[0].id
      this.expenseData.TerminalID = this.expenseTerminals.data[0].id
      this.$refs.addExpenseModal.show()
    },
    editExpense (id) {
      this.detailsExpense(id)
      this.$refs.editExpenseModal.show()
    },
    getExpense (id) {
      this.detailsExpense(id)
      this.$refs.detailsExpenseModal.show()
    },

    setErrors (response) {
      this.errors = response.data.errors
    },

    setSuccessMessage () {
      this.reset()
    },

    reset () {
      this.$refs.addExpenseModal.hide()
      this.$refs.detailsExpenseModal.hide()
      this.$refs.editExpenseModal.hide()
      this.errors = []
      this.expenseData = {
        id: null,
        CategoryID: null,
        ExpenseBy: null,
        ShopID: null,
        TerminalID: null,
        FloorID: null,
        Account: null,
        Amount: null,
        Notes: null,
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
