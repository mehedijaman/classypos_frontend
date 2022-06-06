<template>
  <div class="row">

    <b-col lg="12">
      <b-card id="add-product-form">
        <div slot="header">
          <i class="fa fa-edit"></i> Add Product
          <div class="card-actions">
            <a href="#" class="btn btn-setting"><i class="icon-settings"></i></a>
            <b-btn class="btn btn-minimize" v-b-toggle.collapse1><i class="icon-arrow-up"></i></b-btn>
            <a href="#" class="btn btn-close"><i class="icon-close"></i></a>
          </div>
        </div>
        <div class="add-product-form-body">
          <b-form>
            <div class="row">
              <div class="col-md-6">
                <b-input-group
                  prepend="Category: "
                  :horizontal="true">
                  <b-form-select v-model="productData.CategoryID">
                    <option :value="null" disabled>Select Category</option>
                    <option
                      v-for="productCategory in productCategories.data"
                      :key="productCategory.id"
                      :value="productCategory.id">
                      {{ productCategory.Name }}
                    </option>
                  </b-form-select>
                  <span class="input-group-btn"><button class="btn btn-success" v-on:click="showAddCategoryModal()"><i class="fa fa-plus"></i></button></span>
                </b-input-group>
              </div>
              <div class="col-md-6">
                <b-input-group
                  prepend="Brand: "
                  :horizontal="true">
                  <b-form-select v-model="productData.BrandID">
                    <option disabled :value="null">Select Brand</option>
                    <option
                      v-for="productBrand in productBrands.data"
                      :key="productBrand.id"
                      :value="productBrand.id">
                      {{ productBrand.Name }}
                    </option>
                  </b-form-select>
                  <span class="input-group-btn"><button class="btn btn-success" v-on:click="showAddBrandModal()"><i class="fa fa-plus"></i></button></span>
                </b-input-group>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-md-6">
                <b-input-group
                  prepend="Vendor: "
                  :horizontal="true">
                  <b-form-select id="vendor" v-model="productData.ContactID">
                    <option :value="null" disabled>Select a Vendor</option>
                    <option
                      v-for="productVendor in productVendors.data"
                      :key="productVendor.id"
                      :value="productVendor.id">
                      {{ productVendor.CompanyName }}
                    </option>
                  </b-form-select>
                  <span class="input-group-btn"><button class="btn btn-success" v-on:click="showAddVendorModal()"><i class="fa fa-plus"></i></button></span>
                </b-input-group>
              </div>
              <div class="col-md-6">
                <b-input-group
                  prepend="Tax Code:"
                  :horizontal="true">
                  <b-form-select id="product-tax" v-model="productData.TaxID">
                    <option :value="null" disabled>Select a Tax Code</option>
                    <option
                      v-for="productTax in productTaxes.data"
                      :key="productTax.id"
                      :value="productTax.id">
                      {{ productTax.Name }}
                    </option>
                  </b-form-select>
                  <span class="input-group-btn"><button class="btn btn-success" v-on:click="showAddTaxModal()"><i class="fa fa-plus"></i></button></span>
                </b-input-group>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="Product Name:"
                  label-for="product-name"
                  :label-cols="3"
                  :horizontal="true">
                  <b-input-group>
                    <b-form-input id="product-name"
                                  type="text"
                                  placeholder="Enter Product Name"
                                  v-model="productData.Name">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Product Unit:"
                  label-for="product-unit"
                  :label-cols="3"
                  :horizontal="true">
                  <b-input-group>
                    <b-form-input id="product-unit"
                                  type="text"
                                  placeholder="Enter Product Unit"
                                  v-model="productData.Unit">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="Cost Price:"
                  label-for="product-cost-price"
                  :label-cols="3"
                  :horizontal="true">
                  <b-input-group>
                    <b-form-input id="product-cost-price"
                                  type="number"
                                  placeholder="Enter Product Cost Price"
                                  v-model="productData.CostPrice">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Sale Price:"
                  label-for="product-sale-price"
                  :label-cols="3"
                  :horizontal="true">
                  <b-input-group>
                    <b-form-input id="product-sale-price"
                                  type="number"
                                  placeholder="Enter Product Sale Price"
                                  v-model="productData.SalePrice">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="Opening Quantity"
                  label-for="product-opening-quantity"
                  :label-cols="3"
                  :horizontal="true">
                  <b-input-group>
                    <b-form-input id="product-opening-quantity"
                                  type="number"
                                  placeholder="Enter Opening Quantity"
                                  v-model="productData.OpeningQty">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Quantity"
                  label-for="product-quantity"
                  :label-cols="3"
                  :horizontal="true">
                  <b-input-group>
                    <b-form-input id="product-quantity"
                                  type="number"
                                  placeholder="Enter Quantity"
                                  v-model="productData.Qty">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="Min. Quantity"
                  label-for="product-min-quantity"
                  :label-cols="3"
                  :horizontal="true">
                  <b-input-group>
                    <b-form-input id="product-min-quantity"
                                  type="number"
                                  placeholder="Enter Min. Quantity"
                                  v-model="productData.MinQtyLevel">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Negative Sale:"
                  label-for="product-negative-sale"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-select id="product-negative-sale" v-model="productData.AllowNegative">
                    <option :value="null" disabled>Negative Sale</option>
                    <option :value=1>Yes</option>
                    <option :value=0>No</option>
                  </b-form-select>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="Allow Return:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-select id="product-return" v-model="productData.AllowReturn">
                    <option :value="null" disabled>Product Return</option>
                    <option :value=1>Yes</option>
                    <option :value=0>No</option>
                  </b-form-select>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Product Attribute:"
                  label-for="product-attribute"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-select id="product-attribute" v-model="productData.HasAttribute">
                    <option :value="null" disabled>Product Attribute</option>
                    <option :value=1>Yes</option>
                    <option :value=0>No</option>
                  </b-form-select>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="Allow Tax:"
                  label-for="product-tax-allow"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-select id="product-tax-allow" v-model="productData.ApplyTax">
                    <option :value="null" disabled>Tax Applicable</option>
                    <option :value=1>Yes</option>
                    <option :value=0>No</option>
                  </b-form-select>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Product Status:"
                  label-for="product-status"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-select id="product-status" v-model="productData.Status">
                    <option :value="null" disabled>Product Status</option>
                    <option :value=1>Active</option>
                    <option :value=0>Deactivate</option>
                  </b-form-select>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <b-form-group
                  label="Product Image"
                  label-for="product-image"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-file id="product-image" :plain="true"></b-form-file>
                </b-form-group>
              </div>
              <div class="col-md-8">
                <b-form-group
                  label="Product Description"
                  label-for="product-description"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-textarea id="product-description"
                                   v-model="productData.Description"
                                   placeholder="Here can be your description"
                                   :rows="3"
                                   :max-rows="6">
                  </b-form-textarea>
                </b-form-group>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="addProduct">
                Add Product
              </button>
            </div>
            <div class="clearfix"></div>
          </b-form>
        </div>
      </b-card>
    </b-col>

    <b-modal
      id="add-category-modal"
      ref="addCategoryModal"
      size="md"
      title="Add Category"
      centered
      hide-footer
    >

      <div class="add-category-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-12">
              <b-form-group
                label="Name"
                label-for="product-category-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input id="product-category-name"
                              type="text"
                              placeholder="Enter Category Name"
                              v-model="categoryData.Name">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-12">
              <b-form-group
                label="Color"
                label-for="product-category-color"
                :label-cols="3"
                :horizontal="true">
                <b-form-input id="product-category-color"
                              type="color"
                              v-model="categoryData.Color">
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-12">
              <b-form-group
                label="Status:"
                label-for="category-status"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="category-status" v-model="categoryData.Status">
                  <option :value="null" disabled>Status</option>
                  <option :value=1>Active</option>
                  <option :value=0>Deactivate</option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="col-md-12">
              <b-form-group
                label="Image"
                label-for="category-image"
                :label-cols="3"
                :horizontal="true">
                <b-form-file v-model="categoryData.Image" id="category-image" :plain="true"></b-form-file>
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
      id="add-brand-modal"
      ref="addBrandModal"
      size="md"
      title="Add Brand"
      centered
      hide-footer
    >
      <div class="add-brand-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-12">
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
            <div class="col-md-12">
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
                              v-model="vendorData.Asof">
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

  </div>
