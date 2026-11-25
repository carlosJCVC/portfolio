import { onBeforeUnmount, onMounted } from 'vue'

export function useForcedDarkMode() {
  let hadDarkClass = false

  onMounted(() => {
    hadDarkClass = document.documentElement.classList.contains('dark')
    document.documentElement.classList.add('dark')
  })

  onBeforeUnmount(() => {
    if (!hadDarkClass) document.documentElement.classList.remove('dark')
  })
}
