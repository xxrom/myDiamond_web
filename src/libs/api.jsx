import { fetchData } from './fetch-api';

function deleteRatesByEmployeeId(employee_id) {
  return fetchData({
    url: 'rate/by-employee-id/',
    id: employee_id,
    fetchOptionsMethod: 'DELETE',
  });
}

function deleteEmployeeByEmployeeId(employee_id) {
  return fetchData({
    url: 'employee/',
    id: employee_id,
    fetchOptionsMethod: 'DELETE',
  });
}

function fetchTableData() {
  return fetchData({
    url: 'employee-table/',
    thenFunction: ({ data }) => this.setState({ data }),
  });
}

export { deleteRatesByEmployeeId, deleteEmployeeByEmployeeId, fetchTableData };
