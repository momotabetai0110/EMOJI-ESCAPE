<template>
  <header style="display: flex; background-color: cornflowerblue;align-items: center;justify-content: center; gap: 20px;">
    <img alt="タイトル画像1"  src="./assets/escape1.png" width="20%" height="20%" />
    <div style="font-family: Meiryo, sans-serif; font-size: 1.5rem;font-weight:bold; color: white;">EMOJI-ESCAPE</div>
    <img alt="タイトル画像2"  src="./assets/escape2.png" width="20%" height="20%" />
  </header>
  <GameLayout />
</template>

<script setup>
import GameLayout from './components/GameLayout.vue'
</script>

<style>
</style>
