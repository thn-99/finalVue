<style>
#padre {
  background-color: #302f4d;
}
</style>
<template>
  <v-app id="padre">
    <v-app-bar app color="#120D31" light>
      <router-link to="/"
        ><v-btn plain color="primary">{{ pageTitle }}</v-btn></router-link
      >
      <v-btn to="/about" plain color="accent">About</v-btn>
      <v-btn to="/Client" plain color="accent">Cliente</v-btn>
      <v-btn to="/pruebas" plain color="accent">Cliente</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  created: function() {},

  data: () => ({
    //
    pageTitle: "NavBarSl"
  })
};
</script>
