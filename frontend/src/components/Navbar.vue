<template>
  <header class="bg-white shadow px-6 py-4 flex justify-between items-center">

    <!-- Left: Navigation -->
    <div class="flex gap-4 items-center">

      <h2 class="font-semibold text-lg">Admin Panel</h2>

      <nav class="flex gap-3 ml-6">

        <router-link
          to="/"
          class="text-gray-600 hover:text-black"
        >
          Dashboard
        </router-link>

        <router-link
          to="/users"
          class="text-gray-600 hover:text-black"
        >
          Users
        </router-link>

      </nav>

    </div>

    <!-- Right: Logout -->
    <div>
      <button
        @click="logout"
        class="text-red-500 hover:underline"
      >
        Logout
      </button>
    </div>

  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const logout = () => {
  auth.logout(); // remove token from Pinia + localStorage
  router.push("/login");
};
</script>