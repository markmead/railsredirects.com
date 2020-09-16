<template>
  <div class="flex justify-center mt-6">
    <input type="file" ref="fileInput" @input="fireAction" class="hidden" />
    <button
      @click="handleInputClick"
      class="px-12 py-5 text-lg leading-none text-white uppercase bg-indigo-600 rounded-lg"
    >Upload CSV</button>
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