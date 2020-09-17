<template>
  <main class="relative z-10 max-w-screen-xl min-h-screen px-4 py-8 mx-auto">
    <Alert :status="copied" v-if="copied" />
    <Title />
    <Upload @action="parseFile" />

    <div
      class="flex flex-col items-center mt-8 space-y-4 md:items-center md:justify-between md:flex-row md:space-y-0"
    >
      <div class="flex items-center space-x-4">
        <input
          type="text"
          v-model="strip"
          class="w-2/3 p-6 text-lg placeholder-gray-400 transition-colors duration-150 ease-in-out bg-gray-200 border-0 rounded-lg form-input hover:bg-cool-gray-200"
          placeholder="TEXT TO REMOVE"
        />
        <input
          type="text"
          v-model="status"
          class="w-1/3 p-6 text-lg placeholder-gray-400 transition-colors duration-150 ease-in-out bg-gray-200 border-0 rounded-lg form-input hover:bg-cool-gray-200"
          placeholder="STATUS"
        />
      </div>
      <div class="flex items-center space-x-4">
        <button
          type="button"
          @click="help = true"
          class="order-first text-sm text-gray-700 underline uppercase hover:no-underline"
        >How it works</button>
        <button
          type="button"
          class="px-12 py-5 text-lg leading-none text-white uppercase transition-shadow duration-150 ease-in-out bg-green-600 rounded-lg hover:shadow-xl"
          v-clipboard:copy="generatedRedirects"
          v-clipboard:success="handleCopySuccess"
          v-clipboard:error="handleCopyError"
        >Copy Code</button>
      </div>
    </div>

    <div class="p-8 mt-4 space-y-4 bg-gray-200 rounded-lg">
      <Redirect
        v-for="(result, index) in results"
        :key="result[0]"
        :from="stripText(result[0])"
        :to="stripText(result[1])"
        :status="status"
        :index="index"
        @action="handleRemove"
      />
      <NoUpload v-if="results === null" />
    </div>

    <Modal v-if="help" @action="help = false">
      <HowItWorks />
    </Modal>
  </main>
</template>

<script>
import Redirect from '@/components/Redirect'
import Alert from '@/components/Alert'
import Title from '@/components/Title'
import Upload from '@/components/Upload'
import NoUpload from '@/components/NoUpload'
import HowItWorks from '@/components/HowItWorks'
import Modal from '@/components/Modal'

export default {
  data() {
    return {
      code: false,
      copied: undefined,
      results: null,
      status: '301',
      strip: '',
      help: false,
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
      const fileInput = event.currentTarget
      const self = this

      this.$papa.parse(fileInput.files[0], {
        complete(res) {
          self.results = res.data

          this.$ga.event({
            eventCategory: 'CSV Upload',
            eventAction: 'success',
          })
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

      this.$ga.event({
        eventCategory: 'Copy',
        eventAction: 'success',
      })
    },
    handleCopyError() {
      this.copied = false

      this.$ga.event({
        eventCategory: 'Copy',
        eventAction: 'failed',
      })
    },
  },
  components: {
    Redirect,
    Alert,
    Title,
    Upload,
    NoUpload,
    HowItWorks,
    Modal,
  },
}
</script>
