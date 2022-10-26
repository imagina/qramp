export default {
    computed: {
      fields() {
        return {
          form: {
            flightNumber: {
              name:'flightNumber',
              value: '',
              type: 'input',
              props: {
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
                label: `*${this.$tr('ifly.cms.form.flight')}`,
                clearable: true,
                color:"primary"
              },
            },
            stationId: {
              name:'stationId',
              value: '',
              type: 'select',
              props: {
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
                selectByDefault : true,
                label: `*${this.$tr('ifly.cms.form.station')}`,
                clearable: true,
                color:"primary"
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qramp.setupStations',
                select: {label: 'stationName', id: 'id'},
                requestParams: {filter: {status: 1}}
              },
            },
            gateId: {
              name:'gateId',
              value: '',
              type: 'select',
              props: {
                rules: [
                  val => this.validateSpecialCharacters(val)
                ],
                label: `*${this.$tr('ifly.cms.form.gate')}`,
                clearable: true,
                color:"primary"
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qsetupagione.gates',
                select: {label: 'name', id: 'id'},
                requestParams: {filter: {stationId: this.form.stationId}}
              },
              label: this.$tr('ifly.cms.form.gate'),
            },
            STA: {
              value: null,
              type: 'hour',
              props: {
                label: 'STA',
                format24h: true,
              },
            },
            STD: {
              value: null,
              type: 'hour',
              props: {
                label: 'STD',
                format24h: true,
              },
            },
            color: {
              value: '',
              type: 'inputColor',
              props: {
                label: `${this.$tr('isite.cms.label.color')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
          },
        };
      },
    },
    methods:{
      validateSpecialCharacters(val) {
        if(/[^a-zA-Z0-9-]/.test(val)) {
          return this.$tr('isite.cms.message.specialCharactersAreNotAllowed');
        }
        return !!val || this.$tr('isite.cms.message.fieldRequired');
      },
    }
  };