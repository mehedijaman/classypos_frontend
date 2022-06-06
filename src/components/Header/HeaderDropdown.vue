<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>{{UserNameTop}}</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-bell-o"></i> Updates<b-badge variant="info">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-envelope-o"></i> Messages<b-badge variant="success">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-tasks"></i> Tasks<b-badge variant="danger">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-comments"></i> Comments<b-badge variant="warning">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-header tag="div" class="text-center"><strong>Settings</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>
        <b-dropdown-item><i class="fa fa-wrench"></i> Settings</b-dropdown-item>
        <b-dropdown-item><i class="fa fa-usd"></i> Payments<b-badge variant="secondary">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-file"></i> Projects<b-badge variant="primary">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item><i class="fa fa-shield"></i> Lock Account</b-dropdown-item>
        <b-dropdown-item v-on:click="logout()"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
      </b-nav-item-dropdown>
</template>
<script>
import axios from 'axios'
export default {
  name: 'header-dropdown',
  data: () => {
    return { itemsCount: 42, UserNameTop: '' }
  },
  mounted () {
    this.SetUserInformation()
  },
  methods: {
    SetUserInformation () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === '' || Token === null) {
        window.location = '/#/pages/login'
      }
      // var TokenChanged = Token.replace('Bearer ', '')
      axios.get(`http://techlab.classy.pos/Api/UserInformation?token=` + Token)
        .then((response) => {
          this.UserNameTop = response.data.name
          // this.setSuccessMessage()
        })
        .catch(({response}) => {
          localStorage.setItem('vue-authenticate.vueauth_token', '')
          window.location = '/#/pages/login'
        })
    },
    logout () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      axios.get('http://techlab.classy.pos/Api/logout?token=' + Token)
        .then((response) => {
          alert(response.data.message)
          localStorage.setItem('vue-authenticate.vueauth_token', '')
          window.location = '/#/pages/login'
          // this.setSuccessMessage()
        })
        .catch(({response}) => {
          localStorage.setItem('vue-authenticate.vueauth_token', '')
          window.location = '/#/pages/login'
        })
    }

  }
}
</script>
