<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12" style="margin-bottom:5px;">
          <button @click.prevent="showAddProductModal" type="button" class="btn btn-wd btn-success pull-right" style="margin-left:5px;">
            Add Product <i class="fa fa-plus"></i>
          </button>
          <button @click.prevent="showAddCategoryModal" type="button" class="btn btn-wd btn-success pull-right">
            + Add Category
          </button>
          <button @click.prevent="showAddBrandModal" type="button" class="btn btn-wd btn-success pull-right">
            + Add Brand
          </button>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th :key="column.id" v-for="column in table.columns">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="(product,index) in NumberofRows" :key="product.id">
              <!-- <td>{{ ProductIDList[index] }}</td> -->
              <td>{{ ProductNameList[index] }}</td>
              <td>{{ ProductCategoryList[index] }}</td>
              <td>{{ ProductVendorList[index] }}</td>
              <td>{{ ProductBrandList[index] }}</td>
              <td>{{ ProductDescriptionList[index] }}</td>
              <td>{{ ProductQuantityList[index] }}</td>
              <td>{{ ProductSalePriceList[index] }}</td>
              <td>
                <b-btn @click.prevent="getProduct(ProductIDList[index])" class="btn-success">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editProduct(ProductIDList[index],index)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <router-link :to="{path: '/Product/Ledger/' + ProductIDList[index]}">
                  <button class="btn btn-primary"><i class="fa fa-book"></i></button>
                </router-link>
                <b-btn @click.prevent="deleteProduct(ProductIDList[index],index)" class="btn-danger">
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
                    :total-rows="products.total"
                    v-model="products.current_page"
                    :per-page="products.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="details-product-modal"
      ref="detailsProductModal"
      size="md"
      title="Details Product"
      centered
      hide-footer
    >
      <div class="product-info">
        <h4>{{ProductNameDetails}}</h4>
        <table class="table table-bordered table-striped text-center">
          <tr>
            <td>ID</td>
            <td>{{ProductIDDetails}}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{{ProductNameDetails}}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td v-if="StatusDetails === 1"><b-badge variant="success">Active</b-badge></td>
            <td v-else><b-badge variant="secondary">InActive</b-badge></td>
          </tr>
          <tr>
            <td>Brand</td>
            <td>{{BrandNameDetails}}</td>
          </tr>
          <tr>
            <td>Vendor</td>
            <td>{{CompanyNameDetails}}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{{CategoryNameDetails}}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{{ProductDescriptionDetails}}</td>
          </tr>
          <tr>
            <td>Cost Price</td>
            <td>{{CostPriceDetails}}</td>
          </tr>
          <tr>
            <td>Sale Price</td>
            <td>{{SalePriceDetails}}</td>
          </tr>
        </table>
      </div>
    </b-modal>

    <b-modal
      id="add-product-modal"
      ref="addProductModal"
      size="lg"
      title="Add Product"
      centered
      hide-footer
    >
      <div class="add-product-form-body">
        <b-form>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Category:"
                label-for="product-category"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="product-category" v-model="productData.CategoryID">
                  <option :value="null" disabled>Select a Category</option>
                  <option
                    v-for="productCategory in productCategories.data"
                    :key="productCategory.id"
                    :value="productCategory.id">
                    {{ productCategory.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Brand:"
                label-for="product-brand"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="product-brand" v-model="productData.BrandID">
                  <option disabled :value="null">Select Brand</option>
                  <option
                    v-for="productBrand in productBrands.data"
                    :key="productBrand.id"
                    :value="productBrand.id">
                    {{ productBrand.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Vendor:"
                label-for="product-vendor"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="vendor" v-model="productData.ContactID">
                  <option :value="0" selected disabled>Select a Vendor</option>
                  <option
                    v-for="productVendor in productVendors.data"
                    :key="productVendor.id"
                    :value="productVendor.id">
                    {{ productVendor.CompanyName }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Tax Code:"
                label-for="product-tax"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="product-tax" v-model="productData.TaxID">
                  <option :value="null" disabled>Select Tax Code</option>
                  <option
                    v-for="productTax in productTaxes.data"
                    :key="productTax.id"
                    :value="productTax.id">
                    {{ productTax.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Name:"
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
                label="Unit:"
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
                label="Op. Quantity"
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
                label="More:"
                label-for="product-negative-sale"
                :label-cols="3"
                :horizontal="true">
                <b-btn v-b-toggle="'collapse' + 1000" variant="primary" class="form-control">Additional Information</b-btn>
              </b-form-group>
            </div>
          </div>
          <b-collapse :id="'collapse' + 1000" v-model="showCollapse">
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="SKU:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="text"
                                    id="vendor-address"
                                    placeholder="Shop Keeping Unit"
                                    v-model="productData.SKU">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="UPC:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="text"
                                    id="vendor-address"
                                    placeholder="Shop Keeping Unit"
                                    v-model="productData.UPC">
                  </b-form-input>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="MPN:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="text"
                                    id="vendor-address"
                                    placeholder="Shop Keeping Unit"
                                    v-model="productData.MPN">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="EAN:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="text"
                                    id="vendor-address"
                                    placeholder="Shop Keeping Unit"
                                    v-model="productData.EAN">
                  </b-form-input>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="ISBN:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="text"
                                    id="vendor-address"
                                    placeholder="ISBN"
                                    v-model="productData.ISBN">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Status:"
                  label-for="product-status"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="productData.Status"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="Allow Inventory:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="productData.AllowInventory"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
                </b-form-group>
              </div>

              <div class="col-md-6">
                <b-form-group
                  label="Allow Negative:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="productData.AllowNegative"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
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
                  <c-switch type="icon"
                            v-model="productData.AllowReturn"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Allow Tax:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="productData.AllowTax"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
                </b-form-group>
              </div>
            </div>
          </b-collapse>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Image"
                label-for="product-image"
                :label-cols="3"
                :horizontal="true">
                <b-form-file id="product-image" :plain="true"></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-8">
              <b-form-group
                label="Description"
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
    </b-modal>
    <b-modal
      id="edit-product-modal"
      ref="editProductModal"
      size="lg"
      title="Edit Product"
      centered
      hide-footer
    >
      <div class="edit-product-form-body">
        <b-form>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Category:"
                label-for="product-category"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="product-category" v-model="productData.CategoryID">
                  <option :value="null" disabled>Select a Category</option>
                  <option
                    v-for="productCategory in productCategories.data"
                    :key="productCategory.id"
                    :value="productCategory.id">
                    {{ productCategory.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Brand:"
                label-for="product-brand"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="product-brand" v-model="productData.BrandID">
                  <option disabled :value="null">Select Brand</option>
                  <option
                      v-for="productBrand in productBrands.data"
                      :key="productBrand.id"
                      :value="productBrand.id">
                      {{ productBrand.Name }}
                    </option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Vendor:"
                label-for="product-vendor"
                :label-cols="3"
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
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Tax:"
                label-for="product-tax"
                :label-cols="3"
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
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Name:"
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
                label="Unit:"
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
                label="Cost:"
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
                label="Sale:"
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
                label="Op. Quantity"
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
                label="More:"
                label-for="product-negative-sale"
                :label-cols="3"
                :horizontal="true">
                <b-btn v-b-toggle="'collapse' + 2000" variant="primary" class="form-control">Additional Information</b-btn>
              </b-form-group>
            </div>
          </div>
          <b-collapse :id="'collapse' + 2000" v-model="showCollapseEdit">
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="SKU:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="text"
                                id="vendor-address"
                                placeholder="Shop Keeping Unit"
                                v-model="productData.SKU">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="UPC:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="text"
                                id="vendor-address"
                                placeholder="Shop Keeping Unit"
                                v-model="productData.UPC">
                  </b-form-input>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="MPN:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="text"
                                id="vendor-address"
                                placeholder="Shop Keeping Unit"
                                v-model="productData.MPN">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="EAN:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="text"
                                id="vendor-address"
                                placeholder="Shop Keeping Unit"
                                v-model="productData.EAN">
                  </b-form-input>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="ISBN:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="text"
                                id="vendor-address"
                                placeholder="ISBN"
                                v-model="productData.ISBN">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Status:"
                  label-for="product-status"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="productData.Status"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  label="Allow Inventory:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="productData.AllowInventory"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
                </b-form-group>
              </div>

              <div class="col-md-6">
                <b-form-group
                  label="Allow Negative:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="productData.AllowNegative"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
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
                  <c-switch type="icon"
                            v-model="productData.AllowReturn"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Allow Tax:"
                  label-for="product-return"
                  :label-cols="3"
                  :horizontal="true">
                  <c-switch type="icon"
                            v-model="productData.AllowTax"
                            variant="success"
                            v-bind="{on: '\uf00c', off: '\uf00d'}"
                            :pill="true"
                            :checked="false"/>
                </b-form-group>
              </div>
            </div>
          </b-collapse>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Image"
                label-for="product-image"
                :label-cols="3"
                :horizontal="true">
                <b-form-file id="product-image" :plain="true"></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-8">
              <b-form-group
                label="Description"
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
            <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="updateProduct(productData.id)">
              Update Product
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>
    </b-modal>

    <b-modal
      id="add-category-modal"
      ref="addCategoryModal"
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
  </div>
</template>

<script>
import cSwitch from '../../components/Switch'
import axios from 'axios'
const tableColumns = ['Product Name', 'Category Name', 'Company Name', 'Brand Name', 'Description', 'Quantity', 'Price', 'Action']
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
        title: 'Products in Stock',
        subTitle: 'Recently added products in main stock.',
        columns: [...tableColumns]
      },
      showCollapse: true,
      showCollapseEdit: true,
      NumberofRows: [],
      ProductIDList: [],
      ProductNameList: [],
      ProductCategoryList: [],
      ProductVendorList: [],
      ProductDescriptionList: [],
      ProductSalePriceList: [],
      ProductQuantityList: [],
      ProductEditIndex: 0,
      ProductBrandList: [],
      ProductIDDetails: null,
      ProductNameDetails: null,
      CategoryNameDetails: null,
      CompanyNameDetails: null,
      BrandNameDetails: null,
      CostPriceDetails: null,
      StatusDetails: null,
      SalePriceDetails: null,
      ProductDescriptionDetails: null,
      productData: {
        CategoryID: null,
        VendorID: null,
        UserID: 1,
        ContactID: 0,
        BrandID: 0,
        TaxID: null,
        Name: null,
        Unit: null,
        OpeningQty: null,
        Qty: null,
        SKU: null,
        UPC: null,
        MPN: null,
        EAN: null,
        ISBN: null,
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
      products: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        data: []
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
    this.getProducts()
    this.getProductCategories()
    this.getProductVendors()
    this.getProductBrands()
    this.getTaxes()
  },
  methods: {
    getProducts () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === null || Token === '') {
        window.location = '/#/pages/login'
      }
      var TokenChanged = Token.replace('Bearer ', '')
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Product/List?token=` + TokenChanged)
        .then((response) => {
          for (var j = 0; j < response.data.data.length; j++) {
            this.NumberofRows.push(0)
            // alert(response.data.data[j].id)
            this.ProductIDList.push(response.data.data[j].id)
            this.ProductNameList.push(response.data.data[j].Name)
            this.ProductCategoryList.push(response.data.data[j].category.Name)
            this.ProductVendorList.push(response.data.data[j].contact.CompanyName)
            this.ProductBrandList.push(response.data.data[j].brand.Name)
            this.ProductDescriptionList.push(response.data.data[j].Description)
            this.ProductSalePriceList.push(response.data.data[j].SalePrice)
            this.ProductQuantityList.push(response.data.data[j].Qty)
          }
          // this.products = response.data
        })
        .catch(() => {
          // window.location = '/#/pages/login'
          console.log('handle server error from here')
        })
    },
    getProductCategories () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Category/List?page=${this.products.current_page}`)
        .then((response) => {
          this.productCategories = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getProductVendors () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      axios.get(`http://techlab.classy.pos/Api/V1/Contacts/Vendor/List?token=` + Token)
        .then((response) => {
          this.productVendors = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getProductBrands () {
      axios.get(`http://techlab.classy.pos/Api/V1/Products/Brand/List?page=${this.products.current_page}`)
        .then((response) => {
          this.productBrands = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    deleteProduct (id, index) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this product!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Products/Product/Trash/New/' + id)
            .then((response) => {
              this.NumberofRows.splice(index, 1)
              this.ProductIDList.splice(index, 1)
              this.ProductNameList.splice(index, 1)
              this.ProductCategoryList.splice(index, 1)
              this.ProductVendorList.splice(index, 1)
              this.ProductSalePriceList.splice(index, 1)
              this.ProductDescriptionList.splice(index, 1)
              this.ProductBrandList.splice(index, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    editSingleProduct (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Products/Product/Details/' + id)
        .then((resp) => {
          this.productData = resp.data
          if (resp.data.AllowInventory === 1) {
            this.productData.AllowInventory = true
          } else {
            this.productData.AllowInventory = false
          }
          if (resp.data.AllowNegative === 1) {
            this.productData.AllowNegative = true
          } else {
            this.productData.AllowNegative = false
          }
          if (resp.data.AllowReturn === 1) {
            this.productData.AllowReturn = true
          } else {
            this.productData.AllowReturn = false
          }
          if (resp.data.AllowTax === 1) {
            this.productData.AllowTax = true
          } else {
            this.productData.AllowTax = false
          }
          if (resp.data.Status === 1) {
            this.productData.Status = true
          } else {
            this.productData.Status = false
          }
        })
        .catch(function () {
          alert('Could not load your Product: ' + id)
        })
    },
    detailsProduct (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Products/Product/Details/' + id)
        .then((resp) => {
          this.ProductNameDetails = resp.data.Name
          this.ProductDescriptionDetails = resp.data.Description
          this.ProductIDDetails = resp.data.id
          this.CategoryNameDetails = resp.data.category.Name
          this.CompanyNameDetails = resp.data.contact.CompanyName
          this.BrandNameDetails = resp.data.brand.Name
          this.SalePriceDetails = resp.data.SalePrice
          this.CostPriceDetails = resp.data.CostPrice
          this.StatusDetails = resp.data.Status
        })
        .catch(function () {
          alert('Could not load your Product: ' + id)
        })
    },
    updateProduct (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Products/Product/Update/' + id, this.productData)
        .then((response) => {
          var index = this.ProductEditIndex
          for (var i = 0; i < this.productCategories.data.length; i++) {
            if (this.productCategories.data[i].id === this.productData.CategoryID) {
              var CatName = this.productCategories.data[i].Name
              break
            }
          }
          for (i = 0; i < this.productVendors.data.length; i++) {
            if (this.productVendors.data[i].id === this.productData.ContactID) {
              var VenName = this.productVendors.data[i].CompanyName
              break
            }
          }
          this.ProductNameList[index] = this.productData.Name
          this.ProductIDList[index] = this.productData.id
          this.ProductCategoryList[index] = CatName
          this.ProductVendorList[index] = VenName
          this.ProductSalePriceList[index] = this.productData.SalePrice
          this.ProductQuantityList[index] = this.productData.Qty
          this.ProductDescriptionList[index] = this.productData.Description

          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
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
      this.productData.UserID = 1
      axios.post('http://techlab.classy.pos/Api/V1/Products/Product/New', this.productData)
        .then((response) => {
          this.NumberofRows.push(0)
          this.ProductNameList.push(response.data.Name)
          this.ProductIDList.push(response.data.id)
          this.ProductCategoryList.push(response.data.CategoryName)
          this.ProductVendorList.push(response.data.Name)
          this.ProductBrandList.push(response.data.BrandName)
          this.ProductSalePriceList.push(response.data.SalePrice)
          this.ProductDescriptionList.push(response.data.Description)
          this.ProductQuantityList.push(response.data.Qty)

          console.log(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    addCategory () {
      axios.post('http://techlab.classy.pos/Api/V1/Products/Category/New', this.categoryData)
        .then((response) => {
          this.setSuccessMessage()
        })
        .catch(({response}) => {
          this.setErrors(response)
          console.log(JSON.stringify(this.errors))
        })
    },
    addBrand () {
      axios.post('http://techlab.classy.pos/Api/V1/Products/Brand/New', this.brandData)
        .then((response) => {
          this.setSuccessMessage()
        })
        .catch(({response}) => {
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
      this.$refs.addProductModal.hide()
      this.$refs.addCategoryModal.hide()
      this.$refs.addBrandModal.hide()
      this.$refs.detailsProductModal.hide()
      this.$refs.editProductModal.hide()
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
        AllowTax: null,
        AllowInventory: null,
        HasAttribute: null,
        ApplyTax: null,
        Status: null
      }
      this.categoryData = {
        Name: null,
        Color: null,
        Image: null,
        Status: null
      }
      this.brandData = {
        Name: null,
        Manufacturer: null
      }
    },
    showAddCategoryModal () {
      this.reset()
      this.$refs.addCategoryModal.show()
    },
    showAddBrandModal () {
      this.reset()
      this.$refs.addBrandModal.show()
    },
    showAddProductModal () {
      this.reset()
      this.showCollapse = false
      this.$refs.addProductModal.show()
    },
    editProduct (id, index) {
      this.editSingleProduct(id)
      this.showCollapseEdit = false
      this.ProductEditIndex = index
      this.$refs.editProductModal.show()
    },
    getProduct (id) {
      this.detailsProduct(id)
      this.$refs.detailsProductModal.show()
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
</style>
