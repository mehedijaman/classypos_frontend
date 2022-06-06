<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
         <div id="app">
  <barcode value="1234567890" style="float:left;" height="20px" fontSize="12"></barcode>
  <barcode value="1234567890" :options="{ lineColor: '#0275d8' }" tag="svg" style="float:left;" height="20px"></barcode>
  <barcode value="1234567890" tag="img"></barcode>
</div>
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12" style="margin-bottom:10px">
          <b-btn class="pull-right" @click.prevent="showAddBankModal">Add Bank</b-btn>
          <b-btn class="pull-right" style="margin-right:10px" @click.prevent="showBankTransactionModal">Bank Transaction</b-btn>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in table.columns" :key="column.id">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="bank in banks.data" :key="bank.id">
              <td>{{ bank.id }}</td>
              <td>{{ bank.Name }}</td>
              <td>{{ bank.Address }}</td>
              <td>{{ bank.AccountName }}</td>
              <td>{{ bank.AccountNumber }}</td>
              <td>{{ bank.Balance }}</td>
              <td>
                <b-btn @click.prevent="getBank(bank.BankID)">
                  <i class="fa fa-info"></i>
                </b-btn>
                <button class="btn btn-primary" @click.prevent="editBank(bank.BankID)">
                  <i class="fa fa-edit"></i>
                </button>
                <router-link :to="{path: '/Accounts/Bank/Ledger/'+bank.BankID}">
                  <b-btn class="btn-success">
                    <i class="fa fa-book"></i>
                  </b-btn>
                </router-link>
                <b-btn class="btn-danger" @click.prevent="deleteBank(bank)" >
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
        :total-rows="banks.total"
        v-model="banks.current_page"
        :per-page="banks.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="details-bank-modal"
      ref="detailsBankModal"
      title="Bank Details"
      centered
      hide-footer
    >
      <div class="bank-info">
        <p>ID: {{ bankData.id }}</p>
        <p>Bank Name: {{ bankData.Name }}</p>
        <p>Bank Address: {{ bankData.Address }}</p>
        <p>Account Name: {{ bankData.AccountName }}</p>
        <p>Account Number: {{ bankData.AccountNumber }}</p>
        <p>Opening Balance: {{ bankData.OpeningBalance }}</p>
        <p>Status: {{ bankData.Status }}</p>
        <p>Is Active: {{ bankData.IsDefault }}</p>
      </div>
    </b-modal>

    <b-modal
      id="add-bank-modal"
      ref="addBankModal"
      size="lg"
      title="Add Bank"
      centered
      hide-footer
    >

      <div class="add-bank-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Bank Name:"
                label-for="bank-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="bank-name"
                          placeholder="Bank Name"
                          v-model="bankData.Name"
                          required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Address:"
                label-for="bank-address"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="bank-address"
                          placeholder="Address"
                          v-model="bankData.Address">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Balance:"
                label-for="bank-opening-balance"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="number"
                          id="bank-opening-balance"
                          placeholder="Opening Balance"
                          v-model="bankData.OpeningBalance">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Account Name:"
                label-for="bank-account-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="bank-account-name"
                              placeholder="Account Name"
                              v-model="bankData.AccountName">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Account Number:"
                label-for="bank-account-number"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="bank-account-number"
                          placeholder="Account Number"
                          v-model="bankData.AccountNumber">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
                <b-form-group
                  label="Default:"
                  label-for="product-status"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="bankData.IsDefault"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="true"/>
                </b-form-group>
              </div>
              <div class="col-md-4">
                <b-form-group
                  label="Status:"
                  label-for="product-status"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="bankData.Status"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="true"/>
                </b-form-group>
              </div>
            </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addBank">
              Add Bank
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="add-bank-modal"
      ref="BankTransactionModal"
      size="lg"
      title="Deposit/Withdraw"
      centered
      hide-footer
    >

      <div class="add-bank-modal-body">
        <b-form validated>
          <div class="container">
            <div class="row">
              <div class="input-group col-md-3">
                <select id="vendor" v-model="Transaction.BankID" class="form-control">
                  <option
                  v-for="BankList in banks.data"
                  :key="BankList.BankID"
                  :value="BankList.BankID">
                  {{ BankList.Name }}
                  </option>
                </select>
                <span class="input-group-addon"><button class="btn btn-primary">Bank</button></span>
              </div>
              <div class="input-group col-md-3">
                <select id="vendor" v-model="Transaction.Method" class="form-control">
                  <option value="1">Withdraw</option>
                  <option value="2">Deposit</option>
                </select>
                <span class="input-group-addon"><button class="btn btn-primary">Type</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="text" placeholder="Amount" class="form-control" v-model="Transaction.Balance">
                <span class="input-group-addon"><button class="btn btn-danger">Amount</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="text" placeholder="Cheque Number" class="form-control" v-model="Transaction.ChequeNumber">
                <span class="input-group-addon"><button class="btn btn-primary">Cheque</button></span>
              </div>
            </div>
            <div class="row" style="margin-top:10px">
              <div class="input-group col-md-3">
                <input type="text" placeholder="Reference Cheque Number" class="form-control" v-model="Transaction.RefChequeNumber">
                <span class="input-group-addon"><button class="btn btn-primary">Ref.Cheque</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="text" placeholder="Reference Bank" class="form-control" v-model="Transaction.RefBank">
                <span class="input-group-addon"><button class="btn btn-primary">Ref.Bank</button></span>
              </div>
              <div class="input-group col-md-3">
                <select id="vendor" v-model="Transaction.TxBy" class="form-control">
                  <option
                  v-for="EmployeeList in employees.data"
                  :key="EmployeeList.id"
                  :value="EmployeeList.id">
                  {{ EmployeeList.Name }}
                  </option>
                  <!-- <option value="1">Withdraw</option>
                  <option value="2">Deposit</option> -->
                </select>
                <!-- <input type="text" placeholder="Taken By" class="form-control" v-model="Transaction.TxBy"> -->
                <span class="input-group-addon"><button class="btn btn-primary">Taken By</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="text" placeholder="Notes" class="form-control" v-model="Transaction.Notes">
                <span class="input-group-addon"><button class="btn btn-primary">Notes</button></span>
              </div>
            </div>
            <div class="row" style="margin-top:10px">
              <div class="input-group col-md-3 offset-0">
                <input type="date" class="form-control" v-model="Transaction.Date">
                <span class="input-group-addon"><button class="btn btn-primary">Payment Date</button></span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 offset-3">
                <button type="submit" class="btn btn-info btn-fill btn-wd form-control" @click.prevent="bankTransaction">
                Submit to Bank
                </button>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-bank-modal"
      ref="editBankModal"
      size="lg"
      title="Edit Bank"
      centered
      hide-footer
    >

      <div class="edit-bank-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Bank Name:"
                label-for="bank-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="bank-name"
                              placeholder="Bank Name"
                              v-model="bankData.Name"
                              required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Address:"
                label-for="bank-address"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="bank-address"
                              placeholder="Address"
                              v-model="bankData.Address">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Balance:"
                label-for="bank-opening-balance"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="number"
                              id="bank-opening-balance"
                              placeholder="Opening Balance"
                              v-model="bankData.OpeningBalance">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Account Name:"
                label-for="bank-account-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="bank-account-name"
                              placeholder="Account Name"
                              v-model="bankData.AccountName">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Account Number:"
                label-for="bank-account-number"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="bank-account-number"
                          placeholder="Account Number"
                          v-model="bankData.AccountNumber">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
                <b-form-group
                  label="Default:"
                  label-for="product-status"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="bankData.IsDefault"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
                </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group
                label="Status:"
                label-for="product-status"
                :label-cols="3"
                :horizontal="true">
                <c-switch type="icon"
                          v-model="bankData.Status"
                          variant="success"
                          v-bind="{on: '\uf00c', off: '\uf00d'}"
                          :pill="true"
                          :checked="false"/>
              </b-form-group>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateBank(bankData.id)">
              Update Bank
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
import VueBarcode from 'vue-barcode'
// import canvas from 'canvas'
import cSwitch from '../../components/Switch'

