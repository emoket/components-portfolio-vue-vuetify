<template>
  <div id="login">
    <div id="description">
      <h1>Login</h1>
      <p>
        Lorem ipsum dolor sit amet.
      </p>
    </div>
    <v-card id="login-card">
      <div id="form">
        <v-form id="form" v-model="login_form_valid">
          <v-text-field
            id="email"
            type="text"
            outlined
            dense
            dark
            label="Email"
            v-model="email"
            :placeholder="email"
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
        </v-form>
      </div>
      <v-icon class="v-btn-close" @click="$router.go(-1)">mdi-close</v-icon>
    </v-card>
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
    email: "eve.holt@reqres.in",
    password: "cityslicka",
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
      const login_url = `https://reqres.in/api/login`;

      this.$http
        .post(login_url, { email, password })
        .then(response => {
          const token = response.data;
          console.log(token);
          // localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("jwt", token);

          if (localStorage.getItem("jwt")) {
            // this.$emit("loggedIn");
            if (this.$route.params.nextUrl) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("dashboard");
            }
          }
        })
        .catch(error => {
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

#login-card .v-btn-close {
  position: absolute;
  top: 0;
  right: 0;
  margin: -30px 5px 0 0;
  cursor: pointer;
  color: #393e46;
}
</style>
