<template>
  <form>
    <v-text-field
      v-model="nif"
      :error-messages="nifErrors"
      :counter="10"
      label="NIF"
      required
      @input="$v.nif.$touch()"
      @blur="$v.nif.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="razonSocial"
      :error-messages="razonSocialErrors"
      :counter="90"
      label="Razón Social"
      required
      @input="$v.razonSocial.$touch()"
      @blur="$v.razonSocial.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="direction"
      :error-messages="directionErrors"
      :counter="90"
      label="Direccion"
      required
      @input="$v.direction.$touch()"
      @blur="$v.direction.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="postalCode"
      :error-messages="postalCodeErrors"
      :counter="10"
      label="CP"
      required
      @input="$v.postalCode.$touch()"
      @blur="$v.postalCode.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="province"
      :error-messages="provinceErrors"
      :counter="10"
      label="Provincia"
      required
      @input="$v.province.$touch()"
      @blur="$v.province.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="Correo"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="phoneNumber"
      :error-messages="phoneNumberErrors"
      :counter="10"
      label="Telefono Móvil"
      required
      @input="$v.phoneNumber.$touch()"
      @blur="$v.phoneNumber.$touch()"
    ></v-text-field>

    <v-btn class="mr-4" color="green" @click="submit">Añadir</v-btn>
    <v-btn @click="clear">Limpiar</v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email,numeric,alphaNum } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    nif: { required, maxLength: maxLength(10),alphaNum },
    razonSocial: { required, maxLength: maxLength(90) },
    direction: { required, maxLength: maxLength(90) },
    postalCode: {required,numeric},
    province: {required},
    email: { required, email },
    phoneNumber:{required,numeric},
  },

  data: () => ({
    nif: "",
    email: "",
    razonSocial: '',
    direction: '',
    postalCode:'',
    
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    nifErrors() {
      const errors = [];
      if (!this.$v.nif.$dirty) return errors;
      !this.$v.nif.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.nif.required && errors.push("Name is required.");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    }
  }
};
</script>
