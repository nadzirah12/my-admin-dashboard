<template>
    <div class="login-container">
  
      <form @submit.prevent="login">
  
        <h2>Login</h2>
  
        <input
          v-model="email"
          type="email"
          placeholder="Email"
        />
  
        <input
          v-model="password"
          type="password"
          placeholder="Password"
        />
  
        <button type="submit">
          Login
        </button>
  
        <p v-if="error">
          {{ error }}
        </p>
  
      </form>
  
    </div>
  </template>
  
  
  <script setup>
  import { ref } from "vue";
  import api from "../api/axios";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const email = ref("");
  const password = ref("");
  const error = ref("");
  
  
  const login = async () => {
  
    try {
  
      const response = await api.post(
        "/auth/login",
        {
          email: email.value,
          password: password.value
        }
      );
  
  
      localStorage.setItem(
        "token",
        response.data.token
      );
  
  
      router.push("/dashboard");
  
  
    } catch(err){
  
      error.value = "Invalid credentials!";
  
    }
  
  };
  
  </script>