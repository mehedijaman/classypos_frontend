<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <button @click.prevent="showAddEmployeeModal" type="button" class="btn btn-wd btn-success pull-right" style="margin-bottom:12px;">
            Add Employee
          </button>
          <b-btn class="pull-right btn btn-danger" style="margin-right:10px" @click.prevent="showContacttransactionModal">transaction</b-btn>
          <!-- <div class="col-md-4">
            <select v-on:click="ContactFilter()" v-model="ContactFiltering" class="form-control">
              <option :value=null>Select Contact Type</option>
              <option :value=1>Customer</option>
              <option :value=2>Vendor</option>
            </select>
          </div> -->
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in tableColumnNames" :key="column">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="(vendor,index) in employees.data" :key="vendor.id">
              <td>{{ vendor.Code }}</td>
              <td>{{ vendor.Name }}</td>
              <td>{{ vendor.Address }}</td>
              <td>{{ vendor.Phone }}</td>
              <td>{{ vendor.created_at }}</td>
              <td v-if="vendor.Status === 0"><b-badge variant="secondary">InActive</b-badge></td>
              <td v-else><b-badge variant="success">Active</b-badge></td>
              <!-- <td><img src="/static/img/avatars/1.jpg" width="50" height="50"></td> -->
              <td>
                <b-btn @click.prevent="getEmployee(vendor.id)" class="btn-success">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editEmployee(vendor.id,index)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <router-link :to="{path: '/Employee/Ledger/'+vendor.id}">
                  <button class="btn btn-primary" title="Ledger">
                    <i class="fa fa-book"></i>
                  </button>
                </router-link>
                <b-btn @click.prevent="deleteEmployee(vendor)" class="btn-danger">
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
                    :total-rows="vendors.total"
                    v-model="vendors.current_page"
                    :per-page="vendors.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="details-vendor-modal"
      ref="detailsEmployeeModal"
      size="lg"
      title="Details Employee"
      centered
      hide-footer
    >
      <div class="vendor-info">
        <table class="table table-bordered text-center table-striped">
        <tr><td><b>ID</b></td><td>{{ Employee.id }}</td></tr>
        <tr><td><b>Name</b></td><td>{{ Employee.Name }}</td></tr>
        <tr><td><b>Address</b></td><td>{{ Employee.Address }}</td></tr>
        <tr><td><b>Phone</b></td><td>{{ Employee.Phone }}</td></tr>
        <tr><td><b>Email</b></td><td>{{ Employee.Email }}</td></tr>
        <tr><td><b>Bank</b></td><td>{{ Employee.BankName }}</td></tr>
        <tr><td><b>Account Number</b></td><td>{{ Employee.AccountNumber }}</td></tr>
        <tr><td><b>Blood Group</b></td><td>{{ Employee.BloodGroup }}</td></tr>
        <tr><td><b>Joining Date</b></td><td>{{ Employee.JoiningDate }}</td></tr>
        </table>
        <!-- <p>ID: {{ vendorData.id }}</p>
        <p>Vendor Name: {{ vendorData.CompanyName }}</p>
        <p>Address: {{ vendorData.BillingAddress }}</p>
        <p>Vendor Phone: {{ vendorData.Phone }}</p>
        <p>City: {{ vendorData.BillingAddress }} </p> -->
      </div>
    </b-modal>

    <b-modal
      id="add-Employee-modal"
      ref="addEmployeeModal"
      size="lg"
      title="Add Employee"
      centered
      hide-footer
    >

      <div class="add-employee-modal-body">
        <b-form validated enctype="multipart/form-data">

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Shop:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                 <select class="form-control" v-model="Employee.ShopID">
                  <option
                    v-for="shop in shops.data"
                    :key="shop.id"
                    :value="shop.id">
                    {{ shop.Name }}
                  </option>
                </select>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Name:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Contact Name"
                          v-model="Employee.Name">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Code:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter Code Name"
                          v-model="Employee.Code">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Date of Birth:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="date"
                          id="vendor-contact-name"
                          placeholder="Contact Name"
                          v-model="Employee.DateOfBirth">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Marital Status:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <select v-model="Employee.MaritalStatus" class="form-control">
                  <option value="Married">Married</option>
                  <option value="UnMarried">UnMarried</option>
                </select>
                <!-- <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter Vendor Name"
                          v-model="vendorData.CompanyName">
                </b-form-input> -->
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Gender:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">

                <select v-model="Employee.Gender" class="form-control">
                  <option value="Male">Male</option>
                  <option value="Female" >Female</option>
                </select>

                <!-- <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Contact Name"
                          v-model="vendorData.DisplayName">
                </b-form-input> -->
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Qualification:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Qualification"
                          v-model="Employee.Qualification">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Address:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Address"
                          v-model="Employee.Address">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Phone:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Phone"
                          v-model="Employee.Phone">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Email:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Email"
                          v-model="Employee.Email">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Joining Date:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="date"
                          id="vendor-company-name"
                          placeholder="Joining Date"
                          v-model="Employee.JoiningDate">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Termination Date:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="date"
                          id="vendor-contact-name"
                          placeholder="Termination Date"
                          v-model="Employee.TerminationDate">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Bank Name:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Bank Name"
                          v-model="Employee.BankName">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Blood Group:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Blood Group"
                          v-model="Employee.BloodGroup">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Branch Name:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Branch Name"
                          v-model="Employee.BranchName">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Account Number:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Account Number"
                          v-model="Employee.AccountNumber">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                  label="Status:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="Employee.Status"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="true"/>
                </b-form-group>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="addEmployee">
              Add Employee
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-vendor-modal"
      ref="editEmployeeModal"
      size="lg"
      title="Edit Employee"
      centered
      hide-footer
    >
      <div class="edit-vendor-modal-body">
        <b-form validated>
        <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Shop:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                 <select class="form-control" v-model="Employee.ShopID">
                  <option
                    v-for="shop in shops.data"
                    :key="shop.id"
                    :value="shop.id">
                    {{ shop.Name }} {{shop.id}}
                  </option>
                </select>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Name:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Contact Name"
                          v-model="Employee.Name">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Code:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter Code Name"
                          v-model="Employee.Code">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Date of Birth:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="date"
                          id="vendor-contact-name"
                          placeholder="Contact Name"
                          v-model="Employee.DateOfBirth">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Marital Status:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <select v-model="Employee.MaritalStatus" class="form-control">
                  <option value="Married">Married</option>
                  <option value="UnMarried">UnMarried</option>
                </select>
                <!-- <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter Vendor Name"
                          v-model="vendorData.CompanyName">
                </b-form-input> -->
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Gender:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">

                <select v-model="Employee.Gender" class="form-control">
                  <option value="Male">Male</option>
                  <option value="Female" >Female</option>
                </select>

                <!-- <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Contact Name"
                          v-model="vendorData.DisplayName">
                </b-form-input> -->
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Qualification:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Qualification"
                          v-model="Employee.Qualification">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Address:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Address"
                          v-model="Employee.Address">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Phone:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Phone"
                          v-model="Employee.Phone">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Email:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Email"
                          v-model="Employee.Email">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Joining Date:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="date"
                          id="vendor-company-name"
                          placeholder="Joining Date"
                          v-model="Employee.JoiningDate">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Termination Date:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="date"
                          id="vendor-contact-name"
                          placeholder="Termination Date"
                          v-model="Employee.TerminationDate">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Bank Name:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Bank Name"
                          v-model="Employee.BankName">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Blood Group:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Blood Group"
                          v-model="Employee.BloodGroup">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Branch Name:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Branch Name"
                          v-model="Employee.BranchName">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Account Number:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Account Number"
                          v-model="Employee.AccountNumber">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                  label="Status:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="Employee.Status"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="true"/>
                </b-form-group>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="updateEmployee(Employee.id)">
              Update Employee
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>
    </b-modal>
    <b-modal
      id="add-bank-modal"
      ref="EmployeetransactionModal"
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
                <select id="vendor" v-model="transaction.EmployeeID" class="form-control">
                  <option
                  v-for="EmployeeList in employees.data"
                  :key="EmployeeList.id"
                  :value="EmployeeList.id">
                  {{ EmployeeList.Name }}
                  </option>
                </select>
                <span class="input-group-addon"><button class="btn btn-primary">Employee</button></span>
              </div>
              <div class="input-group col-md-3">
                <select id="vendor" v-model="transaction.Method" class="form-control">
                  <option value="1">Payment</option>
                  <option value="2">Salary</option>
                </select>
                <span class="input-group-addon"><button class="btn btn-primary">Type</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="text" placeholder="Amount" class="form-control" v-model="transaction.Balance">
                <span class="input-group-addon"><button class="btn btn-danger">Amount</button></span>
              </div>
              <!-- <div class="input-group col-md-3">
                <input type="text" placeholder="Cheque Number" class="form-control" v-model="transaction.ChequeNumber">
                <span class="input-group-addon"><button class="btn btn-primary">Cheque</button></span>
              </div> -->
            </div>
            <div class="row" style="margin-top:10px">
              <!-- <div class="input-group col-md-3">
                <input type="text" placeholder="Taken By" class="form-control" v-model="transaction.TxBy">
                <span class="input-group-addon"><button class="btn btn-primary">Taken By</button></span>
              </div> -->
              <div class="input-group col-md-3 offset-0">
                <input type="date" class="form-control" v-model="transaction.Date">
                <span class="input-group-addon"><button class="btn btn-primary">Payment Date</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="text" placeholder="Notes" class="form-control" v-model="transaction.Notes">
                <span class="input-group-addon"><button class="btn btn-primary">Notes</button></span>
              </div>
              <div class="col-md-3">
                <select class="form-control" v-model="transaction.IsBank">
                <!-- <span class="input-group-addon"><button class="btn btn-primary">Memo</button></span> -->
                  <option value="0">Cash</option>
                  <option value="1">Bank</option>
                </select>
              </div>
            </div>
            <div class="row" style="margin-top:10px; margin-bottom:10px;" v-if="transaction.IsBank==1">
              <div class="input-group col-md-3">
                <select class="form-control" v-model="transaction.BankID">
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
                <input type="number" placeholder="Cheque Number" class="form-control" v-model="transaction.ChequeNumber">
                <span class="input-group-addon"><button class="btn btn-primary">Cheque</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="text" placeholder="Reference Bank" class="form-control" v-model="transaction.RefBank">
                <span class="input-group-addon"><button class="btn btn-primary">Ref.Bank</button></span>
              </div>
            </div>
            <div class="row" style="margin-top:10px; margin-bottom:10px;" v-if="transaction.IsBank==1">
              <div class="input-group col-md-3">
                <input type="text" placeholder="Reference Cheque Number" class="form-control" v-model="transaction.RefChequeNumber">
                <span class="input-group-addon"><button class="btn btn-primary">Ref.Cheque</button></span>
              </div>
              <div class="input-group col-md-3">
                <select id="vendor" v-model="transaction.TxBy" class="form-control">
                  <option
                  v-for="EmployeeList in employees.data"
                  :key="EmployeeList.id"
                  :value="EmployeeList.id">
                  {{ EmployeeList.Name }}
                  </option>
                </select>
                <span class="input-group-addon"><button class="btn btn-primary">Taken By</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="number" placeholder="B.Amount" class="form-control" v-model="transaction.BankAmount" v-on:click="PaymentOption()">
                <span class="input-group-addon"><button class="btn btn-primary">B.Amount</button></span>
              </div>

            </div>
            <div class="row" style="margin-top:10px;">
              <div class="col-md-4 offset-3">
                <button type="submit" class="btn btn-info btn-fill btn-wd form-control" @click.prevent="banktransaction">
                Submit
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addBank">
              Submit to Bank
            </button>
          </div> -->
          <div class="clearfix"></div>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import cSwitch from '../../components/Switch'

