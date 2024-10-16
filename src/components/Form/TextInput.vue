<script setup>
defineProps({
  type: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  }
})
const model = defineModel()
</script>

<template>
  <input :type :placeholder class="text-input" v-model="model">
</template>

<style scoped lang="scss">
.text-input {
  width: 100%;
  height: 4rem;
  border-radius: 1.2rem;
  background: var(--charcoal-black);
  border: none;
  padding: 0 1.3rem;
  color: var(--silver-cloud);

  &::placeholder {
    color: var(--silver-cloud);
  }
}
</style>