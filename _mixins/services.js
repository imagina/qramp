export default {
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data(){
    return{
      services:[],
      searchServices: '',
    }
  },
  computed:{
    filterServices () {
      const conditions = []
      if (this.searchServices) {
          conditions.push(this.servicesFilter)
      }
      if (conditions.length > 0) {
          return this.services.filter((service) => {
              return conditions.every((condition) => {
                  return condition(service)
              })  
          })
      }
      return this.services
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
    servicesFilter(service){
      return service.title.toLowerCase().includes(this.searchServices.toLowerCase())
    },
    setProps(type, name, options) {
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
          'fill-mask':true,
          hint:"mm/dd/yyyy hh:mm",
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