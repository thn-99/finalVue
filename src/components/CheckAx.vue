<template>
    <div>
        <v-btn v-on:click="submit()">Obten de base</v-btn>
        {{texto}}
    </div>
</template>

<script>
//import axios from "axios";

//console.log(store.state.text);
export default {

  data: () => ({
      texto:"",
      
  }),

  methods: {
    submit() {
      this.$store.commit("deleteById",4);
      //this.$v.$touch();
    },acceso() {
  // Simple POST request with a JSON body using axios

    }

  }
};
</script>