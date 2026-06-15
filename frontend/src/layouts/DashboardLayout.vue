<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar class="w-64" />

    <!-- Main Content -->
    <div class="flex flex-col flex-1">
      <!-- Navbar -->
      <Navbar />

      <!-- Page Content -->
      <main class="p-6 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
</script>