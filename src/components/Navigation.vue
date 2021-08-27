<template>
  <nav
    class="z-40 flex items-center justify-between px-6 py-2 text-white bg-secondary"
  >
    <div>
      <router-link to="/" custom v-slot="{ navigate }">
        <img
          @click="navigate"
          role="link"
          class="w-14"
          src="@/assets/MoB-logo.png"
          alt="Mail On Bike Logo"
        />
      </router-link>
    </div>

    <div v-if="currentUser" class="flex flex-row items-center space-x-6">
      <!-- Navigation -->
      <router-link
        v-for="nav in navigationMenu"
        :key="nav.title"
        :to="nav.link"
        custom
        v-slot="{ navigate, isActive }"
        class="p-2 font-bold rounded-lg cursor-pointer"
      >
        <span @click="navigate" role="link" :class="{ 'bg-info': isActive }">
          {{ nav.title }}
        </span>
      </router-link>

      <!-- Dropdown Menu -->
      <div>
        <button
          class="px-4 py-2 font-bold text-white bg-primary rounded-xl focus:outline-none"
          @click="dropMenu = !dropMenu"
        >
          {{ currentUser.username }}
        </button>

        <transition name="fade">
          <div
            v-if="dropMenu"
            class="absolute z-40 flex flex-col mt-1 text-sm text-black bg-white rounded shadow-xl sub-menu right-4"
            v-click-outside="clickExterno"
          >
            <router-link
              :to="link.link"
              custom
              v-slot="{ navigate }"
              v-for="link in linksDropMenu"
              :key="link.title"
            >
              <span
                @click="navigate"
                role="link"
                class="block w-full px-4 py-2 rounded cursor-pointer hover:bg-info hover:text-white text-primary"
              >
                {{ link.title }}
              </span>
            </router-link>
            <div class="divider" />
            <button
              class="px-4 py-2 rounded link hover:bg-info hover:text-white text-primary"
              @click.prevent="logOut"
            >
              Cerrar Sesión
            </button>
          </div>
        </transition>
      </div>
    </div>

    <div class="content-center" v-else>
      <router-link
        to="/login"
        custom
        v-slot="{ navigate }"
        class="font-bold cursor-pointer"
      >
        <span @click="navigate" role="link">
          Inicia Sesión
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  data() {
    return {
      dropMenu: false,
      linksDropMenu: [
        { title: "Mi Perfil", link: "/perfil" },
        { title: "Crear usuario", link: "/register" },
        { title: "Crear usuario Cliente", link: "/nuevo-usuario-cliente" },
        { title: "Equipo MoB Admin", link: "/equipo-admin" },
      ],
      navigationMenu: [
        {
          title: "Finanzas",
          link: "/finanzas/historial-pedidos",
        },
        {
          title: "Empresas",
          link: "/empresas/tablero-empresas",
        },
        {
          title: "Clientes",
          link: "/clientes/tablero-clientes",
        },
        {
          title: "MoBikers",
          link: "/mobikers/equipo-mobiker",
        },
        {
          title: "Pedidos",
          link: "/pedidos/tablero-pedidos",
        },
      ],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  directives: {
    vClickOutside: vClickOutside.directive,
  },
  methods: {
    logOut() {
      this.$store.dispatch("logout");
      this.dropMenu = false;
      this.$router.push("/login");
    },
    clickExterno() {
      this.dropMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.divider {
  width: 100%;
  height: 2px;
  background: #303868;
}

.link {
  cursor: pointer;
}
</style>