const tableColumns = ['Codefgsfd', 'Contact Name', 'Address', 'Phone', 'Start Date', 'Status', 'Image', 'Action']
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  components: {
    cSwitch,
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase()
      }
    }
  },

  // Vue.filter('formatDate', function(value) {
  // if (value) {
  //   return moment(String(value)).format('MM/DD/YYYY hh:mm')
  // }
  // }
  data () {
    return {
      table: {
        title: 'Employee List',
        subTitle: 'List of All Employee in the Organization.',
        columns: [...tableColumns]
      },
      file: '',
      tableColumnNames: ['Code', 'Employee Name', 'Address', 'Phone', 'Joining Date', 'Status', 'Action'],
      ContactFiltering: null,
      fahad: {
        image: 'http://lorempixel.com/g/400/200/'
      },
      Employee: {
        ShopID: 1,
        UserID: 1,
        Name: null,
        Code: null,
        DateOfBirth: null,
        MaritalStatus: 'Married',
        Gender: 'Male',
        Qualification: null,
        Address: null,
        Phone: null,
        Email: null,
        JoiningDate: null,
        TerminationDate: null,
        Status: null,
        BloodGroup: null,
        BankName: null,
        BranchName: null,
        AccountNumber: null
      },
      vendorData: {
        id: null,
        CompanyName: null,
        DisplayName: null,
        FirstName: null,
        MiddleName: null,
        IsCustomer: null,
        IsVendor: null,
        LastName: null,
        Suffix: null,
        Type: null,
        Title: null,
        BillingAddress: null,
        BillingCity: null,
        BillingState: null,
        BillingZipCode: null,
        BillingCountry: null,
        ShippingAddress: null,
        ShippingCity: null,
        ShippingState: null,
        ShippingZipCode: null,
        ShippingCountry: null,
        PaymentMethod: null,
        DeliveryMethod: null,
        AsOf: null,
        Reference: null,
        TIN: null,
        Attachment: null,
        Mobile: null,
        Phone: null,
        Email: null,
        Website: null,
        Image: null,
        Notes: null,
        OpeningBalance: null,
        Status: null,
        UserID: 1
      },
      transaction: {
        EmployeeID: 0,
        UserID: 1,
        InvoiceID: 0,
        TxBy: 0,
        PurchaseInvoiceID: 0,
        PurchaseOrderID: 0,
        MemoNo: 0,
        PaymentMethod: 0,
        BankAmount: 0,
        ChequeNumber: 0,
        EmployeeDebit: 0,
        EmployeeCredit: 0,
        Notes: null,
        DueDate: null,
        PaymentDate: null,
        IsApproved: 0,
        Status: 1,
        Method: 1,
        IsBank: 0,
        BankID: null
      },
      employees: {
      },
      vendorstransaction: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      vendors: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      banks: {
        total: 0,
        per_page: 10,
        from: 1,
        to: 0,
        current_page: 1
      },
      shops: {
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
    this.getEmployees()
    this.getBanks()
    this.getShops()
    this.AuthCheck()
    // this.Employee.Gender = "Married"
  },
  methods: {
    AuthCheck () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === null || Token === '') {
        window.location = '/#/pages/login'
      }
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      // alert('I am Asif')
    },
    banktransaction () {
      if (this.transaction.Method === 1) {
        this.transaction.EmployeeDebit = this.transaction.Balance
        this.transaction.EmployeeCredit = 0
      } else {
        this.transaction.EmployeeCredit = this.transaction.Balance
        this.transaction.EmployeeDebit = 0
      }
      this.transaction.UserID = 1
      // alert('I am In Transaction Mode')
      axios.post('http://techlab.classy.pos/Api/V1/Employees/Employee/Transaction', this.transaction)
        .then((response) => {
          this.$refs.EmployeetransactionModal.hide()
          // alert(response.data)
          // this.banks.data.push(response.data)
          // this.setSuccessMessage()
        })
        .catch((response) => this.setErrors(response))
    },
    getShops () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Shop/List?page=${this.shops.current_page}`)
        .then((response) => {
          this.shops = response.data
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
          // alert(response.data.data[0].BankID)
          this.transaction.BankID = response.data.data[0].BankID
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getEmployees () {
      axios.get(`http://techlab.classy.pos/Api/V1/Employees/Employee/List`)
        .then((response) => {
          this.employees = response.data
          this.transaction.EmployeeID = response.data.data[0].id
          this.transaction.TxBy = response.data.data[0].id
          // alert(response.data.data[0].id)
          // this.vendorstransaction = response.data
          // alert(response.data.data[0].id)
          // this.transaction.ContactID = response.data.data[0].id
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    addEmployee () {
      // this.$refs.addEmployeeModal.hide()
      axios.post('http://techlab.classy.pos/Api/V1/Employees/Employee/New', this.Employee)
        .then((response) => {
          alert(response.data)
          // alert('I am Aftab')
          // this.$refs.addVendorModal.hide()
          this.$refs.addEmployeeModal.hide()
          this.getEmployees()
          // alert(response.data)
          // this.vendors.data.push(response.data)
          // this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    deleteEmployee (employee) {
      // alert(employee.id)
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this vendor!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          // alert('Vendor Information'+vendor.id)
          axios.delete('http://techlab.classy.pos/Api/V1/Employees/Employee/Trash/New/' + employee.id)
            .then((response) => {
              this.getEmployees()
              // const idx = this.vendors.data.indexOf(vendor)
              // this.vendors.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    detailsEmployee (id, index) {
      axios.get('http://techlab.classy.pos/Api/V1/Employees/Employee/Details/' + id)
        .then((resp) => {
          this.Employee = resp.data
        })
        .catch(function () {
          alert('Could not load your Vendor: ' + id)
        })
    },
    updateEmployee (id) {
      // alert(id)
      axios.put('http://techlab.classy.pos/Api/V1/Employees/Employee/Update/' + id, this.Employee)
        .then((response) => {
          this.$refs.editEmployeeModal.hide()
          console.log(response.data)
          this.getEmployees()
        })
        .catch(({response}) => this.setErrors(response))
    },
    showContacttransactionModal () {
      // alert('Something is done')
      this.$refs.EmployeetransactionModal.show()
    },
    setErrors (response) {
      this.errors = response.data.errors
    },

    setSuccessMessage () {
      this.reset()
    },

    reset () {
      this.$refs.addVendorModal.hide()
      this.$refs.detailsVendorModal.hide()
      this.$refs.editVendorModal.hide()
      this.errors = []
      this.vendorData = {
        id: null,
        CompanyName: null,
        ContactName: null,
        Address: null,
        City: null,
        Province: null,
        ZipCode: null,
        Country: null,
        ContactPhone: null,
        CompanyPhone: null,
        Fax: null,
        Email: null,
        Website: null,
        Image: null,
        Notes: null,
        OpeningBalance: null,
        Status: null
      }
    },
    showAddEmployeeModal () {
      // alert('Saeed Anwar')
      // this.reset()
      // this.vendorData.IsVendor = 22
      // this.vendorData.IsCustomer = 22
      this.$refs.addEmployeeModal.show()
    },
    editEmployee (id, index) {
      // alert("dsfgsdfghsdf"+index)
      this.detailsEmployee(id, index)
      this.$refs.editEmployeeModal.show()
    },
    getEmployee (id) {
      this.detailsEmployee(id)
      this.$refs.detailsEmployeeModal.show()
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
  .modal-lg {
    width: 100% !important;
  }
</style>
