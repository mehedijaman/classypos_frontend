<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <button @click.prevent="showAddVendorModal" type="button" class="btn btn-wd btn-success pull-right" style="margin-bottom:12px;">
            Add Contact
          </button>
          <b-btn class="pull-right btn btn-danger" style="margin-right:10px" @click.prevent="showContacttransactionModal">transaction</b-btn>
          <div class="col-md-4">
            <select v-on:click="ContactFilter()" v-model="ContactFiltering" class="form-control">
              <option :value=null>Select Contact Type</option>
              <option :value=1>Customer</option>
              <option :value=2>Vendor</option>
            </select>
          </div>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in tableColumnNames" :key="column">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="(vendor,index) in vendors.data" :key="vendor.id">
              <td>{{ vendor.id }}</td>
              <td>{{ vendor.CompanyName }}</td>
              <td>{{ vendor.BillingAddress }}</td>
              <td>{{ vendor.Phone }}</td>
              <td>{{ vendor.created_at }}</td>
              <td v-if="vendor.Status === 0"><b-badge variant="secondary">InActive</b-badge></td>
              <td v-else><b-badge variant="success">Active</b-badge></td>
              <td><img src="/static/img/avatars/1.jpg" width="50" height="50"></td>
              <td>
                <b-btn @click.prevent="getVendor(vendor.id)" class="btn-warning">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editVendor(vendor.id,index)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <router-link :to="{path: '/Contact/Ledger/'+vendor.id}">
                  <button class="btn btn-primary" title="Ledger"><i class="fa fa-book"></i></button>
                </router-link>
                <b-btn @click.prevent="deleteVendor(vendor)" class="btn-danger">
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
      ref="detailsVendorModal"
      size="lg"
      title="Details Vendor"
      centered
      hide-footer
    >
      <div class="vendor-info">
        <table class="table table-bordered text-center table-striped">
        <tr><td><b>ID</b></td><td>{{ vendorData.id }}</td></tr>
        <tr><td><b>Name</b></td><td>{{ vendorData.CompanyName }}</td></tr>
        <tr><td><b>Address</b></td><td>{{ vendorData.BillingAddress }}</td></tr>
        <tr><td><b>Phone</b></td><td>{{ vendorData.Phone }}</td></tr>
        </table>
        <!-- <p>ID: {{ vendorData.id }}</p>
        <p>Vendor Name: {{ vendorData.CompanyName }}</p>
        <p>Address: {{ vendorData.BillingAddress }}</p>
        <p>Vendor Phone: {{ vendorData.Phone }}</p>
        <p>City: {{ vendorData.BillingAddress }} </p> -->
      </div>
    </b-modal>

    <b-modal
      id="add-vendor-modal"
      ref="addVendorModal"
      size="lg"
      title="Add Contact"
      centered
      hide-footer
    >

      <div class="add-vendor-modal-body">
        <b-form validated enctype="multipart/form-data">

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Company Name:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter Vendor Name"
                          v-model="vendorData.CompanyName">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Contact Name:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Contact Name"
                          v-model="vendorData.DisplayName">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Type:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter Vendor Name"
                          v-model="vendorData.Type">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Title:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Contact Name"
                          v-model="vendorData.Title">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Customer:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <select v-model="vendorData.IsCustomer" class="form-control">
                  <option value="22" disabled selected>Customer</option>
                  <option value="1">Yes</option>
                  <option value="0" >No</option>
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
                label="Vendor:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">

                <select v-model="vendorData.IsVendor" class="form-control">
                  <option value="22" disabled selected>Vendor</option>
                  <option value="1">Yes</option>
                  <option value="0" >No</option>
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
                label="First Name:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter First Name"
                          v-model="vendorData.FirstName">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Last Name:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Enter Last Name"
                          v-model="vendorData.LastName">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Middle Name:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter Middle Name"
                          v-model="vendorData.MiddleName">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Suffix:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Suffix"
                          v-model="vendorData.Suffix">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <b-card no-body>
                <b-tabs card>
                  <b-tab title="Billing" active>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                          label="Address:"
                          label-for="vendor-address"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    id="vendor-address"
                                    placeholder="Billing Address"
                                    v-model="vendorData.BillingAddress">
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group
                          label="City:"
                          label-for="vendor-city"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    label="City"
                                    placeholder="Billing City"
                                    v-model="vendorData.BillingCity">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                          label="State:"
                          label-for="vendor-province"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    id="vendor-province"
                                    placeholder="Billing State"
                                    v-model="vendorData.BillingState">
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group
                          label="Zip Code:"
                          label-for="vendor-zipcode"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    id="vendor-zipcode"
                                    placeholder="Billing ZipCode"
                                    v-model="vendorData.BillingZipCode">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                        label=" Country:"
                        label-for="vendor-country"
                        :label-cols="3"
                        :horizontal="true">
                          <b-form-input type="text"
                                  id="vendor-country"
                                  placeholder="Billing Country"
                                  v-model="vendorData.BillingCountry">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Shipping">
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                          label=" Address:"
                          label-for="vendor-address"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    id="vendor-address"
                                    placeholder="Shipping Address"
                                    v-model="vendorData.ShippingAddress">
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group
                          label="City:"
                          label-for="vendor-city"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    label="Shipping City"
                                    placeholder="Shipping City"
                                    v-model="vendorData.ShippingCity">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                          label="State:"
                          label-for="vendor-province"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    placeholder="Shipping State"
                                    v-model="vendorData.ShippingState">
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group
                          label=" Zip Code:"
                          label-for="vendor-zipcode"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    id="vendor-zipcode"
                                    placeholder=" Shipping ZipCode"
                                    v-model="vendorData.ShippingZipCode">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                        label="Country:"
                        label-for="vendor-country"
                        :label-cols="3"
                        :horizontal="true">
                          <b-form-input type="text"
                                  id="vendor-country"
                                  placeholder="Shipping Country"
                                  v-model="vendorData.ShippingCountry">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Payment Method:"
                label-for="vendor-address"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-address"
                          placeholder="Payment Method"
                          v-model="vendorData.PaymentMethod">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Delivery Method:"
                label-for="vendor-city"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          label="City"
                          placeholder="Delivery Method"
                          v-model="vendorData.DeliveryMethod">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="TIN:"
                label-for="vendor-address"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-address"
                          placeholder="TIN"
                          v-model="vendorData.TIN">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Attachment:"
                label-for="vendor-city"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          label="Attachment"
                          placeholder="Attachment"
                          v-model="vendorData.Attachment">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Reference:"
                label-for="vendor-province"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-province"
                          placeholder="Reference"
                          v-model="vendorData.Reference">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="As Of"
                label-for="vendor-zipcode"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="date"
                          placeholder="Start Date"
                          v-model="vendorData.AsOf">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <!-- <div class="col-md-6">
              <b-form-group
                label="Country:"
                label-for="vendor-country"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-country"
                          placeholder="Country"
                          v-model="vendorData.Country">
                </b-form-input>
              </b-form-group>
            </div> -->

            <div class="col-md-6">
              <b-form-group
                label="Contact Phone:"
                label-for="vendor-contact-phone"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-phone"
                          placeholder="Contact Phone"
                          v-model="vendorData.Mobile">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Company Phone:"
                label-for="vendor-company-phone"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-phone"
                          placeholder="Company Phone"
                          v-model="vendorData.Phone">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
