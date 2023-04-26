import qRampStore from '../../../_store/qRampStore.js';
import workOrderList from '../../../_store/actions/workOrderList';

export default {
    data() {
      return {
        flightStatusList: [],
        sessionStationId: null,
      }
    },
    computed: {
      isPassenger() {
        return qRampStore().getIsPassenger();
      },
      station() {
        return this.sessionStationId;
      },
      isBlank() {
        return qRampStore().getIsblank();
      },
      filterGates() {
        return workOrderList()
          .getGatesList()
          .filter(item => item.stationId == this.form?.stationId || this.sessionStationId)
          .map(item =>
            ({
              value: item.id,
              label: item.name
            }));
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
                vIf: !this.isPassenger,
                readonly: this.isBlank,
                rules: [
                  val => this.validateSpecialCharacters(val)
                ],
                label: `*${this.$tr('ifly.cms.form.gate')}`,
                clearable: true,
                color:"primary",
                options: this.filterGates
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
                options: workOrderList().getACTypesList().map(item => ({
                  label: item.model,
                  value: item.id
                })),
              },
            },
            /*carrierId: {
              value: null,
              type: 'select',
              props: {
                vIf: false,
                label: 'Carrier',
                options: workOrderList().getAirlinesList().map(item => ({
                  label: item.airlineName,
                  value: item.id
                })),
              },
            },*/
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