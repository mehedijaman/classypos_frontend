<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <button @click.prevent="showAddTerminalModal" type="button" class="btn btn-wd btn-success pull-right">
            Add Terminal
          </button>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
              <th v-for="column in table.columns" :key="column.id">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="terminal in terminals.data" :key="terminal.id">
              <td>{{ terminal.id }}</td>
              <td>{{ terminal.Name }}</td>
              <td>{{ terminal.ShopID }}</td>
              <td>{{ terminal.FloorID }}</td>
              <td v-if="terminal.IsOpen === 0"><b-badge variant="secondary">Closed</b-badge></td>
              <td v-else><b-badge variant="success">Open</b-badge></td>
              <td>
                <b-btn @click.prevent="getTerminal(terminal.id)" class="btn-success">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editTerminal(terminal.id)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <b-btn @click.prevent="deleteTerminal(terminal)" class="btn-danger">
                  <i class="fa fa-trash"></i>
                </b-btn>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <b-modal
      id="details-terminal-modal"
      ref="detailsTerminalModal"
      size="lg"
      title="Details Product"
      centered
      hide-footer
    >
      <div class="terminal-info">
        <p>ID: {{ terminalData.id }}</p>
        <p>Terminal Name: {{ terminalData.Name }}</p>
        <p>Shop ID : {{ terminalData.ShopID }}</p>
        <p>Floor ID : {{ terminalData.FloorID }}</p>
        <p>Is Open : {{ terminalData.IsOpen }}</p>
      </div>
    </b-modal>

    <b-modal
      id="add-terminal-modal"
      ref="addTerminalModal"
      size="lg"
      title="Add Terminal"
      centered
      hide-footer
    >

      <div class="add-terminal-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Name:"
                label-for="terminal-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          id="terminal-name"
                          placeholder="Terminal Name"
                          v-model="terminalData.Name"
                          required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Terminal Open:"
                label-for="terminal-open"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="terminal-open"
                               v-model="terminalData.IsOpen"
                               required>
                  <option :value="null" disabled>Is Terminal Open</option>
                  <option value=1>Open</option>
                  <option value=0>Closed</option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Shop:"
                label-for="terminal-open"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="terminal-shop"
                               v-model="terminalData.ShopID"
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

            <div class="col-md-6">
              <b-form-group
                label="Floor:"
                label-for="terminal-floor"
                :label-cols="3"
                :horizontal="true">
                <b-form-select class="terminal-floor"
                               v-model="terminalData.FloorID"
                               required>
                  <option :value="null" disabled>Select Floor</option>
                  <option
                    v-for="floor in floors.data"
                    :key="floor.id"
                    :value="floor.id">
                    {{ floor.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="addTerminal">
              Add Terminal
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-terminal-modal"
      ref="editTerminalModal"
      size="lg"
      title="Edit Terminal"
      centered
      hide-footer
    >

      <div class="edit-terminal-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Name:"
                label-for="terminal-name"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              id="terminal-name"
                              placeholder="Terminal Name"
                              v-model="terminalData.Name"
                              required>
                </b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="Terminal Open:"
                label-for="terminal-open"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="terminal-open"
                               v-model="terminalData.IsOpen"
                               required>
                  <option :value="null" disabled>Is Terminal Open</option>
                  <option value=1>Open</option>
                  <option value=0>Closed</option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                label="Shop:"
                label-for="terminal-open"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="terminal-shop"
                               v-model="terminalData.ShopID"
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

            <div class="col-md-6">
              <b-form-group
                label="Floor:"
                label-for="terminal-floor"
                :label-cols="3"
                :horizontal="true">
                <b-form-select class="terminal-floor"
                               v-model="terminalData.FloorID"
                               required>
                  <option :value="null" disabled>Select Floor</option>
                  <option
                    v-for="floor in floors.data"
                    :key="floor.id"
                    :value="floor.id">
                    {{ floor.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateTerminal(terminalData.id)">
              Update Terminal
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

const tableColumns = ['ID', 'Terminal Name', 'Shop', 'Floor', 'Is Open', 'Action']

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  data () {
    return {
      table: {
        title: 'Terminals in Stock',
        subTitle: 'Recently added terminals.',
        columns: [...tableColumns]
      },
      terminalData: {
        id: null,
        Name: null,
        ShopID: null,
        FloorID: null,
        IsOpen: null
      },
      terminals: {
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
      floors: {
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
    this.getTerminals()
    this.getShop()
    this.getFloors()
  },
  methods: {
    getTerminals () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Terminal/List?page=${this.terminals.current_page}`)
        .then((response) => {
          this.terminals = response.data
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
    getFloors () {
      axios.get(`http://techlab.classy.pos/Api/V1/Shop/Floor/List?page=${this.floors.current_page}`)
        .then((response) => {
          this.floors = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    addTerminal () {
      axios.post('http://techlab.classy.pos/Api/V1/Shop/Terminal/New', this.terminalData)
        .then((response) => {
          this.terminals.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => {
          this.setErrors(response)
          console.log(JSON.stringify(this.errors))
        })
    },
    deleteTerminal (terminal) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this terminal!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Shop/Terminal/Trash/New/' + terminal.id)
            .then((response) => {
              const idx = this.terminals.data.indexOf(terminal)
              this.terminals.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    detailsTerminal (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Shop/Terminal/Details/' + id)
        .then((resp) => {
          this.terminalData = resp.data
        })
        .catch(function () {
          alert('Could not load your Terminal: ' + id)
        })
    },
    updateTerminal (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Shop/Terminal/Update/' + id, this.terminalData)
        .then((response) => {
          this.terminals.data.push(response.data)
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
      this.$refs.addTerminalModal.hide()
      this.$refs.editTerminalModal.hide()
      this.$refs.detailsTerminalModal.hide()
      this.errors = []
      this.terminalData = {
        id: null,
        Name: null,
        ShopID: null,
        FloorID: null,
        IsOpen: null
      }
    },
    showAddTerminalModal () {
      this.reset()
      this.$refs.addTerminalModal.show()
    },
    editTerminal (id) {
      this.detailsTerminal(id)
      this.$refs.editTerminalModal.show()
    },
    getTerminal (id) {
      this.detailsTerminal(id)
      this.$refs.detailsTerminalModal.show()
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
</style>
