<template>

    <div class="game-screen" ref="gameScreenRef">

        <!-- ゲーム画面 -->
        <div v-if="gameStatus != 0" class="count-time">
            {{ Math.floor(countTime / 100).toString().padStart(2, '0') }}.{{ (countTime % 60).toString().padStart(2,
                '0') }} </div>

        <div ref="userRef" class="character" :style="{ left: `${position.x}px`, top: `${position.y}px` }">
            <img v-show="userImage" alt="user" src="../assets/escape1_right.png" />
            <img v-show="!userImage" alt="user" src="../assets/escape1_left.png" />
        </div>
        <div ref="targetRef" class="character" :style="{ left: `${targetPosition.x}px`, top: `${targetPosition.y}px` }">
            <img v-show="userImage" alt="target" src="../assets/escape2_right.png" />
            <img v-show="!userImage" alt="target" src="../assets/escape2_left.png" />
        </div>

        <!-- スタート画面 -->
        <div v-if="gameStatus == 0">
            <div class="start-screen" @click="startGame">
                <div class="start-text">START!!</div>
            </div>
        </div>

        <!-- モーダル画面 -->
        <div v-if="isModal">
            <BaseModal v-model="isModal" :title=modalTitle>
                <div v-if="gameStatus == 3" class="modal-content">
                    <h1>逃げられてしまった...</h1>
                    <div class="modal-inner">
                        <img alt="game-over" src="../assets/game-over.png" style="height: 35%; width: 35%;">
                        <div class="modal-button">
                            <button type="button" class="btn btn-light" @click="resetGame()">再挑戦</button>
                            <button type="button" class="btn btn-light">ランキングへ</button>
                        </div>
                    </div>
                </div>
                <div v-if="gameStatus == 2" class="modal-content">
                    <h1>クリア！！</h1>
                    <div class="modal-inner">
                        <img alt="game-over" src="../assets/game-clear.png" style="height: 50%; width: 50%;">
                        <div class="modal-button">
                            <button type="button" class="btn btn-light" @click="resetGame()">再挑戦</button>
                            <button type="button" class="btn btn-light">ランキングへ</button>
                        </div>
                    </div>
                </div>
            </BaseModal>

        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BaseModal from './BaseModal.vue'

//ゲームステータス管理
const gameStatus = ref(0) // 0: スタート画面, 1: ゲーム中, 2: ゲームクリア, 3: ゲームオーバー
const countTime = ref(100) //1500ミリ秒
const isModal = ref(false)
const modalTitle = ref('')

//ゲームキャラ管理
const userRef = ref(null)
const targetRef = ref(null)
const gameScreenRef = ref(null)
const userImage = ref(true)
const isTouch = ref(false)
const position = ref({ x: 0, y: 0 })
const targetPosition = ref({ x: 200, y: 200 })
const startPosition = ref({ x: 0, y: 0 })
const lastPosition = ref({ x: 0, y: 0 })
const gameScreenSize = ref({ width: 0, height: 0 })
const characterSize = ref({ width: 60, height: 60 }) // 固定サイズ

const maxX = computed(() => Math.floor(gameScreenSize.value.width - characterSize.value.width))
const maxY = computed(() => Math.floor(gameScreenSize.value.height - characterSize.value.height))

const startGame = () => {
    gameStatus.value = 1
    startTimer()

}

const startTimer = () => {
    const timer = setInterval(() => {
        countTime.value--
        if (countTime.value <= 0) {
            gameStatus.value = 2
            clearInterval(timer)
            gameOver()
        }
    }, 10)
}

const gameOver = () => {
    isModal.value = true
    modalTitle.value = 'ゲームオーバー'

}

const resetGame = () => {
    gameStatus.value = 0
    countTime.value = 1000
    isModal.value = false
    targetPosition.value = { x: 200, y: 200 }
    position.value = { x: 0, y: 0 }
    userImage.value = true
}
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

const moveTarget = (distanceX, distanceY, distance) => {
    if (distance < 100) {
        // プレイヤーの位置に基づいて移動方向を決定
        const dx = position.value.x - targetPosition.value.x
        const dy = position.value.y - targetPosition.value.y

        // 方向ベクトルを正規化
        const moveX = (dx / distance) * -5
        const moveY = (dy / distance) * -5

        const newPosition = {
            x: targetPosition.value.x + moveX,
            y: targetPosition.value.y + moveY
        }
        targetPosition.value = constrainPosition(newPosition.x, newPosition.y)
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
    }, { passive: false })

    userRef.value.addEventListener('touchend', (e) => {
        e.preventDefault()
        isTouch.value = false
    }, { passive: false })

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

            // 実際の距離を計算（絶対値は使用しない）
            const dx = position.value.x - targetPosition.value.x
            const dy = position.value.y - targetPosition.value.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            moveTarget(dx, dy, distance)
        }
    }, { passive: false })
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

.modal-content {
    align-items: center;
}

.modal-inner{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.modal-button{
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

}

.modal-button .btn {
    font-size: 14px;
    padding: 3px;
    width: 100px;
}

.character {
    position: absolute;
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transform: translateZ(0);
    /* GPUアクセラレーションを有効化 */
}

.character img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}

.start-screen {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    background-color: rgba(0, 0, 0, 0.2);
}

.start-text {
    font-size: 100px;
    color: #ffffff;
    z-index: 3;
    animation: blink 1s infinite;
}

@keyframes blink {

    0%,
    49% {
        opacity: 1;
    }

    50%,
    100% {
        opacity: 0;
    }
}

.count-time {
    position: absolute;
    z-index: 2;
    top: 0;
    color: #1395ff;
    font-size: 30px;
}
</style>