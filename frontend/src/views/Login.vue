<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">

    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

      <h2 class="text-3xl font-bold text-center mb-6 text-black">
        Login
      </h2>

      <form @submit.prevent="login" class="space-y-5">

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>


        <!-- Password -->
        <div>

          <label class="block text-sm font-medium mb-2">
            Password
          </label>

          <div class="relative">

            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-3 text-gray-500"
            >
              {{ showPassword ? "Hide" : "Show" }}
            </button>

          </div>

        </div>


        <!-- Error -->
        <p
          v-if="error"
          class="text-red-500 text-sm"
        >
          {{ error }}
        </p>


        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >

          <span v-if="!loading">
            Login
          </span>

          <span v-else>
            Logging in...
          </span>

        </button>


      </form>

    </div>

  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axios";


const router = useRouter();


const email = ref("");
const password = ref("");

const error = ref("");
const loading = ref(false);

const showPassword = ref(false);



const login = async () => {

  error.value = "";


  // Validation
  if (!email.value || !password.value) {
    error.value = "Email and password are required";
    return;
  }


  try {

    loading.value = true;


    const response = await api.post(
      "/auth/login",
      {
        email: email.value,
        password: password.value
      }
    );


    const token = response.data.token;


    localStorage.setItem(
      "token",
      token
    );


    router.push("/");


  } catch (err) {


    if(err.response?.status === 401){

      error.value = "Invalid email or password";

    } else {

      error.value = "Something went wrong. Please try again.";

    }


  } finally {

    loading.value = false;

  }

};

</script>