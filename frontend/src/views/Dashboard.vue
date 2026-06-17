<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div class="grid grid-cols-2 gap-4">

      <div class="bg-blue-500 text-white p-4 rounded">
        <h2 class="text-lg">Total Users</h2>
        <p class="text-3xl font-bold">{{ totalUsers }}</p>
      </div>

      <div class="bg-green-500 text-white p-4 rounded">
        <h2 class="text-lg">Active Users</h2>
        <p class="text-3xl font-bold">{{ activeUsers }}</p>
      </div>

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
import { ref, onMounted } from "vue";
import api from "../api/axios";

const router = useRouter();

let totalUsers = 0;
let activeUsers = 0;

const fetchStats = async () => {
  try {
    const res = await api.get("/users/stats");

    totalUsers.value = res.data.totalUsers;
    activeUsers.value = res.data.activeUsers;

  } catch (error) {
    console.error("Failed to load stats:", error);
  }
};

// if the user is not logged in, redirect to the login page
onMounted(() => {
  fetchStats();

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