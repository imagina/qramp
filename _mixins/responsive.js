export default {
  computed:{
    responsive() {return this.windowSize == 'mobile'},
    windowSize() {
      return this.windowWith >= '900' ? 'desktop' : 'mobile'
    },
    windowWith() {
      return window.innerWidth
    }
  }
}