export default (labels, state) => async () => {
  console.log('send');
  const employeeData = {};
  labels.forEach(({ key }) => (employeeData[key] = state[key].value));
  console.log(employeeData);

  // const employeeUrl = 'https://my-diamond-postgresql.herokuapp.com/api/employee'
  const employeeUrl = 'http://localhost:8080/api/employee';

  const rateData = await fetch(employeeUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(employeeData),
  })
    .then((res) => {
      console.log(`POST: ${employeeUrl} // res status = ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log('employee Table data', data);
      const { employee_id } = data.data;
      const rateData = {
        ...employeeData,
        employee_id,
      };
      return rateData;
    })
    .catch((err) => console.log(err));

  // const rateUrl = 'https://my-diamond-postgresql.herokuapp.com/api/rate'
  const rateUrl = 'http://localhost:8080/api/rate';

  console.log('rateData', rateData);
  fetch(rateUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(rateData),
  })
    .then((res) => {
      console.log(`POST: ${rateUrl} // res status = ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log('rate Table data', data);
    });
};
