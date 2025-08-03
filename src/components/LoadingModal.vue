<template>
    <div class="loading-modal-overlay" v-if="isDisplay">
        <div class="loading-modal-container">

            <div class="loading-modal-header">
                <h5 class="loading-modal-title">Now Loading</h5>
            </div>
            <div class="loading-modal-body">
                <h4 class="loading-modal-title" style="padding: 10px;">ロード中...</h4>
                <img alt="earth" src="../assets/earth.png"
                    style="height: 50%; width: 50%;">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch,defineProps } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:modelValue'])
const isDisplay = ref(props.modelValue)

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
