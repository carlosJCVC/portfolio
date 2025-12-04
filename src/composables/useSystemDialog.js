import { ref } from 'vue'

export function useSystemDialog() {
  const isDialogOpen = ref(false)
  const dialogOptions = ref({
    title: '',
    message: '',
    type: 'info', // 'info', 'error', 'warning'
    onConfirm: null,
    onCancel: null
  })

  const openDialog = (options) => {
    dialogOptions.value = {
      title: options.title || 'System Alert',
      message: options.message || '',
      type: options.type || 'info',
      onConfirm: options.onConfirm || null,
      onCancel: options.onCancel || null
    }
    isDialogOpen.value = true
  }

  const closeDialog = () => {
    isDialogOpen.value = false
    dialogOptions.value = {
      title: '',
      message: '',
      type: 'info',
      onConfirm: null,
      onCancel: null
    }
  }

  return {
    isDialogOpen,
    dialogOptions,
    openDialog,
    closeDialog
  }
}
