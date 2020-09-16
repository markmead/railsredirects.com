<template>
  <div class="flex items-center justify-between p-2 rounded-lg bg-gray-50">
    <code
      class="flex-1 p-1 font-mono text-sm focus:outline-none"
      contenteditable
      tabindex="-1"
      :class="editableClass"
      :data-redirect="index"
    >get "{{ from }}", to: redirect("{{ to }}", status: {{ status }})</code>
    <div class="flex-shrink-0 ml-4 space-x-4">
      <button
        type="button"
        @click="handleEditable(index)"
        class="px-5 py-3 text-sm leading-none text-white uppercase bg-gray-700 rounded-lg"
      >Edit</button>
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
  data() {
    return {
      edit: false,
    }
  },
  props: {
    from: String,
    to: String,
    status: String,
    index: Number,
  },
  computed: {
    editableClass() {
      return this.edit ? 'focus:shadow-outline' : ''
    },
  },
  methods: {
    fireAction() {
      this.$emit('action')
    },
    handleEditable(index) {
      const el = document.querySelector(`[data-redirect="${index}"]`)

      this.edit = !this.edit
      this.edit ? el.focus() : el.blur()
    },
  },
}
</script>