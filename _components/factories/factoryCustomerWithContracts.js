export default function getListCustomerWithContracts(data) {
    const customerList = data[0].data || [];
    const contractsList = data[1].data || [];
    const customers = customerList.map((customer) => {
        return {
            id: customer.id,
            label: customer.customerName + ' (Ad Hoc)',
            value: customer.customerName + ' (Ad Hoc)'
        }
    });
    contractsList.forEach(contract => {
        customers.push({
            id: contract.customerId,
            label: contract.customerName,
            contractId: contract.id,
            value: contract.customerName,
            contractName: contract.contractName
        }) 
    }); 
    return customers;
}