</template>

<script>
import axios from 'axios'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  data () {
    return {
      productData: {
        CategoryID: null,
        ContactID: null,
        UserID: null,
        BrandID: null,
        TaxID: null,
        Name: null,
        Unit: null,
        OpeningQty: null,
        Qty: null,
        MinQtyLevel: null,
        CostPrice: null,
        SalePrice: null,
        AllowNegative: null,
        AllowReturn: null,
        HasAttribute: null,
        ApplyTax: null,
        Status: null,
        Image: null,
        Description: null
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
        BillingAddress: null,
        City: null,
        Province: null,
        ZipCode: null,
        Country: null,
        Mobile: null,
        Phone: null,
        Fax: null,
        Email: null,
        Website: null,
        Image: null,
        Notes: null,
        OpeningBalance: null,
        Status: null
      },
      categoryData: {
        id: null,
        Name: null,
        Color: null,
        Image: null,
        Status: null
      },
      brandData: {
        id: null,
        Name: null,
        Manufacturer: null
      },
      productCategories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      productVendors: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      productBrands: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      productTaxes: {
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
    this.AuthCheck()
    this.getProductCategories()
    this.getProductVendors()
    this.getProductBrands()
    this.getTaxes()
  },
  methods: {
    AuthCheck () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === null || Token === '') {
        window.location = '/#/pages/login'
      }
    },
    getProductCategories () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Category/List?page=${this.productCategories.current_page}`)
        .then((response) => {
          this.productCategories = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getProductVendors () {
      axios.get(`http://techlab.classy.pos/Api/V1/Contacts/Vendor/List?page=${this.productVendors.current_page}`)
        .then((response) => {
          this.productVendors = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getProductBrands () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Brand/List?page=${this.productBrands.current_page}`)
        .then((response) => {
          this.productBrands = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getTaxes () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Tax/List?page=${this.productTaxes.current_page}`)
        .then((response) => {
          this.productTaxes = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    addProduct () {
      axios.post('http://techlab.classy.pos/Api/V1/Products/Product/New', this.productData)
        .then((response) => {
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    addCategory () {
      axios.post('http://techlab.classy.pos/Api/V1/Products/Category/New', this.categoryData)
        .then((response) => {
          this.productCategories.data.push(response.data)
          this.$refs.addCategoryModal.hide()
          this.setSuccessMessage()
        })
        .catch((response) => {
          this.setErrors(response)
          console.log(JSON.stringify(this.errors))
        })
    },
    addBrand () {
      axios.post('http://techlab.classy.pos/Api/V1/Products/Brand/New', this.brandData)
        .then((response) => {
          this.productBrands.data.push(response.data)
          this.$refs.addBrandModal.hide()
          this.setSuccessMessage()
        })
        .catch((response) => {
          this.setErrors(response)
          console.log(JSON.stringify(this.errors))
        })
    },
    addVendor () {
      axios.post('http://techlab.classy.pos/Api/V1/Contacts/Contact/New', this.vendorData)
        .then((response) => {
          this.productVendors.data.push(response.data)
          this.$refs.addVendorModal.hide()
          this.setSuccessMessage()
        })
        .catch((response) => {
          this.setErrors(response)
          console.log(JSON.stringify(this.errors))
        })
    },
    setErrors (response) {
      this.errors = response.data.errors
    },
    setSuccessMessage () {
      this.$swal({
        title: 'Done!',
        type: 'success',
        timer: 1000
      })
      this.reset()
    },
    reset () {
      this.errors = []
      this.productData = {
        CategoryID: null,
        VendorID: null,
        BrandID: null,
        TaxID: null,
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
      this.vendorData = {
        id: null,
        CompanyName: null,
        DisplayName: null,
        FirstName: null,
        MiddleName: null,
        IsCustomer: null,
        IsVendor: null,
        LastName: null,
        Suffix: null,
        BillingAddress: null,
        City: null,
        Province: null,
        ZipCode: null,
        Country: null,
        Mobile: null,
        Phone: null,
        Fax: null,
        Email: null,
        Website: null,
        Image: null,
        Notes: null,
        OpeningBalance: null,
        Status: null
      }
      this.categoryData = {
        id: null,
        Name: null,
        Color: null,
        Image: null,
        Status: null
      }
      this.brandData = {
        id: null,
        Name: null,
        Manufacturer: null
      }
    },
    showAddCategoryModal () {
      this.$refs.addCategoryModal.show()
    },
    showAddBrandModal () {
      this.$refs.addBrandModal.show()
    },
    showAddVendorModal () {
      this.$refs.addVendorModal.show()
    },
    showAddTaxModal () {
      console.log('Need to add Tax Modal')
    }
  } // Methods
}

</script>
<style>
  .modal-lg {
    max-width: 99%;
    height: auto;
  }
  .modal-content {
    border-radius: 15px;
  }
  .fade.show {
    background: #fff;
  }
  /*.btn {*/
    /*line-height: 1;*/
    /*border-radius: 5px;*/
    /*border: 1px solid #c2cfd6;*/
    /*box-shadow: 2px 2px 5px #123123;*/
  /*}*/
  /*.input-group-text, .form-control {*/
    /*line-height: 1;*/
    /*border-radius: 5px;*/
    /*border: 2px solid #c2cfd6;*/
    /*box-shadow: 2px 2px 5px #123123;*/
  /*}*/
</style>
