<template>
  <BContainer class="mt-5">
    <h2 class="mb-4">Usuarios desde MockAPI</h2>
    
    <BButton @click="fetchUsuarios" variant="primary" class="mb-4">
      Obtener Usuarios
    </BButton>
    
    <BAlert :show="cargando" variant="info">Cargando datos...</BAlert>
    
    <BAlert :show="!!error" variant="danger">{{ error }}</BAlert>
    
    <BTable striped hover :items="usuarios" :fields="camposTabla" v-if="usuarios.length"></BTable>
    
    <BAlert :show="!usuarios.length && !cargando && !error" variant="secondary">
      No hay usuarios para mostrar. Haz clic en "Obtener Usuarios" para cargar datos.
    </BAlert>
  </BContainer>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const usuarios = ref([])
    const cargando = ref(false)
    const error = ref(null)
    const camposTabla = ref([
      { key: 'nombre', label: 'Nombre' },
      { key: 'email', label: 'Email' },
      { key: 'telefono', label: 'Teléfono' }
    ])

    const fetchUsuarios = async () => {
      cargando.value = true
      error.value = null
      try {
        const response = await axios.get('https://6862964d96f0cc4e34ba4d07.mockapi.io/usuarios')
        usuarios.value = response.data
      } catch (err) {
        error.value = 'Error al cargar los usuarios: ' + (err.message || 'Error desconocido')
        console.error(err)
      } finally {
        cargando.value = false
      }
    }

    return {
      usuarios,
      cargando,
      error,
      camposTabla,
      fetchUsuarios
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>