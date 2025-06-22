<template>
  <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalId + 'Label'" aria-hidden="true">
    <div class="modal-dialog" :class="modalSize">
      <div class="modal-content">
        <!-- ヘッダー -->
        <div class="modal-header" v-if="showHeader">
          <h5 class="modal-title" :id="modalId + 'Label'">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- ボディ -->
        <div class="modal-body">
          <slot name="body">
            {{ content }}
          </slot>
        </div>

        <!-- フッター -->
        <div class="modal-footer" v-if="showFooter">
          <slot name="footer">
            <button
              v-for="button in buttons"
              :key="button.id"
              type="button"
              class="btn"
              :class="button.class"
              @click="handleButtonClick(button)"
            >
              {{ button.text }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  modalId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'モーダル'
  },
  content: {
    type: String,
    default: ''
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  modalSize: {
    type: String,
    default: '', // '', 'modal-sm', 'modal-lg', 'modal-xl'
    validator: (value) => ['', 'modal-sm', 'modal-lg', 'modal-xl'].includes(value)
  },
  buttons: {
    type: Array,
    default: () => [
      {
        id: 'close',
        text: '閉じる',
        class: 'btn-secondary',
        action: 'close'
      }
    ]
  }
})

// Emits
const emit = defineEmits(['button-click', 'show', 'hide'])

// Reactive data
const modalInstance = ref(null)

// Methods
const show = () => {
  if (modalInstance.value) {
    modalInstance.value.show()
  }
}

const hide = () => {
  if (modalInstance.value) {
    modalInstance.value.hide()
  }
}

const handleButtonClick = (button) => {
  emit('button-click', button)

  if (button.action === 'close') {
    hide()
  }
}

// Lifecycle
onMounted(() => {
  const modalElement = document.getElementById(props.modalId)
  if (modalElement) {
    // Bootstrapが読み込まれているかチェック
    if (typeof bootstrap === 'undefined') {
      console.error('Bootstrap is not loaded. Please check the import order in main.js')
      return
    }

    modalInstance.value = new bootstrap.Modal(modalElement, {
      backdrop: true,
      keyboard: true,
      focus: true
    })

    // イベントリスナーを追加
    modalElement.addEventListener('show.bs.modal', () => emit('show'))
    modalElement.addEventListener('hide.bs.modal', () => emit('hide'))
  }
})

onUnmounted(() => {
  if (modalInstance.value) {
    modalInstance.value.dispose()
  }
})

// Expose methods
defineExpose({
  show,
  hide
})
</script>

<style scoped>
.modal-dialog {
  max-width: 400px;

}

.modal-dialog.modal-sm {
  max-width: 300px;
  align-self: center;
  justify-content: center;
}

.modal-dialog.modal-lg {
  max-width: 800px;
}

.modal-dialog.modal-xl {
  max-width: 1140px;
}
</style>
