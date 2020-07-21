<template>
  <div>
    <!-- form login -->
    <div v-if="formLogin" class="box-login">
      <div class="card" style="width: 40%; max-width:300px; min-width:300px">
        <div class="card-header p-3">
          <h2>Login</h2>
        </div>
        <div class="car-body p-3">
          <form v-on:submit.prevent="login">
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" class="form-control" v-model="email" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
            <p class="mr-3">
              Dont have account
              <a href v-on:click.prevent="registerForm">Register Now</a>
            </p>
            <button type="submit" class="btn btn-primary" style="width: 100%">Login Now</button>
          </form>
          <br />
          <div class="align-middle">
            <p class="d-flex justify-content-center">Login with</p>
            <div class="social-line d-flexbox center">
              <a class="btn btn-just-icon btn-link" v-google-signin-button="clientId">
                <i class="fa fa-google"></i>
              </a>
              <p>Login with Google</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- form register -->
    <div v-else class="box-login">
      <div class="card" style="width: 40%; max-width:300px; min-width:300px">
        <div class="card-header p-3">
          <h2>Register</h2>
        </div>
        <div class="car-body p-3">
          <form v-on:submit.prevent="register">
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input type="text" class="form-control" v-model="usernameReg" />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" class="form-control" v-model="emailReg" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" v-model="passwordReg" />
            </div>
            <p class="mr-3 align-center">
              Have account
              <a href v-on:click.prevent="loginForm">Login Now</a>
            </p>
            <button type="submit" class="btn btn-primary" style="width: 100%">Register Now</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  name: "isLogout",
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      email: "",
      password: "",
      usernameReg: "",
      emailReg: "",
      passwordReg: "",
      formLogin: true,
      clientId: "327050008121-sef50bpr7qnbtumfhgkr4ei5ikfjklae.apps.googleusercontent.com"
    };
  },
  methods: {
    login() {
      let userLogin = {
        email: this.email,
        password: this.password
      };
      console.log("userLogin: ", userLogin);
      axios({
        method: "POST",
        url: "http://localhost:3000/user/login",
        data: userLogin
      })
        .then(response => {
          swal("Welcome to Music App \n" + response.data.username, {
            icon: "success",
            button: false,
            timer: 2000
          });
          console.log("response: ", response.data);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("username", response.data.username);
          this.$emit("Login");
        })
        .catch(function(error) {
          swal("Check your password / email again!", {
            icon: "error",
            button: false,
            timer: 2000
          });
          console.log(error.response);
        });
    },
    register() {
      axios({
        method: "POST",
        url: "http://localhost:3000/user/register",
        data: {
          username: this.usernameReg,
          email: this.emailReg,
          password: this.passwordReg
        }
      })
        .then(response => {
          swal("Welcome to Music App \n" + response.data.username, {
            icon: "success",
            button: false,
            timer: 2000
          });
          console.log("response: ", response.data);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("username", response.data.username);
          this.$emit("Login");
        })
        .catch(function(error) {
          swal("Check your password / email again!", {
            icon: "error",
            button: false,
            timer: 2000
          });
          console.log(error.response);
        });
    },
    registerForm() {
      this.formLogin = false;
    },
    loginForm() {
      this.formLogin = true;
    },
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      axios({
        method: "post",
        url: "http://localhost:3000/user/login/google",
        data: {
          idToken: idToken
        }
      })
        .then(response => {
          swal(`Welcome to Kanban App : \n  ${response.data.username}`, {
            icon: "success",
            button: false,
            timer: 2000
          });
          console.log("response: ", response.data);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("username", response.data.username);
          this.$emit("isLogin", false);
        })
        .catch(function(error) {
          swal("Error regiter, please Register again!", {
            icon: "error",
            button: false,
            timer: 2000
          });
          console.log(error);
        });
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    }
  }
};
</script>

<style scope>
.box-login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: 2px;
  border-block-color: #f5f5f5;
}
</style>