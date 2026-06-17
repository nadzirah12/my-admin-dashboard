<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Users</h1>
  
      <p v-if="users.length === 0">No users found</p>

      <p v-if="loading">Loading users...</p>
      
      <table class="w-full border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">ID</th>
            <th class="p-2 border">Name</th>
            <th class="p-2 border">Email</th>
            <th class="p-2 border">Status</th>
            <th class="p-2 border">Actions</th>
          </tr>
        </thead>
  
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="p-2 border">{{ user.id }}</td>
            <td class="p-2 border">{{ user.name }}</td>
            <td class="p-2 border">{{ user.email }}</td>
            <td class="p-2 border">
              <span
                :class="user.status === 'active'
                  ? 'text-green-600'
                  : 'text-red-600'"
              >
                {{ user.status }}
              </span>
            </td>
  
            <td class="p-2 border space-x-2">
              <button class="bg-blue-500 text-white px-2 py-1 rounded">
                View
              </button>
  
              <button class="bg-yellow-500 text-white px-2 py-1 rounded">
                Edit
              </button>
  
              <button
                @click="deleteUser(user.id)"
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
    </div>
  </template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const users = ref([]);

const loading = ref(false);

const fetchUsers = async () => {
  try {
    const res = await api.get("/users");
    users.value = res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

const deleteUser = (id) => {
  users.value = users.value.filter(user => user.id !== id);
};

onMounted(() => {
  fetchUsers();
});
</script>