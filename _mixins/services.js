export default {
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data(){
    return{
      services:[]
    }
  },
  methods: {
    setValue(type) {
      if (type == 'quantity') {
        return 0
      } else {
        return ''
      }
    },
    setProps(type, name, options) {
      console.log('select', type)
      if (type == 'quantity') {
        return {
          readonly: this.readonly
        }
      }else if(type == 'select') {
        return {
          readonly: this.readonly,
          label: name,
          options: options.map((item) => {
            item.label = item.name
            return item
          }),
          type
        }
      } else if(type == 'fullDate') {
        return {
          readonly: this.readonly,
          label: name,
          mask:"##/##/#### ##:##",
          placeholder:'MM/DD/AAAA Hr:mm',
          hint:"MM/DD/YYYY Hr:mm",
        }
      } else {
        return {
          readonly: this.readonly,
          label: name,
        }
      }
    }
  },
}