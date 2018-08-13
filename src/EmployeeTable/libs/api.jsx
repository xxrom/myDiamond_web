function deleteRatesByEmployeeId(employee_id) {
  const urlRate = `http://localhost:8080/api/rate/by-employee-id/${employee_id}`;
  // const url = `https://my-diamond-postgresql.herokuapp.com/api/rate/by-employee-id/${employee_id}`;
  return fetch(urlRate, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  })
    .then((res) => {
      console.log(`DELETE: ${urlRate} // res status = ${res.status}`);
      return res.json();
    })
    .then(({ data }) => {
      console.log('return data', data);
      return data;
    })
    .catch((err) => console.log(err));
}

function deleteEmployeeByEmployeeId(employee_id) {
  const urlEmployee = `http://localhost:8080/api/employee/${employee_id}`;
  // const url = `https://my-diamond-postgresql.herokuapp.com/api/employee/${employee_id}`;
  return fetch(urlEmployee, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  })
    .then((res) => {
      console.log(`DELETE: ${urlEmployee} // res status = ${res.status}`);
      return res.json();
    })
    .then(({ data }) => {
      console.log('return data', data);
      return data;
    })
    .catch((err) => console.log(err));
}

export { deleteRatesByEmployeeId, deleteEmployeeByEmployeeId };
