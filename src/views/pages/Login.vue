<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <input v-model="email" type="email" class="form-control" placeholder="Username">
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <input v-model="password" type="password" class="form-control" placeholder="Password">
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" @click.prevent="login(email, password)" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <h6 v-on:click="PasswordReset()" style="text-decoration:underline;cursor:pointer; margin-top:5px;">Forgot Password?</h6>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
    <b-modal
      id="password-reset-modal"
      ref="PasswordResetModal"
      size="lg"
      title="Password Reset"
      centered
      hide-footer
    >
      <div class="product-info">
      <div class="col-md-12">
        <div class="col-md-6"> <input type="email" placeholder="Enter your Email" class="form-control" v-model="resetData.email"></div>
        <div class="col-md-6" style="margin-top:10px"><button class="btn btn-success form-control" @click.prevent="resetPassword()">Get Email</button></div>
      </div>

        <hr>
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
  name: 'Login',
  data: function () {
    return {
      email: null,
      password: null,
      resetData: {
        email: null
      }
    }
  },
  mounted () {
    this.LoggedInCheck()
  },
  methods: {
    PasswordReset () {
      this.$refs.PasswordResetModal.show()
    },
    resetPassword () {
      axios.post('http://techlab.classy.pos/Api/auth/password/reset', this.resetData)
        .then((response) => {
          console.log()
          this.$refs.PasswordResetModal.hide()
          this.$swal({
            title: 'Done',
            text: response.data.message,
            type: 'success'
          })
        })
        .catch(({response}) => this.setErrors(response))
    },
    LoggedInCheck () {
      var Token = localStorage.getItem('vue-authenticate.vueauth_token')
      if (Token === '' || Token === null) { window.location = '/#/pages/login' } else {
        axios.get(`http://techlab.classy.pos/Api/UserInformation?token=` + Token)
          .then((response) => {
            location.href = '/'
            this.UserNameTop = response.data.name
          // this.setSuccessMessage()
          })
          .catch(({response}) => {
          // this.setErrors(response)
            window.location = '/#/pages/login'
          })
      }
      // var TokenChanged = Token.replace('Bearer ', '')
    },
    login: function (email, password) {
      this.$auth.login({ email, password }).then(function (response) {
        // Execute application logic after successful login
        console.log(response.data)
        location.href = '/'
      })
    }
  } // methods
}
</script>
