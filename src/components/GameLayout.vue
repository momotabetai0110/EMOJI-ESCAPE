<template>

    <div class="game-screen" ref="gameScreenRef">

        <!-- スタート -->
        <div v-if="gameStatus == 0">
            <div class="start-screen" @click="startGame">
                <img alt="help" src="../assets/help.png" style="height: 10%; width: 15%;" @click.stop="openHelp()">
                <div class="start-text">START!!</div>
            </div>
        </div>

        <!-- ゲーム画面 -->
        <div v-if="gameStatus != 0" class="count-time">
            {{ Math.floor(countTime / 100).toString().padStart(2, '0') }}.{{ (countTime % 60).toString().padStart(2,
                '0')
            }} </div>

        <div ref="playerRef" class="character" :style="{ left: `${playerPosition.x}px`, top: `${playerPosition.y}px` }">
            <img v-show="isRight" alt="player" src="../assets/escape1_right.png" />
            <img v-show="!isRight" alt="player" src="../assets/escape1_left.png" />
        </div>
        <div ref="targetRef" class="character" :style="{ left: `${targetPosition.x}px`, top: `${targetPosition.y}px` }">
            <img v-show="isRight" alt="target" src="../assets/escape2_right.png" />
            <img v-show="!isRight" alt="target" src="../assets/escape2_left.png" />
        </div>



        <!-- モーダル -->
        <div v-if="isModal">
            <BaseModal v-model="isModal" :title=modalTitle>
                <!-- ゲームクリア -->
                <div v-if="gameStatus == 2" class="modal-content">
                    <h1>ゲームクリア！！</h1>
                    <div class="modal-inner">
                        <img alt="game-clear" src="../assets/game-clear.png" style="height: 50%; width: 50%;">
                        <div class="modal-button">
                            <div>スコア：{{ score }}</div>
                            <button type="button" class="btn btn-light" @click="resetGame()">再挑戦</button>
                            <button type="button" class="btn btn-light">ランキングへ</button>
                        </div>
                    </div>
                </div>
                <!-- ゲームオーバー -->
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
                <!-- 遊び方 -->
                <div v-if="gameStatus == 0" class="modal-content" style="padding-top: 25px;">
                    <h4>指で<img alt="player" src="../assets/escape1_right.png"
                            style="height: 5%; width: 10%; padding-top: 10px;">を動かすことができます</h4>
                    <div class="modal-inner">
                        <div class="modal-rule">
                            <h6>【ゲームクリア】</h6>
                            <p>時間内に<img alt="target" src="../assets/escape2_right.png"
                                    style="height: 5%; width: 10%;">をつかまえる。</p>
                            <h6>【ゲームオーバー】</h6>
                            <p><img alt="target" src="../assets/escape2_right.png"
                                    style="height: 5%; width: 10%;">が画面端に到達するか15秒経過する。</p>
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
const gameStatus = ref(0) // 0: スタート画面, 1: ゲーム中, 2: ゲームクリア, 3: ゲームオーバー, 4: 遊び方
const countTime = ref(1500) //1500ミリ秒(15秒)
const isModal = ref(false) //モーダル表示
const modalTitle = ref('') //モーダルタイトル
const timer = ref(null)

//ゲーム画面管理
const gameScreenRef = ref(null)
const gameScreenSize = ref({ width: 0, height: 0 })
const isTouch = ref(false) //true:タッチ中,false:タッチしていない
const score = ref(0)

//ゲームキャラ管理
const playerRef = ref(null)
const playerPosition = ref({ x: 0, y: 0 })
const targetRef = ref(null)
const targetPosition = ref({ x: 200, y: 200 })
const isRight = ref(true) //true:右向き,false:左向き
const startPosition = ref({ x: 0, y: 0 })
const lastPosition = ref({ x: 0, y: 0 }) //前回のプレイヤーの位置
const maxX = computed(() => Math.floor(gameScreenSize.value.width - 60)) //キャラクターの最大x座標
const maxY = computed(() => Math.floor(gameScreenSize.value.height - 60)) //キャラクターの最大y座標

//遊び方
const openHelp = () => {
    gameStatus.value = 0
    modalTitle.value = 'ルール'
    isModal.value = true
}

//遊び方を閉じる
const closeHelp = () => {
    gameStatus.value = 0
    isModal.value = false
}


//ゲームスタート
const startGame = () => {
    gameStatus.value = 1
    startTimer()
}

