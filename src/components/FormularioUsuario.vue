<template>
  <div class="container mt-5">
    <h2 class="mb-4">Registro de Usuario</h2>
    
    <BForm @submit.prevent="submitForm" class="border p-4 rounded">
      <!-- Campo Nombre -->
      <BFormGroup label="Nombre completo:" label-for="nombre" class="mb-3">
        <BFormInput
          id="nombre"
          v-model="usuario.nombre"
          :state="validarNombre"
          placeholder="Mínimo 5 caracteres"
          @blur="touched.nombre = true"
        ></BFormInput>
        <BFormInvalidFeedback v-if="touched.nombre && !validarNombre">
          El nombre debe tener entre 5 y 15 caracteres
        </BFormInvalidFeedback>
      </BFormGroup>

      <!-- Campo Email -->
      <BFormGroup label="Email:" label-for="email" class="mb-3">
        <BFormInput
          id="email"
          v-model="usuario.email"
          type="email"
          :state="validarEmail"
          placeholder="ejemplo@mail.com"
          @blur="touched.email = true"
        ></BFormInput>
        <BFormInvalidFeedback v-if="touched.email && !validarEmail">
          Ingrese un email válido
        </BFormInvalidFeedback>
      </BFormGroup>

      <!-- Campo Teléfono -->
      <BFormGroup label="Teléfono:" label-for="telefono" class="mb-4">
        <BFormInput
          id="telefono"
          v-model="usuario.telefono"
          :state="validarTelefono"
          placeholder="+5493512345678"
          @blur="touched.telefono = true"
        ></BFormInput>
        <BFormInvalidFeedback v-if="touched.telefono && !validarTelefono">
          Mínimo 6 caracteres
        </BFormInvalidFeedback>
      </BFormGroup>

      <div class="d-flex justify-content-between align-items-center">
        <BButton 
          type="submit" 
          variant="primary" 
          :disabled="!formValido"
          class="px-4"
        >
          <span v-if="!enviando">Registrar</span>
          <BSpinner small v-else></BSpinner>
        </BButton>

        <BButton 
          @click="resetForm" 
          variant="outline-secondary"
        >
          Limpiar
        </BButton>
      </div>
    </BForm>

    <!-- Notificación flotante -->
    <BToast
      v-model="mostrarToast"
      :title="toastTitulo"
      :variant="toastVariant"
      solid
      auto-hide-delay="5000"
      class="position-fixed top-0 end-0 m-3"
    >
      {{ toastMensaje }}
    </BToast>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usuario: {
        nombre: '',
        email: '',
        telefono: ''
      },
      touched: {
        nombre: false,
        email: false,
        telefono: false
      },
      enviando: false,
      mostrarToast: false,
      toastTitulo: '',
      toastMensaje: '',
      toastVariant: 'success'
    };
  },
  computed: {
    validarNombre() {
      return !this.touched.nombre ? null : 
             this.usuario.nombre.length >= 5 && 
             this.usuario.nombre.length <= 15;
    },
    validarEmail() {
      if (!this.touched.email) return null;
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(this.usuario.email);
    },
    validarTelefono() {
      return !this.touched.telefono ? null : 
             this.usuario.telefono.length >= 6;
    },
    formValido() {
      return this.validarNombre && 
             this.validarEmail && 
             this.validarTelefono;
    }
  },
  methods: {
    async submitForm() {
      this.enviando = true;
      
      try {
        const response = await axios.post(
          'https://6862964d96f0cc4e34ba4d07.mockapi.io/usuarios',
          this.usuario
        );

        this.mostrarFeedback(
          '¡Registro exitoso!',
          `Usuario ${response.data.nombre} creado`,
          'success'
        );
        
        this.resetForm();
        
      } catch (error) {
        this.mostrarFeedback(
          'Error',
          error.response?.data?.message || 'Error al conectar con el servidor',
          'danger'
        );
      } finally {
        this.enviando = false;
      }
    },
    resetForm() {
      this.usuario = {
        nombre: '',
        email: '',
        telefono: ''
      };
      this.touched = {
        nombre: false,
        email: false,
        telefono: false
      };
    },
    mostrarFeedback(titulo, mensaje, variant) {
      this.toastTitulo = titulo;
      this.toastMensaje = mensaje;
      this.toastVariant = variant;
      this.mostrarToast = true;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>