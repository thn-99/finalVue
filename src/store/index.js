import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    texto: "Hola",
    clientes: [],
  },
  mutations: {
    recargar(state){
      axios.post("http://facturas-api.daw.thnahmd.es/clientes")
        .then(
          response =>
            state.clientes = response.data);
    },
    deleteById(id){
      //let send = {'id':4};
      axios.delete("http://facturas-api.daw.thnahmd.es/cliente",{params:{'id':id}})
        .then(
          response =>
            console.log(response));
      this.recargar();
    }
  },
  actions: {},
  modules: {},
});
