<template>
  <div id="login">
    <div id="description">
      <h1>Login</h1>
      <p>
        KTALK 계정을 이용하시기 바랍니다.
      </p>
    </div>
    <div id="form">
      <v-form v-model="login_form_valid">
        <v-text-field
          id="email"
          type="text"
          outlined
          dense
          dark
          label="Email"
          v-model="email"
          placeholder="appdu@kt.com"
          autofocus
          :rules="email_rules"
          prepend-inner-icon="mdi-email"
        />

        <v-text-field
          id="password"
          :type="password_type"
          outlined
          dense
          dark
          label="Password"
          v-model="password"
          placeholder="**********"
          :append-icon="password_icon"
          :rules="password_rules"
          prepend-inner-icon="mdi-lock"
          @click:append="hidePassword = !hidePassword"
        />
        <v-btn
          dark
          block
          depressed
          :disabled="!login_form_valid"
          color="#00adb5"
          @click.prevent="do_login"
        >
          로그인
        </v-btn>

        <v-btn class="v-btn-close" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    password_rules: [
      v => !!v || "필수 항목입니다.",
      v => (v && v.length >= 5) || "너무 짧아요!"
    ],
    email_rules: [
      v => !!v || "필수 항목입니다.",
      v => /.+@.+\..+/.test(v) || "유효한 이메일 주소를 입력하세요."
    ],
    login_form_valid: false,
    email: "",
    password: "",
    hidePassword: true
  }),
  computed: {
    password_type() {
      return this.hidePassword ? "password" : "text";
    },
    password_icon() {
      return this.hidePassword ? "mdi-eye" : "mdi-eye-off";
    }
  },
  methods: {
    do_login() {
      const { email, password } = this;
      if (!email || !password) return;

      // A hosted REST-API ready to respond to your AJAX requests.
      const login_url = `https://reqres.in/api/api/login`;

      this.$http
        .post(login_url, { email, password })
        .then(response => {
          let is_admin = response.data.user.is_admin;
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("jwt", response.data.token);

          if (localStorage.getItem("jwt") != null) {
            this.$emit("loggedIn");
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              if (is_admin == 1) {
                this.$router.push("admin");
              } else {
                this.$router.push("dashboard");
              }
            }
          }
        })
        .catch(function(error) {
          console.error(error.response);
        });
    }
  }
};
</script>

<style scoped>
div#login {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

div#login div#description {
  background-color: rgba(255, 255, 255, 0.6);
  width: 280px;
  padding: 35px;
}

div#login div#description h1,
div#login div#description p {
  margin: 0;
}

div#login div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#login div#form {
  background-color: #393e46;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #eeeeee;
  width: 350px;
  padding: 35px;
}

div#form .v-btn-close {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
