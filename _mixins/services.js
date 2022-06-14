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
      isProducts :[]
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
    async getProducts(requestParams){
      await this.$crud.index('apiRoutes.qramp.products', requestParams).then(({data}) => {
        data.forEach(item => {
          this.services.push({
            icon: "settings",
            title: item.name,
            id: item.id,
            categoryId: item.categoryId,
            formField: {
              ...item.attributes.reduce((previousValue, currentValue, currentIndex, array) => {
                const props = this.setProps(currentValue.type, currentValue.name, currentValue.values)
                  previousValue = {
                    ...previousValue,
                      [`${currentValue.type}${currentValue.name ? currentValue.name : ''}`] : {
                      name: currentValue.name,
                      value: currentValue.length > 0 ? currentValue.values : null,
                      type: currentValue.type,
                      id: currentValue.id,
                      props :{ ...props}
                    }
                  }
                  return previousValue
              }, {} )
            }
          })
        })
      }).catch(error => {
        console.error("[qramp-services]::init", error)
      })
    },
    saveInfo() {
      this.options = this.services.find(items => {
        for(let item in items.formField){
          for(let key in items.formField[item]){
            if (key == 'value'){
              return items.formField[item][key]
            }
          }
        }
      })
      this.$store.commit('qrampApp/SET_FORM_PRODUCTS', this.services.filter(items => {
          for(let item in items.formField){
            for(let key in items.formField[item]){
              if (key == 'value'){
                return items.formField[item][key]
              }
            }
          }
      }))
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
      } else {
        return {
          readonly: this.readonly,
          label: name,
        }
      }
    }
  },
}