<template>
  <aside class="bg-white h-full shadow-md p-4">
    <h1 class="text-xl font-bold mb-6">My Admin</h1>

    <nav class="space-y-3">
      <router-link to="/" class="block hover:text-blue-500">
        Dashboard
      </router-link>

      <router-link to="/users" class="block hover:text-blue-500">
        Users
      </router-link>
    </nav>
  </aside>
</template>