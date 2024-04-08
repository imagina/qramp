export default function getListCustomerWithContracts(data, permisition) {
    const customerList = data[0].data || [];
    const contractsList = data[1].data || [];
    const customers = customerList.map((customer) => {
        return {
            id: Number(customer.id),
            label: customer.customerName + ' (Ad Hoc)',
            value: customer.customerName + ' (Ad Hoc)',
            customerId: Number(customer.id),
            contractId: null,
            contractName: null,
        }
    });
    contractsList.forEach((contract, index) => {
        const label = permisition ? `${contract.customerName} (${contract.contractName})` : contract.customerName;
        customers.push({
            id: Number(contract.customerId),
            customerId: contract.customerId,
            label,
            contractId: contract.id,
            value: `${contract.customerName}-${contract.contractName}-${index}`,
            contractName: contract.contractName
        }) 
    }); 
    return customers;
}