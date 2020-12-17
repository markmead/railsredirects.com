<template>
  <div>
    <Header>
      <input type="file" ref="fileInput" class="hidden" @input="handleParseCSV" />
      <span class="relative z-0 inline-flex rounded-md shadow-sm">
        <button
          @click="handleFileUploadOpener"
          type="button"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          Upload
        </button>
        <button
          v-clipboard:copy="generatedRedirects"
          v-clipboard:success="handleCopySuccess"
          v-clipboard:error="handleCopyError"
          type="button"
          class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          Copy
        </button>
      </span>
    </Header>

    <section class="bg-gray-50 dark:bg-black">
      <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold leading-tight text-gray-900 dark:text-white">Configure</h2>

        <div class="max-w-3xl mt-6 space-y-4 md:flex md:space-y-0 md:space-x-4">
          <div>
            <div class="flex rounded-md shadow-sm">
              <label
                for="status"
                class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm"
              >
                Status:
              </label>
              <input
                type="text"
                name="status"
                id="status"
                class="flex-1 block w-full px-3 py-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                placeholder="301"
                v-model="status"
              />
            </div>
          </div>
          <div class="flex-1">
            <div class="flex rounded-md shadow-sm">
              <label
                for="delete"
                class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm"
              >
                Delete:
              </label>
              <input
                type="text"
                name="delete"
                id="delete"
                class="flex-1 block w-full px-3 py-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                placeholder="https://www.website.com"
                v-model="strip"
              />
            </div>
          </div>
        </div>

        <ul class="p-8 mt-6 space-y-2 overflow-y-auto text-xs border-2 border-gray-200 border-dashed rounded-md h-96">
          <li v-for="(result, index) of results" :key="index" class="flex items-center pr-4 result-list-item">
            <button
              @click="handleRemoveResult(index)"
              type="button"
              class="flex-shrink-0 inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
            >
              Delete
            </button>
            <span class="font-mono text-gray-900 truncate dark:text-white">
              {{ formatRedirect(result[0], result[1]) }}
            </span>
          </li>
        </ul>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default {
  data() {
    return {
      code: false,
      results: [
        ['/old-path', '/new-path'],
        ['/nobody-uses-this-link', '/everyone-uses-this-link'],
        ['/2020-will-be-our-year', '/2021-will-be-our-year'],
        ['/women-in-blue-shirt', '/women-in-red-shirt'],
      ],
      status: '301',
      strip: '',
    }
  },
  computed: {
    generatedRedirects() {
      if (!this.results) return

      let redirects = ''

      for (let result of this.results) {
        redirects += `${this.formatRedirect(result[0], result[1])}\n`
      }

      return redirects
    },
  },
  methods: {
    handleFileUploadOpener() {
      this.$refs.fileInput.click()
    },
    handleParseCSV() {
      const fileInput = event.currentTarget
      const self = this

      this.$papa.parse(fileInput.files[0], {
        complete(response) {
          let results = response.data.filter(function(result) {
            return result[0] !== ''
          })

          self.results = results
        },
      })
    },
    formatRedirect(from, to) {
      return `get "${this.stripText(from)}", to: redirect("${this.stripText(to)}", status: ${this.status})`
    },
    stripText(string) {
      let substring = this.strip ? string.replace(this.strip, '') : string
      return substring === '' ? '/' : substring
    },
    handleRemoveResult(index) {
      this.results.splice(index, 1)
    },
    handleCopySuccess() {
      const button = event.currentTarget

      button.innerText = 'Copied'
      setTimeout(() => (button.innerText = 'Copy'), 2000)

      this.$gtag.event('Success', {
        event_category: 'Copy',
      })
    },
    handleCopyError() {
      this.$gtag.event('Failed', {
        event_category: 'Copy',
      })
    },
    track() {
      this.$gtag.pageview({
        page_path: '/',
      })
    },
  },
  components: {
    Header,
    Footer,
  },
}
</script>

<style lang="postcss" scoped>
.result-list-item button:hover + span {
  @apply line-through;
}
</style>
