<template>
  <div class="flex justify-between items-center">
    
    <div>
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your admin dashboard</p>
    </div>

    <button
      @click="logout"
      class="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { onMounted } from "vue";
const router = useRouter();

// if the user is not logged in, redirect to the login page
onMounted(() => {
  if (!localStorage.getItem("token")) {
    router.push("/login");
  }
});

// logout the user
const auth = useAuthStore(); 

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>