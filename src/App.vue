<template>
  <div id="app" class="relative overflow-hidden bg-gray-50">
    <Main />
    <div class="fixed bottom-0 left-0 w-screen">
      <Wave />
    </div>
    <Footer />
  </div>
</template>

<script>
import Main from '@/components/Main'
import Wave from '@/components/Wave'
import Footer from '@/components/Footer'

export default {
  components: {
    Main,
    Wave,
    Footer,
  },
}
</script>
