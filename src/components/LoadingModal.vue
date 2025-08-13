<template>
    <div class="loading-modal-overlay" v-if="isDisplay">
        <div class="loading-modal-container">

            <div class="loading-modal-header">
                <h5 class="loading-modal-title">Now Loading</h5>
            </div>
            <div class="loading-modal-body">
                <h4 class="loading-modal-title" style="padding: 10px;">{{ loadingText }}</h4>
                <img alt="earth" src="../assets/earth.png" style="height: 50%; width: 50%;">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, onMounted,onUnmounted } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:modelValue'])
const isDisplay = ref(props.modelValue)
const intervalCount = ref(1)
const loadingText = ref("ロード中")


const startTimer = () => {
    const intervalId = setInterval(() => {
        const count = intervalCount.value % 3
        const dots = '.'.repeat(count+1)
        loadingText.value = `ロード中${dots}`
        intervalCount.value =  (intervalCount.value + 1) % 3
    }, 500)
    return intervalId
}

onMounted(async () => {
    const timerId = startTimer()

    // コンポーネントがアンマウントされた時にタイマーを停止
    onUnmounted(() => {
        if (timerId) {
            clearInterval(timerId)
        }
    })
})


watch(() => props.modelValue, (newValue) => {
    isDisplay.value = newValue
})

watch(isDisplay, (newValue) => {
    emit('update:modelValue', newValue)
})


</script>

<style>
.loading-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.loading-modal-container {
    background-color: cornflowerblue;
    border-radius: 8px;
    max-width: 500px;
    width: 80%;
    max-height: 40vh;
    height: 30%;
    color: aliceblue;
}

.loading-modal-header {
    display: flex;
    justify-content: center;
    background-color: rgb(127, 178, 255);
    border-radius: 8px;
}

.loading-modal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
