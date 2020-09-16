<template>
  <transition name="fade">
    <div
      class="absolute top-0 right-0 px-12 py-4 transform translate-y-4 rounded"
      :class="alertClass"
      v-if="visible"
    >
      <span class="text-lg font-semibold leading-none text-white">{{ alertText }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
    }
  },
  props: {
    status: Boolean,
  },
  computed: {
    alertClass() {
      return this.status ? 'bg-green-600' : 'bg-red-600'
    },
    alertText() {
      return this.status ? 'Copy Success 🎉' : 'Copy Failed 👎'
    },
  },
  created() {
    setTimeout(() => (this.visible = false), 4000)
  },
}
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500;
}

.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}
</style>