<!--
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Company Phone:"
                label-for="vendor-company-phone"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-phone"
                          placeholder="Company Phone"
                          v-model="vendorData.Phone">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Fax:"
                label-for="vendor-fax"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-fax"
                          placeholder="Fax"
                          v-model="vendorData.Fax">
                </b-form-input>
              </b-form-group>
            </div>
          </div> -->
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Email:"
                label-for="vendor-email"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="email"
                          id="vendor-email"
                          placeholder="Email"
                          v-model="vendorData.Email">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="WebSite:"
                label-for="vendor-website"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-website"
                          placeholder="Website"
                          v-model="vendorData.Website">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Opening Balance:"
                label-for="vendor-opening-balance"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="number"
                          label="vendor-opening-balance"
                          placeholder="Opening Balance"
                          v-model="vendorData.OpeningBalance">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Status:"
                label-for="vendor-status"
                :label-cols="3"
                :horizontal="true">
                <b-form-select class="form-control border-input"
                               v-model="vendorData.Status"
                               required
                >
                  <option :value="null" disabled>Status</option>
                  <option value=1>Active</option>
                  <option value=0>InActive</option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Image"
                label-for="vendor-image"
                :label-cols="3"
                :horizontal="true">
                <input type="file" id="file" ref="file" name="ContactImg" v-on:change="handleFileUpload()"/>
                <!-- <b-form-file v-model="vendorData.Image" id="vendor-image" :plain="true"></b-form-file> -->
              </b-form-group>
            </div>
            <div class="col-md-8">
              <b-form-group
                label="Description"
                label-for="vendor-description"
                :label-cols="3"
                :horizontal="true">
                <b-form-textarea id="vendor-description"
                                 v-model="vendorData.Notes"
                                 placeholder="Here can be your description"
                                 :rows="3"
                                 :max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="addVendor">
              Add Vendor
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-vendor-modal"
      ref="editVendorModal"
      size="lg"
      title="Edit Vendor"
      centered
      hide-footer
    >
      <div class="edit-vendor-modal-body">
        <b-form validated>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Company Name:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="vendor-company-name"
                              placeholder="Enter Vendor Name"
                              v-model="vendorData.CompanyName">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Contact Name:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="vendor-contact-name"
                              placeholder="Contact Name"
                              v-model="vendorData.DisplayName">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Type:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter Vendor Name"
                          v-model="vendorData.Type">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Title:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Contact Name"
                          v-model="vendorData.Title">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Customer:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <select v-model="vendorData.IsCustomer" class="form-control">
                  <option value="22" disabled selected>Customer</option>
                  <option value="1">Yes</option>
                  <option value="0" >No</option>
                </select>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Vendor:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">

                <select v-model="vendorData.IsVendor" class="form-control">
                  <option value="22" disabled selected>Vendor</option>
                  <option value="1">Yes</option>
                  <option value="0" >No</option>
                </select>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="First Name:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter First Name"
                          v-model="vendorData.FirstName">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Last Name:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Enter Last Name"
                          v-model="vendorData.LastName">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Middle Name:"
                label-for="vendor-company-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-company-name"
                          placeholder="Enter Middle Name"
                          v-model="vendorData.MiddleName">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Suffix:"
                label-for="vendor-contact-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-contact-name"
                          placeholder="Suffix"
                          v-model="vendorData.Suffix">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <b-card no-body>
                <b-tabs card>
                  <b-tab title="Billing" active>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                          label="Address:"
                          label-for="vendor-address"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    id="vendor-address"
                                    placeholder="Billing Address"
                                    v-model="vendorData.BillingAddress">
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group
                          label="City:"
                          label-for="vendor-city"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    label="City"
                                    placeholder="Billing City"
                                    v-model="vendorData.BillingCity">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                          label="State:"
                          label-for="vendor-province"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    id="vendor-province"
                                    placeholder="Billing State"
                                    v-model="vendorData.BillingState">
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group
                          label="Zip Code:"
                          label-for="vendor-zipcode"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    id="vendor-zipcode"
                                    placeholder="Billing ZipCode"
                                    v-model="vendorData.BillingZipCode">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                        label=" Country:"
                        label-for="vendor-country"
                        :label-cols="3"
                        :horizontal="true">
                          <b-form-input type="text"
                                  id="vendor-country"
                                  placeholder="Billing Country"
                                  v-model="vendorData.BillingCountry">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Shipping">
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                          label=" Address:"
                          label-for="vendor-address"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    id="vendor-address"
                                    placeholder="Shipping Address"
                                    v-model="vendorData.ShippingAddress">
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group
                          label="City:"
                          label-for="vendor-city"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    label="Shipping City"
                                    placeholder="Shipping City"
                                    v-model="vendorData.ShippingCity">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                          label="State:"
                          label-for="vendor-province"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    placeholder="Shipping State"
                                    v-model="vendorData.ShippingState">
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group
                          label=" Zip Code:"
                          label-for="vendor-zipcode"
                          :label-cols="3"
                          :horizontal="true">
                          <b-form-input type="text"
                                    id="vendor-zipcode"
                                    placeholder=" Shipping ZipCode"
                                    v-model="vendorData.ShippingZipCode">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                        label="Country:"
                        label-for="vendor-country"
                        :label-cols="3"
                        :horizontal="true">
                          <b-form-input type="text"
                                  id="vendor-country"
                                  placeholder="Shipping Country"
                                  v-model="vendorData.ShippingCountry">
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Payment Method:"
                label-for="vendor-address"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-address"
                          placeholder="Payment Method"
                          v-model="vendorData.PaymentMethod">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Delivery Method:"
                label-for="vendor-city"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          label="City"
                          placeholder="Delivery Method"
                          v-model="vendorData.DeliveryMethod">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="TIN:"
                label-for="vendor-address"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-address"
                          placeholder="TIN"
                          v-model="vendorData.TIN">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Attachment:"
                label-for="vendor-city"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          label="Attachment"
                          placeholder="Attachment"
                          v-model="vendorData.Attachment">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Reference:"
                label-for="vendor-province"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="vendor-province"
                          placeholder="Reference"
                          v-model="vendorData.Reference">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="As Of"
                label-for="vendor-zipcode"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="date"
                          placeholder="Start Date"
                          v-model="vendorData.AsOf">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">

            <div class="col-md-6">
              <b-form-group
                label="Contact Phone:"
                label-for="vendor-contact-phone"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="vendor-contact-phone"
                              placeholder="Contact Phone"
                              v-model="vendorData.Mobile">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Company Phone:"
                label-for="vendor-company-phone"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="vendor-company-phone"
                              placeholder="Company Phone"
                              v-model="vendorData.Phone">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <!-- <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Company Phone:"
                label-for="vendor-company-phone"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="vendor-company-phone"
                              placeholder="Company Phone"
                              v-model="vendorData.Phone">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Fax:"
                label-for="vendor-fax"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="vendor-fax"
                              placeholder="Fax"
                              v-model="vendorData.Fax">
                </b-form-input>
              </b-form-group>
            </div>
          </div> -->
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Email:"
                label-for="vendor-email"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="email"
                              id="vendor-email"
                              placeholder="Email"
                              v-model="vendorData.Email">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="WebSite:"
                label-for="vendor-website"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="vendor-website"
                              placeholder="Website"
                              v-model="vendorData.Website">
                </b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Opening Balance:"
                label-for="vendor-opening-balance"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="number"
                              label="vendor-opening-balance"
                              placeholder="Opening Balance"
                              v-model="vendorData.OpeningBalance">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group
                label="Status:"
                label-for="vendor-status"
                :horizontal="true">
                <b-form-select class="form-control border-input"
                               v-model="vendorData.Status"
                               required
                >
                  <option :value="null" disabled>Status</option>
                  <option value=1>Active</option>
                  <option value=0>InActive</option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Image"
                label-for="vendor-image"
                :label-cols="3"
                :horizontal="true">
                <b-form-file id="vendor-image" :plain="true"></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-8">
              <b-form-group
                label="Description"
                label-for="vendor-description"
                :label-cols="3"
                :horizontal="true">
                <b-form-textarea id="vendor-description"
                                 v-model="vendorData.Notes"
                                 placeholder="Here can be your description"
                                 :rows="3"
                                 :max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="updateVendor(vendorData.id)">
              Update Vendor
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>
    </b-modal>
    <b-modal
      id="add-bank-modal"
      ref="BanktransactionModal"
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
                <select id="vendor" v-model="transaction.ContactID" class="form-control">
                  <option
                  v-for="ContactList in vendorstransaction.data"
                  :key="ContactList.id"
                  :value="ContactList.id">
                  {{ ContactList.CompanyName }}
                  </option>
                </select>
                <span class="input-group-addon"><button class="btn btn-primary">Contact</button></span>
              </div>
              <div class="input-group col-md-3">
                <select id="vendor" v-model="transaction.Method" class="form-control">
                  <option value="1">Payment</option>
                  <option value="2">Receive</option>
                </select>
                <span class="input-group-addon"><button class="btn btn-primary">Type</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="text" placeholder="Amount" class="form-control" v-model="transaction.Balance">
                <span class="input-group-addon"><button class="btn btn-danger">Amount</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="text" placeholder="Cheque Number" class="form-control" v-model="transaction.ChequeNumber">
                <span class="input-group-addon"><button class="btn btn-primary">Cheque</button></span>
              </div>
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
              <div class="input-group col-md-3">
                <input type="text" placeholder="Reference Cheque Number" class="form-control" v-model="transaction.RefChequeNumber">
                <span class="input-group-addon"><button class="btn btn-primary">Ref.Cheque</button></span>
              </div>
              <!-- <div class="input-group col-md-3">
                <input type="number" placeholder="B.Amount" class="form-control" v-model="transaction.BankAmount" v-on:click="PaymentOption()">
                <span class="input-group-addon"><button class="btn btn-primary">B.Amount</button></span>
              </div> -->
            </div>
            <div class="row" style="margin-top:10px; margin-bottom:10px;" v-if="transaction.IsBank==1">
              <div class="input-group col-md-3">
                <input type="text" placeholder="Taken By" class="form-control" v-model="transaction.TxBy">
                <span class="input-group-addon"><button class="btn btn-primary">Taken By</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="number" placeholder="B.Amount" class="form-control" v-model="transaction.BankAmount" v-on:click="PaymentOption()">
                <span class="input-group-addon"><button class="btn btn-primary">B.Amount</button></span>
              </div>
              <!-- <div class="input-group col-md-3">
                <select class="form-control" v-model="transaction.BankID">
                  <option
                    v-for="Bank in banks.data"
                    :key="Bank.BankID"
                    :value="Bank.BankID">
                    {{ Bank.Name }}
                  </option>
                </select>
                <span class="input-group-addon"><button class="btn btn-primary">Bank</button></span>
              </div> -->
              <!-- <div class="input-group col-md-3">
                <input type="number" placeholder="Cheque Number" class="form-control" v-model="transaction.ChequeNumber">
                <span class="input-group-addon"><button class="btn btn-primary">Cheque</button></span>
              </div> -->

              <!-- <div class="input-group col-md-3">
                <input type="text" placeholder="Reference Bank" class="form-control" v-model="transaction.RefBank">
                <span class="input-group-addon"><button class="btn btn-primary">Ref.Bank</button></span>
              </div>
              <div class="input-group col-md-3">
                <input type="text" placeholder="Reference Cheque Number" class="form-control" v-model="transaction.RefChequeNumber">
                <span class="input-group-addon"><button class="btn btn-primary">Ref.Cheque</button></span>
              </div> -->
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

