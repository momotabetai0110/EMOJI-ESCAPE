<template>
    <div class="game-screen" ref="gameScreenRef">
        <!-- ここがゲーム画面 -->
        <div ref="userRef" class="character" :style="{ left: `${position.x}px`, top: `${position.y}px` }">
            <img v-show="userImage" alt="user" src="../assets/escape1_right.png" />
            <img v-show="!userImage" alt="target" src="../assets/escape1_left.png" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const userRef = ref(null)
const gameScreenRef = ref(null)
const userImage = ref(true)
const isTouch = ref(false)
const position = ref({ x: 0, y: 0 })
const startPosition = ref({ x: 0, y: 0 })
const lastPosition = ref({ x: 0, y: 0 })
const gameScreenSize = ref({ width: 0, height: 0 })
const characterSize = ref({ width: 60, height: 60 }) // 固定サイズ

const maxX = computed(() => Math.floor(gameScreenSize.value.width - characterSize.value.width))
const maxY = computed(() => Math.floor(gameScreenSize.value.height - characterSize.value.height))

const updateGameScreenSize = () => {
    if (gameScreenRef.value) {
        const rect = gameScreenRef.value.getBoundingClientRect()
        gameScreenSize.value = {
            width: Math.floor(rect.width),
            height: Math.floor(rect.height)
        }
    }
}

const constrainPosition = (x, y) => {
    const constrainedX = Math.max(0, Math.min(Math.floor(x), maxX.value))
    const constrainedY = Math.max(0, Math.min(Math.floor(y), maxY.value))

    return {
        x: constrainedX,
        y: constrainedY
    }
}

onMounted(() => {
    updateGameScreenSize()

    userRef.value.addEventListener('touchstart', (e) => {
        e.preventDefault()
        isTouch.value = true
        const touch = e.touches[0]
        const rect = gameScreenRef.value.getBoundingClientRect()
        startPosition.value = {
            x: Math.floor(touch.clientX - rect.left - position.value.x),
            y: Math.floor(touch.clientY - rect.top - position.value.y)
        }
    },{passive:false})

    userRef.value.addEventListener('touchend', (e) => {
        e.preventDefault()
        isTouch.value = false
    },{passive:false})

    userRef.value.addEventListener('touchmove', (e) => {
        e.preventDefault()
        if (isTouch.value) {
            const touch = e.touches[0]
            const rect = gameScreenRef.value.getBoundingClientRect()
            const newPosition = {
                x: Math.floor(touch.clientX - rect.left - startPosition.value.x),
                y: Math.floor(touch.clientY - rect.top - startPosition.value.y)
            }

            position.value = constrainPosition(newPosition.x, newPosition.y)

            if (position.value.x > lastPosition.value.x) {
                userImage.value = true
            } else if (position.value.x < lastPosition.value.x) {
                userImage.value = false
            }
            lastPosition.value = { ...position.value }
        }
    },{passive:false})
})
</script>

<style scoped>
.game-screen {
    background: linear-gradient(90deg, #c2f3f3 0%, #c1e9fc 100%);
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.character {
    position: absolute;
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transform: translateZ(0); /* GPUアクセラレーションを有効化 */
}

.character img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}
</style>