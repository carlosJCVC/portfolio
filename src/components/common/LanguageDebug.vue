<template>
  <div>
    <h3>Depuración de Idioma</h3>
    <p>Idioma actual: {{ $i18n.locale }}</p>
    <p>Traducción de 'hello': {{ $t('message.hello') }}</p>
    <button @click="forceUpdate">Forzar actualización</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const updateTrigger = ref(0)

const forceUpdate = () => {
  updateTrigger.value++
  console.log('Forzando actualización')
}
</script>

<style lang="scss" scoped></style>
