<template>
  <v-app>
    <v-navigation-drawer
      color="#393e46"
      v-model="drawer"
      class="pa-2"
      width="300"
      app
      dark
      clipped
    >
      <v-list nav>
        <v-list-item
          :to="route"
          v-for="{ title, icon, route } in main_menus"
          :key="title"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#393e46" app dark clipped-left flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-main>

    <v-footer app color="grey darken-3" dark inset>
      <span class="caption">@AppDu portal</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: true,
    main_menus: [
      {
        title: "normal",
        icon: "mdi-abacus",
        route: "/"
      },
      {
        title: "dashboard",
        icon: "mdi-view-dashboard",
        route: "dashboard"
      },
      {
        title: "admin page",
        icon: "mdi-account-question-outline",
        route: "admin"
      }
    ]
  })
};
</script>

<style scoped>
color_1 {
  color: #222831;
}
color_2 {
  color: #393e46;
}
color_3 {
  color: #00adb5;
}
color_4 {
  color: #eeeeee;
}
</style>
