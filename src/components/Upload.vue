<template>
  <div class="flex justify-center mt-6">
    <input type="file" ref="fileInput" @input="fireAction" class="hidden" />
    <button
      @click="handleInputClick"
      class="px-12 py-5 text-lg leading-none text-white uppercase transition-shadow duration-150 ease-in-out rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-xl"
    >
      Upload CSV
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    handleInputClick() {
      this.$refs.fileInput.click()
    },
    fireAction() {
      this.$emit('action')
    },
  },
}
</script>
