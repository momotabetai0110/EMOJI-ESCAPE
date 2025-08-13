<template>
    <div class="modal-overlay" v-if="isDisplay">
        <div class="modal-container">

            <div class="modal-header">
                <h5 class="modal-title">{{ title }}</h5>
            </div>
            <div class="modal-body">
                <slot>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: 'モーダル'
    },
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
</script>

<style>
.modal-overlay {
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

.modal-container {
    background-color: cornflowerblue;
    border-radius: 8px;
    max-width: 500px;
    width: 80%;
    max-height: 40vh;
    height: 30%;
    color: aliceblue;
}

.modal-header {
    display: flex;
    justify-content: center;
    background-color: rgb(127, 178, 255);
    height: 15%;
    border-radius: 8px;
}

.modal-body {
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
}
</style>
