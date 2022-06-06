<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <button @click.prevent="showAddFloorModal" type="button" class="btn btn-wd btn-success pull-right">
            Add Floor
          </button>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in table.columns" :key="column.id">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="floor in floors.data" :key="floor.id">
              <td>{{ floor.id }}</td>
              <td>{{ floor.Name }}</td>
              <td>{{ floor.ShopID }}</td>
              <td>
                <b-btn @click.prevent="getFloor(floor.id)" class="btn-success">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editFloor(floor.id)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <b-btn @click.prevent="deleteFloor(floor)" class="btn-danger">
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
                    :total-rows="shops.total"
                    v-model="shops.current_page"
                    :per-page="shops.per_page">
      </b-pagination>
    </div>

    <b-modal
      id="details-floor-modal"
      ref="detailsFloorModal"
      size="lg"
      title="Details Product"
      centered
      hide-footer
    >
      <div class="floor-info">
        <p>ID: {{ floorData.id }}</p>
        <p>Floor Name: {{ floorData.Name }}</p>
        <p>Shop ID : {{ floorData.ShopID }}</p>
      </div>
    </b-modal>

    <b-modal
      id="add-floor-modal"
      ref="addFloorModal"
      size="lg"
      title="Add Floor"
      centered
      hide-footer
    >

      <div class="add-floor-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Name:"
                label-for="floor-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="floor-name"
                          placeholder="Floor Name"
                          v-model="floorData.Name"
                          required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6 form-group">
              <b-form-group
                label="Shop:"
                label-for="floor-shop"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="floor-shop"
                               v-model="floorData.ShopID"
                               required>
                  <option :value="null" disabled>Select Shop</option>
                  <option
                    v-for="shop in shops.data"
                    :key="shop.id"
                    :value="shop.id">
                    {{ shop.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addFloor">
              Add Floor
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-floor-modal"
      ref="editFloorModal"
      size="lg"
      title="Edit Floor"
      centered
      hide-footer
    >

      <div class="edit-floor-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Name:"
                label-for="floor-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="floor-name"
                              placeholder="Floor Name"
                              v-model="floorData.Name"
                              required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6 form-group">
              <b-form-group
                label="Shop:"
                label-for="floor-shop"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="floor-shop"
                               v-model="floorData.ShopID"
                               required>
                  <option :value="null" disabled>Select Shop</option>
                  <option
                    v-for="shop in shops.data"
                    :key="shop.id"
                    :value="shop.id">
                    {{ shop.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateFloor(floorData.id)">
              Update Floor
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

const tableColumns = ['ID', 'Floor Name', 'Shop', 'Action']

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  data () {
    return {
      table: {
        title: 'Floors in Stock',
        subTitle: 'Recently added floors.',
        columns: [...tableColumns]
      },
      floorData: {
        id: null,
        Name: null,
        ShopID: null
      },
      floors: {
        total: 0,
        per_page: 2,
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
      offset: 4,
      errors: []
    }
  },
  mounted () {
    this.getFloors()
    this.getShop()
    this.getFloors()
  },
  methods: {
    getFloors () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Floor/List?page=${this.floors.current_page}`)
        .then((response) => {
          this.floors = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    getShop () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Shop/List?page=${this.shops.current_page}`)
        .then((response) => {
          this.shops = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    addFloor () {
      axios.post('http://techlab.classy.pos/Api/V1/Shop/Floor/New', this.floorData)
        .then((response) => {
          this.floors.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => {
          this.setErrors(response)
          console.log(JSON.stringify(this.errors))
        })
    },
    deleteFloor (floor) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this floor!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Shop/Floor/Trash/New/' + floor.id)
            .then((response) => {
              const idx = this.floors.data.indexOf(floor)
              this.floors.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    detailsFloor (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Shop/Floor/Details/' + id)
        .then((resp) => {
          this.floorData = resp.data
        })
        .catch(function () {
          alert('Could not load your Floor: ' + id)
        })
    },
    updateFloor (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Shop/Floor/Update/' + id, this.floorData)
        .then((response) => {
          this.floors.data.push(response.data)
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
      this.$refs.addFloorModal.hide()
      this.$refs.editFloorModal.hide()
      this.$refs.detailsFloorModal.hide()
      this.errors = []
      this.floorData = {
        id: null,
        Name: null,
        ShopID: null,
        FloorID: null,
        IsOpen: null
      }
    },
    showAddFloorModal () {
      this.reset()
      this.$refs.addFloorModal.show()
    },
    editFloor (id) {
      this.detailsFloor(id)
      this.$refs.editFloorModal.show()
    },
    getFloor (id) {
      this.detailsFloor(id)
      this.$refs.detailsFloorModal.show()
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
</style>
