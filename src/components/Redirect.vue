<template>
  <div class="flex items-center justify-between p-4 rounded bg-gray-50">
    <code class="text-sm">get "{{ from }}", to: redirect("{{ to }}", status: {{ status }})</code>
    <button
      type="button"
      @click="fireAction(index)"
      class="flex-shrink-0 px-6 py-3 ml-4 leading-none text-white bg-red-500 rounded"
    >Remove</button>
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