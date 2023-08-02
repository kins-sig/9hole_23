<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
      <h1 class="text-h2 font-weight-bold">9Hole</h1>

      <div class="py-4" />

      <v-text-field
        label="How many people are playing?"
        variant="outlined"
        v-model="numOfPlayers">
      </v-text-field>
      <v-text-field
        label="How many rounds are you playing?"
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
            target="_blank"
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