const tableColumns = ['ID', 'Contact Name', 'Address', 'Phone', 'Start Date', 'Status', 'Image', 'Action']
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  data () {
    return {
      table: {
        title: 'Vendors in Stock',
        subTitle: 'Recently added vendors in main stock.',
        columns: [...tableColumns]
      },
      file: '',
      tableColumnNames: ['ID', 'Contact Name', 'Address', 'Phone', 'Start Date', 'Status', 'Image', 'Action'],
      ContactFiltering: null,
      fahad: {
        image: 'http://lorempixel.com/g/400/200/'
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
        ContactID: 0,
        UserID: 1,
        InvoiceID: 0,
        PurchaseInvoiceID: 0,
        PurchaseOrderID: 0,
        MemoNo: 0,
        PaymentMethod: 0,
        BankAmount: 0,
        ChequeNumber: 0,
        ContactDebit: 0,
        ContactCredit: 0,
        Notes: null,
        DueDate: null,
        PaymentDate: null,
        IsApproved: 0,
        Status: 1,
        Method: 1,
        IsBank: 0,
        BankID: null
      },
      vendors: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      vendorstransaction: {
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
      offset: 4
    }
  },
  mounted () {
    this.getVendors()
    this.getBanks()
    this.AuthCheck()
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
    ContactFilter () {
      // alert(this.tableColumnNames[1])
      // this.columns[1] = 'Customer Name'
      if (this.ContactFiltering === 1) {
        axios.get(`http://techlab.classy.pos/Api/V1/Contacts/Customer/List?page=${this.vendors.current_page}`)
          .then((response) => {
            this.tableColumnNames[1] = 'Customer Name'
            this.vendors = response.data
          })
          .catch(() => {
            console.log('handle server error from here')
          })
      } else if (this.ContactFiltering === 2) {
        axios.get(`http://techlab.classy.pos/Api/V1/Contacts/Vendor/List?page=${this.vendors.current_page}`)
          .then((response) => {
            this.tableColumnNames[1] = 'Vendor Name'
            this.vendors = response.data
          })
          .catch(() => {
            console.log('handle server error from here')
          })
      } else {
        this.tableColumnNames[1] = 'Contact Name'
        this.getVendors()
      }
    },
    banktransaction () {
      if (this.transaction.Method === 1) {
        this.transaction.ContactDebit = this.transaction.Balance
        this.transaction.ContactCredit = 0
      } else {
        this.transaction.ContactCredit = this.transaction.Balance
        this.transaction.ContactDebit = 0
      }
      this.transaction.UserID = 1

      axios.post('http://techlab.classy.pos/Api/V1/Contacts/Contact/Transaction', this.transaction)
        .then((response) => {
          alert(response.data)
          // this.banks.data.push(response.data)
          // this.setSuccessMessage()
        })
        .catch((response) => this.setErrors(response))
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
    getVendors () {
      axios.get(`http://techlab.classy.pos/Api/V1/Contacts/Contact/List?page=${this.vendors.current_page}`)
        .then((response) => {
          this.vendors = response.data
          this.vendorstransaction = response.data
          // alert(response.data.data[0].id)
          this.transaction.ContactID = response.data.data[0].id
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    addVendor () {
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('FirstName', this.vendorData.FirstName)
      formData.append('MiddleName', this.vendorData.MiddleName)
      formData.append('LastName', this.vendorData.LastName)
      formData.append('DisplayName', this.vendorData.DisplayName)
      formData.append('CompanyName', this.vendorData.CompanyName)
      formData.append('Suffix', this.vendorData.Suffix)
      formData.append('Phone', this.vendorData.Phone)
      formData.append('Mobile', this.vendorData.Mobile)
      formData.append('Email', this.vendorData.Email)
      formData.append('Website', this.vendorData.Website)
      formData.append('IsCustomer', this.vendorData.IsCustomer)
      formData.append('IsVendor', this.vendorData.IsVendor)
      formData.append('BillingAddress', this.vendorData.BillingAddress)
      formData.append('BillingCountry', this.vendorData.BillingCountry)
      formData.append('BillingCity', this.vendorData.BillingCity)
      formData.append('BillingZipCode', this.vendorData.BillingZipCode)
      formData.append('BillingState', this.vendorData.BillingState)
      formData.append('ShippingAddress', this.vendorData.ShippingAddress)
      formData.append('ShippingCountry', this.vendorData.ShippingCountry)
      formData.append('ShippingCity', this.vendorData.ShippingCity)
      formData.append('ShippingZipCode', this.vendorData.ShippingZipCode)
      formData.append('ShippingState', this.vendorData.ShippingState)
      formData.append('Notes', this.vendorData.Notes)
      formData.append('Status', this.vendorData.Status)
      formData.append('PaymentMethod', this.vendorData.PaymentMethod)
      formData.append('DeliveryMethod', this.vendorData.DeliveryMethod)
      formData.append('Type', this.vendorData.Type)
      formData.append('Title', this.vendorData.Title)
      formData.append('TIN', this.vendorData.TIN)
      formData.append('Attachment', this.vendorData.Attachment)
      formData.append('AsOf', this.vendorData.AsOf)
      formData.append('Reference', this.vendorData.Reference)
      formData.append('UserID', 1)
      formData.append('OpeningBalance', this.vendorData.OpeningBalance)
      axios.post('http://techlab.classy.pos/Api/V1/Contacts/Contact/New',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          // alert(response.data)
          this.$refs.addVendorModal.hide()
          this.getVendors()
          // this.vendors.data.push(response.data)

          console.log('SUCCESS!!')
        })
        .catch(function () {
          console.log('FAILURE!!')
        })
      // axios.post('http://techlab.classy.pos/Api/V1/Contacts/Contact/New', this.vendorData)
      //   .then((response) => {
      //     alert(response.data)
      //     this.vendors.data.push(response.data)
      //     this.setSuccessMessage()
      //   })
      //   .catch(({response}) => this.setErrors(response))
    },
    deleteVendor (vendor) {
      // alert(vendor.id)
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
          axios.delete('http://techlab.classy.pos/Api/V1/Contacts/Contact/Trash/New/' + vendor.id)
            .then((response) => {
              const idx = this.vendors.data.indexOf(vendor)
              this.vendors.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    detailsVendor (id, index) {
      axios.get('http://techlab.classy.pos/Api/V1/Contacts/Contact/Details/' + id)
        .then((resp) => {
          this.vendorData = resp.data
        })
        .catch(function () {
          alert('Could not load your Vendor: ' + id)
        })
    },
    updateVendor (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Contacts/Contact/Update/' + id, this.vendorData)
        .then((response) => {
          // this.vendors.data.push(response.data)
          this.setSuccessMessage()
          this.getVendors()
        })
        .catch(({response}) => this.setErrors(response))
    },
    showContacttransactionModal () {
      // alert('Something is done')
      this.$refs.BanktransactionModal.show()
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
    showAddVendorModal () {
      this.reset()
      this.vendorData.IsVendor = 22
      this.vendorData.IsCustomer = 22
      this.$refs.addVendorModal.show()
    },
    editVendor (id, index) {
      // alert("dsfgsdfghsdf"+index)
      this.detailsVendor(id, index)
      this.$refs.editVendorModal.show()
    },
    getVendor (id) {
      this.detailsVendor(id)
      this.$refs.detailsVendorModal.show()
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
