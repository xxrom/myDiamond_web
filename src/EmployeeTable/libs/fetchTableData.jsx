export default function() {
  const url = 'http://localhost:8080/api/employee-table';
  // const url = 'https://my-diamond-postgresql.herokuapp.com/api/employee-table';

  fetch(url)
    .then((res) => {
      console.log(`GET: ${url} // res status = ${res.status}`);
      return res.json();
    })
    .then(({ data }) => {
      this.setState({ data });
    })
    .catch((err) => console.log(err));
}
