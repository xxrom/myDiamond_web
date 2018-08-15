function fetchData({
  url,
  id = '',
  fetchOptionsMethod = 'GET',
  fetchOptionsHeader = {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  thenFunction = ({ data }) => data,
}) {
  let web = `http://localhost:8080/api/`;

  if (process.env.NODE_ENV !== 'development') {
    web = `https://my-diamond-postgresql.herokuapp.com/api/`;
  }

  return fetch(`${web}${url}${id}`, {
    method: fetchOptionsMethod,
    headers: fetchOptionsHeader,
  })
    .then((res) => {
      console.log(
        `${fetchOptionsMethod}: ${web}${url}${id} // res status = ${res.status}`
      );
      return res.json();
    })
    .then(thenFunction)
    .catch((err) => console.log(err));
}

export { fetchData };
