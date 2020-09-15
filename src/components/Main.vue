<template>
  <main class="p-8 mx-auto">
    <Alert :status="copied" v-if="copied" />

    <input type="file" ref="fileInput" @input="parseFile" />
    <div class="flex items-center mt-4 space-x-4">
      <input type="text" v-model="strip" class="w-full form-input" placeholder="Text to remove" />
      <input type="text" v-model="status" class="w-full form-input" placeholder="Status" />
    </div>

    <div class="flex items-center mt-8 space-x-4">
      <button
        type="button"
        class="px-6 py-3 leading-none text-white bg-green-500 rounded"
        v-clipboard:copy="generatedRedirects"
        v-clipboard:success="handleCopySuccess"
        v-clipboard:error="handleCopyError"
      >
        Copy Code
      </button>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-8">
      <div v-if="results" class="p-4 space-y-4 bg-gray-100">
        <Redirect
          v-for="(result, index) in results"
          :key="result[0]"
          :from="stripText(result[0])"
          :to="stripText(result[1])"
          :status="status"
          :index="index"
          @action="handleRemove"
        />
      </div>

      <textarea v-html="generatedRedirects" class="w-full h-64 form-textarea"></textarea>
    </div>
  </main>
</template>

<script>
import Redirect from '@/components/Redirect'
import Alert from '@/components/Alert'

export default {
  data() {
    return {
      code: false,
      copied: undefined,
      results: null,
      status: '301',
      strip: '',
    }
  },
  computed: {
    generatedRedirects() {
      if (!this.results) return

      let redirects = ''

      for (let result of this.results) {
        const from = this.stripText(result[0])
        const to = this.stripText(result[1])

        redirects += `get "${from}", to: redirect("${to}", status: ${this.status})\n`
      }

      return redirects
    },
  },
  methods: {
    parseFile() {
      const fileInput = this.$refs.fileInput
      const self = this

      this.$papa.parse(fileInput.files[0], {
        complete(res) {
          self.results = res.data
        },
      })
    },
    stripText(string) {
      let substring = this.strip ? string.replace(this.strip, '') : string

      return substring === '' ? '/' : substring
    },
    handleRemove(index) {
      this.results.splice(index, 1)
    },
    handleCopySuccess() {
      this.copied = true
    },
    handleCopyError() {
      this.copied = false
    },
  },
  components: {
    Redirect,
    Alert,
  },
}
</script>
