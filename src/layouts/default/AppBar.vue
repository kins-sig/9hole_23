<template>
  <v-app-bar flat>
    <v-btn variant="flat" color="primary" rounded="xl" @click="goBack"> 
      <v-icon start icon="mdi-arrow-left"></v-icon>
    </v-btn>

    <v-img height="64px" width="64px" src="@/assets/9holelogo.png"></v-img>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
