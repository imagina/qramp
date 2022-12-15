import qRampStore from '../../../_store/qRampStore.js';

export default {
    data() {
      return {
        scheduleStatusList: [],
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
                apiRoute: 'apiRoutes.qramp.setupStations',
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
                requestParams: {filter: {stationId: this.form.stationId}}
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
            scheduleStatusId: {
              value: null,
              type: 'select',
              props: {
                readonly: this.isBlank,
                selectColor: true,
                colorType: 'tailwindcss',
                label: `Font Color`,
                clearable: true,
                color:"primary",
                options: this.scheduleStatusList,
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
      async getScheduleStatusList() {
        const response = await this.$crud.index('apiRoutes.qramp.scheduleStatuses');
        this.scheduleStatusList = response.data.map((item) =>({
          label: item.name,
          id: item.id,
          color: item.color,
          value: item.id,
        }));
      },
    }
  };