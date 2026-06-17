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
            <!-- <th class="p-2 border">Status</th> -->
            <th class="p-2 border">Actions</th>
          </tr>
        </thead>
  
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="p-2 border">{{ user.id }}</td>
            <td class="p-2 border">{{ user.name }}</td>
            <td class="p-2 border">{{ user.email }}</td>
            <!-- will be affected when return status column -->
            <!-- <td class="p-2 border">
              <span
                :class="user.status === 'active'
                  ? 'text-green-600'
                  : 'text-red-600'"
              >
                {{ user.status }}
              </span>
            </td> -->
  
            <td class="p-2 border space-x-2">
              <button 
                @click="viewUser(user)"
                class="bg-blue-500 text-white px-2 py-1 rounded">
                View
              </button>
  
              <button 
                @click="openEdit(user)"
                class="bg-yellow-500 text-white px-2 py-1 rounded">
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
  
      <!-- VIEW MODAL -->
      <div v-if="isViewOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

        <div class="bg-white p-6 rounded w-96">

          <h2 class="text-xl font-bold mb-4">User Details</h2>

          <p><strong>ID:</strong> {{ selectedUser.id }}</p>
          <p><strong>Name:</strong> {{ selectedUser.name }}</p>
          <p><strong>Email:</strong> {{ selectedUser.email }}</p>

          <button
            @click="isViewOpen = false"
            class="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>

        </div>
      </div>

      <!-- EDIT MODAL -->
      <div v-if="isEditOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

        <div class="bg-white p-6 rounded w-96">

          <h2 class="text-xl font-bold mb-4">Edit User</h2>

          <input
            v-model="editForm.name"
            class="border p-2 w-full mb-2"
            placeholder="Name"
          />

          <input
            v-model="editForm.email"
            class="border p-2 w-full mb-2"
            placeholder="Email"
          />

          <div class="flex justify-end space-x-2 mt-4">

            <button
              @click="isEditOpen = false"
              class="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              @click="updateUser"
              class="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>

          </div>

        </div>
      </div>
      
    </div>
  </template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const users = ref([]);
const loading = ref(false);
const selectedUser = ref(null);
const isViewOpen = ref(false);
const isEditOpen = ref(false);

const fetchUsers = async () => {
  try {
    const res = await api.get("/users");
    users.value = res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

const viewUser = (user) => {
  selectedUser.value = user;
  isViewOpen.value = true;
};

const editForm = ref({
  id: null,
  name: "",
  email: ""
});

const openEdit = (user) => {
  editForm.value = { ...user };
  isEditOpen.value = true;
};

const updateUser = async () => {
  try {
    await api.put(`/users/${editForm.value.id}`, {
      name: editForm.value.name,
      email: editForm.value.email
    });

    // update UI instantly
    const index = users.value.findIndex(u => u.id === editForm.value.id);

    if (index !== -1) {
      users.value[index] = { ...editForm.value };
    }

    isEditOpen.value = false;

  } catch (error) {
    console.error("Failed to update user:", error);
  }
};

const deleteUser = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this user?");

  if (!confirmDelete) return;

  try {
    await api.delete(`/users/${id}`);

    // remove from UI after successful delete
    users.value = users.value.filter(user => user.id !== id);

  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>