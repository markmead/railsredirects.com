<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50" @click="fireAction"></div>
    <div class="relative w-full max-w-xl mx-auto rounded-lg shadow-xl bg-yellow-50">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    fireAction() {
      this.$emit('action')
    },
  },
}
</script>
