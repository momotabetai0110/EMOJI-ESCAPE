<template>
  <div class="app-wrapper">
    <header class="app-vue" style="background-color: cornflowerblue;">
      <img alt="タイトル1" src="./assets/escape1.png" width="20%" height="20%" />
      <div style="font-family: Meiryo, sans-serif; font-size: 1.5rem;font-weight:bold; color: white;">EMOJI-ESCAPE</div>
      <img alt="タイトル2" src="./assets/escape2.png" width="20%" height="20%" />
    </header>
    <!-- <RankingLayout />
    <GameLayout/> -->
    <RouterView />
    <footer class="app-vue" style="background-color:honeydew">

      <RouterLink to="/" class="btn btn-dark"
        style="display: inline-flex; align-items: center; gap: 8px; width: fit-content;"
        :class="{ 'disabled': screenMode === 0 }">

        <img alt="ゲーム" src="./assets/favorite.png" width="30%" height="30%" />
        ゲーム
      </RouterLink>

      <RouterLink to="/ranking" class="btn btn-dark"
        style="display: inline-flex; align-items: center; gap: 8px; width: fit-content;"
        :class="{ 'disabled': screenMode === 1 }">
        <img alt="ランキング" src="./assets/ranking.png" width="30%" height="30%" />
        ランキング
      </RouterLink>

    </footer>
  </div>
</template>

<script setup>
import { ref,watch } from 'vue'
import { RouterView, RouterLink,useRoute } from 'vue-router'

const screenMode = ref(0)
const route = useRoute()

watch(()=>route.path,(newPath)=>{
  if(newPath === '/'){
    screenMode.value = 0
  }else if (newPath === '/ranking'){
    screenMode.value = 1
  }
})
</script>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-vue {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
