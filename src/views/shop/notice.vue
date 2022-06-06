<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="col-md-6 header">
          <h4 class="title">{{ table.title }}</h4>
          <p class="subtitle">{{ table.subTitle }}</p>
        </div>
        <div class="header col-md-12">
          <button @click.prevent="showAddNoticeModal" type="button" class="btn btn-wd btn-success pull-right">
            Add Notice
          </button>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-striped">
            <thead>
            <th v-for="column in table.columns" :key="column.id">{{ column }}</th>
            </thead>
            <tbody>
            <tr v-for="notice in notices.data" :key="notice.id">
              <td>{{ notice.id }}</td>
              <td>{{ notice.Title }}</td>
              <td>{{ notice.Message }}</td>
              <td>{{ notice.ShopID }}</td>
              <td>{{ notice.BankID }}</td>
              <td>{{ notice.ToUserID }}</td>
              <td>{{ notice.ShowDate }}</td>
              <td v-if="notice.IsDismissed === 0"><b-badge variant="secondary">Closed</b-badge></td>
              <td v-else><b-badge variant="success">Open</b-badge></td>
              <td>
                <b-btn @click.prevent="getNotice(notice.id)" class="btn-success">
                  <i class="fa fa-info"></i>
                </b-btn>
                <b-btn @click.prevent="editNotice(notice.id)" class="btn-success">
                  <i class="fa fa-edit"></i>
                </b-btn>
                <b-btn @click.prevent="deleteNotice(notice)" class="btn-danger">
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
      id="details-notice-modal"
      ref="detailsNoticeModal"
      size="lg"
      title="Details Notice"
      centered
      hide-footer
    >
      <div class="notice-info">
        <p>{{ noticeData.id }}</p>
        <p>{{ noticeData.ShopID }}</p>
        <p>{{ noticeData.BankID }}</p>
        <p>{{ noticeData.ToUserID }}</p>
        <p>{{ noticeData.ShowDate }}</p>
        <p>{{ noticeData.Title }}</p>
        <p>{{ noticeData.Message }}</p>
      </div>
    </b-modal>

    <b-modal
      id="add-notice-modal"
      ref="addNoticeModal"
      size="lg"
      title="Add Notice"
      centered
      hide-footer
    >

      <div class="add-notice-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Shop:"
                label-for="notice-shop"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="notice-shop" v-model="noticeData.ShopID">
                  <option disabled :value="null">Select Shop</option>
                  <option
                    v-for="shop in shops.data"
                    :key="shop.id"
                    :value="shop.id">
                    {{ shop.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>

            <div class="col-md-4">
              <b-form-group
                label="Bank:"
                label-for="notice-bank"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="notice-bank" v-model="noticeData.BankID" required>
                  <option :value="null" disabled>Select a Bank</option>
                  <option
                    v-for="bank in banks.data"
                    :key="bank.id"
                    :value="bank.id">
                    {{ bank.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>

            <div class="col-md-4">
              <b-form-group
                label="User:"
                label-for="notice-user"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="notice-user" v-model="noticeData.ToUserID">
                  <option disabled :value="null">Select User</option>
                  <option value=1>User 1</option>
                  <option value=2>User 2</option>
                  <option value=3>User 3</option>
                </b-form-select>
              </b-form-group>
            </div>

          </div>

          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Title:"
                label-for="notice-title"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                          label="Notice Title"
                          placeholder="Enter Notice Title"
                          v-model="noticeData.Title">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-4">
              <b-form-group
                label="Date:"
                label-for="notice-date"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="date"
                              id="notice-date"
                              v-model="noticeData.ShowDate">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-4">
              <b-form-group
                label="Status:"
                label-for="notice-status"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="notice-status"
                               v-model="noticeData.IsDismissed"
                               required>
                  <option :value="null" disabled>Is Notice Open</option>
                  <option value=1>Open</option>
                  <option value=0>Closed</option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <b-form-group
                label="Message:"
                label-for="notice-message"
                :label-cols="3"
                :horizontal="true">
                <b-form-textarea id="notice-message"
                                 v-model="noticeData.Message"
                                 placeholder="Here is your message"
                                 :rows="3"
                                 :max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="addNotice">
              Add Notice
            </button>
          </div>
          <div class="clearfix"></div>
        </b-form>
      </div>

    </b-modal>

    <b-modal
      id="edit-notice-modal"
      ref="editNoticeModal"
      size="lg"
      title="Edit Notice"
      centered
      hide-footer
    >

      <div class="edit-notice-modal-body">
        <b-form validated>
          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Shop:"
                label-for="notice-shop"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="notice-shop" v-model="noticeData.ShopID">
                  <option disabled :value="null">Select Shop</option>
                  <option
                    v-for="shop in shops.data"
                    :key="shop.id"
                    :value="shop.id">
                    {{ shop.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>

            <div class="col-md-4">
              <b-form-group
                label="Bank:"
                label-for="notice-bank"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="notice-bank" v-model="noticeData.BankID" required>
                  <option :value="null" disabled>Select a Bank</option>
                  <option
                    v-for="bank in banks.data"
                    :key="bank.id"
                    :value="bank.id">
                    {{ bank.Name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </div>

            <div class="col-md-4">
              <b-form-group
                label="User:"
                label-for="notice-user"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="notice-user" v-model="noticeData.ToUserID">
                  <option disabled :value="null">Select User</option>
                  <option value=1>User 1</option>
                  <option value=2>User 2</option>
                  <option value=3>User 3</option>
                </b-form-select>
              </b-form-group>
            </div>

          </div>

          <div class="row">
            <div class="col-md-4">
              <b-form-group
                label="Title:"
                label-for="notice-title"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="text"
                              label="Notice Title"
                              placeholder="Enter Notice Title"
                              v-model="noticeData.Title">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-4">
              <b-form-group
                label="Date:"
                label-for="notice-date"
                :label-cols="3"
                :horizontal="true">
                <b-form-input type="date"
                              id="notice-date"
                              v-model="noticeData.ShowDate">
                </b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-4">
              <b-form-group
                label="Status:"
                label-for="notice-status"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="notice-status"
                               v-model="noticeData.IsDismissed"
                               required>
                  <option :value="null" disabled>Is Notice Open</option>
                  <option value=1>Open</option>
                  <option value=0>Closed</option>
                </b-form-select>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <b-form-group
                label="Message:"
                label-for="notice-message"
                :label-cols="3"
                :horizontal="true">
                <b-form-textarea id="notice-message"
                                 v-model="noticeData.Message"
                                 placeholder="Here is your message"
                                 :rows="3"
                                 :max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd pull-right" @click.prevent="updateNotice(noticeData.id)">
              Update Notice
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

const tableColumns = ['ID', 'Notice Name', 'Description', 'Shop Name', 'Bank Name', 'User Name', 'Date', 'Status', 'Action']

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  data () {
    return {
      table: {
        title: 'Notices',
        subTitle: 'Recently added notices.',
        columns: [...tableColumns]
      },
      noticeData: {
        id: null,
        ShopID: null,
        BankID: null,
        ToUserID: null,
        ShowDate: null,
        Title: null,
        Message: null,
        IsDismissed: null
      },
      notices: {
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
      banks: {
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
    this.getNotices()
    this.getShops()
    this.getBanks()
  },
  methods: {
    getNotices () {
      axios.get(`http://techlab.classy.pos/Api/V1/Notices/Notice/List?page=${this.notices.current_page}`)
        .then((response) => {
          this.notices = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
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
          this.banks = response.data
        })
        .catch(() => {
          console.log('handle server error from here')
        })
    },
    addNotice () {
      axios.post('http://techlab.classy.pos/Api/V1/Notices/Notice/New', this.noticeData)
        .then((response) => {
          this.notices.data.push(response.data)
          this.setSuccessMessage()
        })
        .catch(({response}) => this.setErrors(response))
    },
    deleteNotice (notice) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this notice!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd002f',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          axios.delete('http://techlab.classy.pos/Api/V1/Notices/Notice/Trash/New/' + notice.id)
            .then((response) => {
              const idx = this.notices.data.indexOf(notice)
              this.notices.data.splice(idx, 1)
            })
            .catch(function (resp) {
              alert('Could not delete data')
            })
        })
    },
    detailsNotice (id) {
      axios.get('http://techlab.classy.pos/Api/V1/Notices/Notice/Details/' + id)
        .then((resp) => {
          this.noticeData = resp.data
        })
        .catch(function () {
          alert('Could not load your Notice: ' + id)
        })
    },
    updateNotice (id) {
      axios.put('http://techlab.classy.pos/Api/V1/Notices/Notice/Update/' + id, this.noticeData)
        .then((response) => {
          this.notices.data.push(response.data)
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
      this.$refs.addNoticeModal.hide()
      this.$refs.detailsNoticeModal.hide()
      this.$refs.editNoticeModal.hide()
      this.errors = []
      this.noticeData = {
        id: null,
        ShopID: null,
        BankID: null,
        ToUserID: null,
        ShowDate: null,
        Title: null,
        Message: null,
        IsDismissed: null
      }
    },
    showAddNoticeModal () {
      this.reset()
      this.$refs.addNoticeModal.show()
    },
    editNotice (id) {
      this.detailsNotice(id)
      this.$refs.editNoticeModal.show()
    },
    getNotice (id) {
      this.detailsNotice(id)
      this.$refs.detailsNoticeModal.show()
    }
  } // Methods
}

</script>
<style scoped>
  .subtitle {
    margin-bottom: 20px;
  }
</style>
