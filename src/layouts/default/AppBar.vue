<template>
  <v-app-bar flat>
    <v-btn :to="{path: '/'}" variant="flat" color="primary"> 
      <v-icon start icon="mdi-arrow-left"></v-icon>
      Start Over
    </v-btn>

    <v-img height="64px" width="64px" src="@/assets/9holelogo.png"></v-img>

    <v-btn variant="flat" color="secondary">Reset</v-btn>
  </v-app-bar>
</template>

<script setup>
</script>
