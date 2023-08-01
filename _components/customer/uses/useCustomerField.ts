import Vue, { computed, reactive, onMounted, ComputedRef } from 'vue';
import qRampStore from '../../../_store/qRampStore.js'
import workOrderList from '../../../_store/actions/workOrderList';
import { FormState, FieldConfig } from '../contracts/customers.contract';

export default function useCustomerField(props: any) {
    const dataForm = computed(() => props.dataForm);
    const state = reactive<FormState>({
        newCustumerAdHoc: [],
        bannerMessage: null,
        customerName: '',
        selectCustomers: '',
        form: {
            customerId: null,
            contractId: null,
            customCustomerName: null,
        },
    })

    const fields: ComputedRef<FieldConfig> = computed(() => ({
        banner: {
            type: "banner",
            props: {
                color: "info",
                icon: "fas fa-exclamation-triangle",
                message: state.bannerMessage,
            },
        },
        customerId: {
            value: '',
            type: 'select',
            help: {
                description: 'You can add a new customer to the list if it\'s not available. Type the Customer Name and click on "Create new customer". The Work Order will be created as Ad-Hoc.'
            },
            props: {
                rules: [
                    val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                ],

                label: `*${Vue.prototype.$tr('ifly.cms.form.customer')}`,
                clearable: true,
                color: "primary",
                'hide-bottom-space': false,
                emitValue: false,
                options: state.newCustumerAdHoc,
            },
            loadOptions: {
                delayed: workOrderList().getCustomerWithContract,
            },
            label: Vue.prototype.$tr('ifly.cms.form.customer'),
        }
    }))
    function addCustumers(): void {
        if (state.customerName !== "") {
            const id = `customer-${qRampStore().numberInRange(8000, 1000)}`;
            state.newCustumerAdHoc = [{ id, label: state.customerName, value: state.customerName }];
            state.bannerMessage = Vue.prototype.$tr("ifly.cms.message.requestNewCustomer");
            state.selectCustomers = {
                id,
                value: state.customerName,
                label: state.customerName,
            };
            dataForm.value.customCustomerName = state.customerName;
            dataForm.value.customerId = null;
            dataForm.value.contractId = null;
            state.customerName = "";
            return;
        }
        Vue.prototype.$alert.error({
            message: Vue.prototype.$tr("ifly.cms.message.orderaddNewrecord"),
        });
    }
    function setCustomer(): void {
        const selectCustomers: any =
            (state.selectCustomers === null
                || state.selectCustomers === undefined
                || state.selectCustomers === '')
                ? {} : state.selectCustomers;
        const customCustomerName = selectCustomers.label || null;
        dataForm.value.customCustomerName = dataForm.value.customerId
            ? null
            : customCustomerName;
        dataForm.value.customerId = selectCustomers.id || null;
        dataForm.value.contractId = selectCustomers.contractId || null;
        let message = null;
        if (Object.keys(selectCustomers).length > 0) {
            message = state.form.contractId
                ? `${Vue.prototype.$tr("ifly.cms.message.selectedCustomerWithContract")}`
                : Vue.prototype.$tr("ifly.cms.message.selectedCustomerWithoutContract");
        }

        state.bannerMessage =
            selectCustomers && !state.form.contractId ? message : null;
    }
    function setCustomerName(query: string): void {
        state.customerName = query || "";
    }
    async function init(): Promise<void> {
        const customer = await workOrderList().getCustomerWithContractLists().find(item => item.id == dataForm.value.customerId);
        if (customer) {
            customer.label = dataForm.value.adHoc ? `${customer.label} (Ad Hoc)` : customer.label;
            if (customer.label) {
                state.selectCustomers = customer;
            }
        }
        await setCustomer();
    }
    onMounted(async () => {
        await init();
    })
    return {
        fields,
        state,
        addCustumers,
        setCustomerName,
        setCustomer,
    }
} 