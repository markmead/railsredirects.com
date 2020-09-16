<template>
  <div class="flex items-center justify-between p-2 rounded-lg bg-gray-50">
    <code
      class="flex-1 p-1 font-mono text-sm"
    >get "{{ from }}", to: redirect("{{ to }}", status: {{ status }})</code>
    <div class="flex-shrink-0 ml-4 space-x-4">
      <button
        type="button"
        @click="fireAction(index)"
        class="px-5 py-3 text-sm leading-none text-white uppercase bg-red-600 rounded-lg"
      >Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    from: String,
    to: String,
    status: String,
    index: Number,
  },
  methods: {
    fireAction() {
      this.$emit('action')
    },
  },
}
</script>