<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="clientes"
      :search="search"
      :loading="cargando"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Añadir Cliente
              </v-btn>
            </template>
            <add-client-form />
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Borrar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon large class="mr-2" @click="editItem(item)">
          mdi-eye
        </v-icon>

        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import AddClientForm from "./AddClientForm.vue";
import axios from "axios";
export default {
  components: {
    AddClientForm
  },
  data: () => ({
    search: "",
    cargando: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "NIF",
        align: "start",
        sortable: false,
        value: "NIF"
      },
      { text: "Teléfono", value: "telefono" },
      //{ text: "Fat (g)", value: "codigopostal" },
      { text: "Correo", value: "correo" },
      //{ text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    clientes: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo cliente" : "Editar cliente";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  async created() {
    let response = await axios.post(
      "http://facturas-api.daw.thnahmd.es/clientes"
    );
    console.log(response);
    this.clientes = response.data;
    this.cargando = false;
  },
  methods: {
    initialize() {
      this.clientes = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.clientes.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.clientes[this.editedIndex], this.editedItem);
      } else {
        this.clientes.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
