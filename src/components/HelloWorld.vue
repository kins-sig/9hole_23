<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height='300px' src="../assets/9holelogo.png"></v-img>

      <div class="py-4" />

      <v-text-field
        label="How many people are playing?"
        type="number"
        variant="outlined"
        v-model="numOfPlayers">
      </v-text-field>
      <v-text-field
        label="How many rounds are you playing?"
        type="number"
        variant="outlined"
        v-model="numOfHoles">
      </v-text-field>

      <div class="py-4" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            @click="handleButtonClick"
            color="primary"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
          >
            Play
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
  import router from '@/router';
  import { ref } from 'vue';

  let numOfPlayers = ref('');
  let numOfHoles = ref('');


  function handleButtonClick(){
    router.push({name: 'Overview', params: {players: numOfPlayers.value, holes: numOfHoles.value}});
  }
</script>
