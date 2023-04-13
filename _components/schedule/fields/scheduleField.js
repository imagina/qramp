import qRampStore from '../../../_store/qRampStore.js';

export default {
    data() {
      return {
        flightStatusList: [],
        sessionStationId: null,
      }
    },
    computed: {
      station() {
        return this.sessionStationId;
      },
      isBlank() {
        return qRampStore().getIsblank();
      },
      fields() {
        return {
          form: {
            preFlightNumber: {
              name:'preFlightNumber',
              value: '',
              type: 'input',
              props: {
                readonly: this.isBlank,
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
              value: this.station,
              type: 'select',
              props: {
                readonly: this.isBlank,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
                selectByDefault : true,
                label: `*${this.$tr('ifly.cms.form.station')}`,
                clearable: true,
                color:"primary"
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qsetupagione.setupStations',
                select: {label: 'stationName', id: 'id'},
                requestParams: {filter: {status: 1}}
              },
            },
            gateId: {
              name:'gateId',
              value: null,
              type: 'select',
              props: {
                readonly: this.isBlank,
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
                requestParams: {filter: {stationId: this.form?.stationId || this.sessionStationId}}
              },
              label: this.$tr('ifly.cms.form.gate'),
            },
            sta: {
              value: null,
              type: 'hour',
              props: {
                readonly: this.isBlank,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
                label: 'STA',
                format24h: true,
              },
            },
            std: {
              value: null,
              type: 'hour',
              props: {
                readonly: this.isBlank,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
                label: 'STD',
                format24h: true,
              },
            },
            flightStatusId: {
              value: null,
              type: 'select',
              props: {
                readonly: this.isBlank,
                selectColor: true,
                colorType: 'tailwindcss',
                label: `Flight Status`,
                clearable: true,
                color:"primary",
                options: this.flightStatusList,
              },
            },
            acTypeId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('ifly.cms.sidebar.aircraftType'),
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qfly.aircraftTypes',
                select: {
                  label:'model',
                  id: 'id'
                },
                refresh: true,
              }
            },
            carrierId: {
              value: null,
              type: 'select',
              props: {
                label: 'Carrier',
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qfly.airlines',
                select: {
                  label:'airlineName',
                  id: 'id'
                },
                refresh: true,
              }
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
      async getFlightStatusList() {
        const response = await this.$crud.index('apiRoutes.qfly.flightStatuses');
        this.flightStatusList = response.data.map((item) =>({
          label: item.name,
          id: item.id,
          color: item.color,
          value: item.id,
        }));
      },
    }
  };