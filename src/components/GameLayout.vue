<template>
    <div class="game-screen">
        <!-- ここがゲーム画面 -->
        <div ref="userRef" :style="{ transform: `translate(${position.x}px, ${position.y}px)` }">
            <img v-show="userImage" alt="user" src="../assets/escape1_right.png" width="20%" height="20%" />
            <img v-show="!userImage" alt="target" src="../assets/escape1_left.png" width="20%" height="20%" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const userRef = ref(null)
const userImage = ref(true)
const isTouch = ref(false)
const position = ref({ x: 0, y: 0 })
const startPosition = ref({ x: 0, y: 0 })
const lastPosition = ref({ x: 0, y: 0 })



console.log('START')

onMounted(() => {
    userRef.value.addEventListener('touchstart', (e) => {
        e.preventDefault()
        isTouch.value = true
        const touch = e.touches[0]
        startPosition.value = {
            x: touch.clientX - position.value.x,
            y: touch.clientY - position.value.y
        }
    })

    userRef.value.addEventListener('touchend', (e) => {
        e.preventDefault()
        isTouch.value = false
    })

    userRef.value.addEventListener('touchmove', (e) => {
        e.preventDefault()
        if (isTouch.value) {
            const touch = e.touches[0]
            position.value = {
                x: touch.clientX - startPosition.value.x,
                y: touch.clientY - startPosition.value.y
            }
            if (position.value.x > lastPosition.value.x) {
                userImage.value = true
            } else if (position.value.x < lastPosition.value.x) {
                userImage.value = false
            }
            lastPosition.value = {
                x: touch.clientX - startPosition.value.x,
                y: touch.clientY - startPosition.value.y
            }
        }
    })
})
</script>

<style scoped>
.game-screen {
    background: linear-gradient(90deg, #c2f3f3 0%, #c1e9fc 100%);
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>