//タイマースタート
const startTimer = () => {
    timer.value = setInterval(() => {
        countTime.value--
        if (countTime.value <= 0) {
            gameStatus.value = 3
            clearInterval(timer.value)
            gameOver()
        }
    }, 10)
}

//ゲームオーバー
const gameOver = () => {
    isTouch.value = false
    clearInterval(timer.value)
    modalTitle.value = 'ゲームオーバー'
    isModal.value = true

}

//ゲームクリア
const gameClear = () => {
    clearInterval(timer.value)
    console.log(countTime.value)
    score.value = 1500 - (1500 - countTime.value)
    modalTitle.value = 'ゲームクリア'
    isModal.value = true
}

//ゲームリセット
const resetGame = () => {
    gameStatus.value = 0
    countTime.value = 1000
    isModal.value = false
    targetPosition.value = { x: 200, y: 200 }
    playerPosition.value = { x: 0, y: 0 }
    isRight.value = true
}

//ゲーム画面サイズの取得
const updateGameScreenSize = () => {
    if (gameScreenRef.value) {
        const rect = gameScreenRef.value.getBoundingClientRect()
        gameScreenSize.value = {
            width: Math.floor(rect.width),
            height: Math.floor(rect.height)
        }
    }
}

//キャラクターの位置を制限
const constrainPosition = (x, y) => {
    const constrainedX = Math.max(0, Math.min(Math.floor(x), maxX.value))
    const constrainedY = Math.max(0, Math.min(Math.floor(y), maxY.value))

    return {
        x: constrainedX,
        y: constrainedY
    }
}

//ターゲットが逃げる処理
const escapeTarget = (distanceX, distanceY, distance) => {
    const escapeX = (distanceX / distance) * -20
    const escapeY = (distanceY / distance) * -20

    const newPosition = {
        x: targetPosition.value.x + escapeX,
        y: targetPosition.value.y + escapeY
    }
    targetPosition.value = constrainPosition(newPosition.x, newPosition.y)

    //ターゲットが画面の端に到達したらゲームオーバー
    if (targetPosition.value.x == 0 || targetPosition.value.x == maxX.value || targetPosition.value.y == 0 || targetPosition.value.y == maxY.value) {
        gameStatus.value = 3
        gameOver()
    }
}

onMounted(() => {
    //ゲーム画面サイズの取得
    updateGameScreenSize()

    //プレイヤーをタッチした時の処理
    playerRef.value.addEventListener('touchstart', (e) => {
        e.preventDefault()
        isTouch.value = true
        const touch = e.touches[0]
        const rect = gameScreenRef.value.getBoundingClientRect()
        startPosition.value = {
            x: Math.floor(touch.clientX - rect.left - playerPosition.value.x),
            y: Math.floor(touch.clientY - rect.top - playerPosition.value.y)
        }
    }, { passive: false })

    //プレイヤーから指を離した時の処理
    playerRef.value.addEventListener('touchend', (e) => {
        e.preventDefault()
        isTouch.value = false
    }, { passive: false })

    //プレイヤーをタッチしながら移動した時の処理
    playerRef.value.addEventListener('touchmove', (e) => {
        e.preventDefault()
        if (isTouch.value) {
            const touch = e.touches[0]
            const rect = gameScreenRef.value.getBoundingClientRect()
            const newPosition = {
                x: Math.floor(touch.clientX - rect.left - startPosition.value.x),
                y: Math.floor(touch.clientY - rect.top - startPosition.value.y)
            }

            playerPosition.value = constrainPosition(newPosition.x, newPosition.y)

            if (playerPosition.value.x > lastPosition.value.x) {
                isRight.value = true
            } else if (playerPosition.value.x < lastPosition.value.x) {
                isRight.value = false
            }
            lastPosition.value = { ...playerPosition.value }

            //ターゲットとプレイヤーの距離を計算
            for (let i = 0; i < 10; i++) {
                const dx = playerPosition.value.x - targetPosition.value.x
                const dy = playerPosition.value.y - targetPosition.value.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                //距離が100以上の場合は処理中止
                if (distance >= 100) break;

                if (distance < 60) {
                    //距離が60未満の場合はゲームクリア
                    gameStatus.value = 2
                    gameClear()
                } else if (distance < 100) {
                    //距離が100未満の場合はターゲットが逃げる
                    escapeTarget(dx, dy, distance)
                }
            }
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

.modal-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.modal-button {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.modal-rule {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    margin-bottom: 0%;

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
    flex-direction: column;
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