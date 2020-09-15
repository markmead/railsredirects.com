<template>
  <transition name="fade">
    <div class="copy-alert" :class="alertClass" v-if="visible">
      <span class="copy-alert__text">
        {{ alertText }}
      </span>
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
      return this.status ? 'bg-green-500' : 'bg-red-500'
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
.copy-alert {
  @apply absolute top-0 right-0 px-6 py-3 transform -translate-x-4 translate-y-4 rounded;

  &__text {
    @apply leading-none text-white text-lg font-semibold;
  }
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500;
}

.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}
</style>
