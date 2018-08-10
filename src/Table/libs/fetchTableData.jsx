export default function() {
  const url = 'http://localhost:8080/api/work';
  // const url = 'https://my-diamond-postgresql.herokuapp.com/api/work';

  fetch('http://localhost:8080/api/work')
    .then((res) => {
      console.log(`GET: ${url} // res status = ${res.status}`);
      return res.json();
    })
    .then(({ data }) => {
      const header = Object.keys(data[0]);
      this.setState({ data, header });
    })
    .catch((err) => console.log(err));
}