const tableColumns = ['ID', 'Name', 'Address', 'Account Name', 'Account Number', 'Balance', 'Action']

export default {
  components: {
    cSwitch,
    'barcode': VueBarcode
  },
  data () {
    return {
      table: {
        title: 'Banks overview',
        subTitle: 'Your banking details.',
        columns: [...tableColumns]
      },
      Transaction: {
        BankID: null,
        UserID: 1,
        Method: 1,
        ChequeNumber: null,
        RefChequeNumber: null,
        RefBank: null,
        Withdraw: 0,
        Deposit: 0,
        Balance: 0
      },
      employees: {

      },
      bankData: {
        id: null,
        Name: null,
        Address: null,
        UserID: 1,
        OpeningBalance: 0,
        AccountName: null,
        AccountNumber: null,
        IsDefault: true,
        Status: true,
        BankID: null
      },
      banks: {
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
    this.getBanks()
    this.getEmployees()
  },
  methods: {
    bankTransaction () {
      if (this.Transaction.Method === 1) {
        this.Transaction.Withdraw = this.Transaction.Balance
      } else {
        this.Transaction.Deposit = this.Transaction.Balance
      }
      axios.post('http://techlab.classy.pos/Api/V1/Banks/Bank/Transaction', this.Transaction)
        .then((response) => {
          // alert(response.data)
          // this.banks.data.push(response.data)
          this.getBanks()
          this.setSuccessMessage()
          this.$refs.BankTransactionModal.hide()
        })
        .catch((response) => this.setErrors(response))
    },
    getEmployees () {
      axios.get(`http://techlab.classy.pos/Api/V1/Employees/Employee/List`)
        .then((response) => {
          this.employees = response.data
          this.Transaction.TxBy = response.data.data[0].id
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getBanks () {
      axios.get(`http://techlab.classy.pos/Api/V1/Banks/Bank/List?page=${this.banks.current_page}`)
        .then((response) => {
          // alert(response.data.data[0].Balance)
          this.banks = response.data
          // alert(response.data.data[0].id)
          this.Transaction.BankID = response.data.data[0].BankID
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    detailsBank (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Banks/Bank/Details/' + id)
        .then((response) => {
          // this.bankData.IsDefault =true
          // this.bankData.Status =true
          this.bankData = response.data
          if (response.data.IsDefault === 1) {
            this.bankData.IsDefault = true
          } else {
            this.bankData.IsDefault = false
          }
          if (this.bankData.Status === 1) {
            this.bankData.Status = true
          } else {
            this.bankData.Status = false
          }
        })
        .catch(function (e) {
          alert('Could not load your bank ' + e.message.toString())
        })
    },
    addBank () {
      this.bankData.UserID = 1
      axios.post('http://techlab.classy.pos/Api/V1/Banks/Bank/New', this.bankData)
        .then((response) => {
          // alert(response.data)
          this.banks.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch((response) => this.setErrors(response))
    },
    updateBank (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Banks/Bank/Update/' + id, this.bankData)
        .then((response) => {
          for (var i = 0; i < this.banks.data.length; i++) {
            if (this.banks.data[i].BankID === id) {
              this.banks.data[i].Name = this.bankData.Name
              this.banks.data[i].Address = this.bankData.Address
              this.banks.data[i].AccountName = this.bankData.AccountName
              this.banks.data[i].AccountNumber = this.bankData.AccountNumber
              this.banks.data[i].OpeningBalance = this.bankData.OpeningBalance
              break
            }
          }
          this.setSuccessMessage()
        })
        .catch((response) => this.setErrors(response))
    },
    deleteBank (bank) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this bank!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Banks/Bank/Trash/New/' + bank.BankID)
            .then((response) => {
              const idx = this.banks.data.indexOf(bank)
              this.banks.data.splice(idx, 1)
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
    editBank (id) {
      alert(id)
      this.detailsBank(id)
      this.$refs.editBankModal.show()
    },
    getBank (id) {
      this.detailsBank(id)
      this.$refs.detailsBankModal.show()
    },
    showAddBankModal () {
      this.reset()
      this.bankData.Status = true
      this.bankData.IsDefault = true
      this.$refs.addBankModal.show()
    },
    showBankTransactionModal () {
      // alert('Bank Transaction Modal')
      this.$refs.BankTransactionModal.show()
    },
    reset () {
      this.$refs.addBankModal.hide()
      this.$refs.detailsBankModal.hide()
      this.$refs.editBankModal.hide()
      this.errors = []
      this.bankData = {
        Name: null,
        Address: null,
        OpeningBalance: null,
        AccountName: null,
        AccountNumber: null,
        IsDefault: null,
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
