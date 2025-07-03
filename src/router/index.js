import { createRouter, createWebHistory } from 'vue-router'
import FormularioUsuario from '../components/FormularioUsuario.vue'
import ListaUsuarios from '../components/ListaUsuarios.vue'

const routes = [
  {
    path: '/formulario',
    name: 'Formulario',
    component: FormularioUsuario
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: ListaUsuarios
  },
  {
    path: '/',
    redirect: '/formulario'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router