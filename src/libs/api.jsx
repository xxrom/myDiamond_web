import { fetchData } from './fetch-api';

// EMPLOYEE
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

// FETCH DATA
function fetchTableData() {
  return fetchData({
    url: 'employee-table/',
    thenFunction: ({ data }) => this.setState({ data }),
  });
}

async function fetchAllEmployee() {
  const ans = await fetchData({
    url: 'employee/',
    fetchOptionsHeader: {
      'Content-Type': 'application/json',
    },
  });

  console.log('fetchAllEmployee', ans);

  return ans;
}

async function fetchAllArticle() {
  const ans = await fetchData({
    url: 'article/',
    fetchOptionsHeader: {
      'Content-Type': 'application/json',
    },
  });

  console.log('fetchAllArticle', ans);

  return ans;
}

// POST
async function postNewEmployee(body) {
  const ans = await fetchData({
    url: '/employee',
    fetchOptionsMethod: 'POST',
    fetchOptionsHeader: {
      'Content-type': 'application/json',
    },
    body,
  });

  console.log('ans', ans);

  return ans;
}

/**
 *
 * @param {array} body - массив с объектами, каждый нужно передать отдельно
 */
async function postNewRateArray(body = []) {
  const ans = await Promise.all(
    body.map((item) =>
      fetchData({
        url: '/rate',
        fetchOptionsMethod: 'POST',
        fetchOptionsHeader: {
          'Content-type': 'application/json',
        },
        body: item,
      })
    )
  );

  console.log('ans', ans);

  return ans;
}

async function postNewWork(body) {
  const ans = await fetchData({
    url: '/work',
    fetchOptionsMethod: 'POST',
    fetchOptionsHeader: {
      'Content-type': 'application/json',
    },
    body,
  });

  console.log('ans', ans);

  return ans;
}

/**
 *
 * @param {array} body - массив с объектами, каждый нужно передать отдельно
 */
async function postNewArticleArray(body = []) {
  const ans = await Promise.all(
    body.map((item) =>
      fetchData({
        url: '/article',
        fetchOptionsMethod: 'POST',
        fetchOptionsHeader: {
          'Content-type': 'application/json',
        },
        body: item,
      })
    )
  );

  console.log('ans', ans);

  return ans;
}

export {
  deleteRatesByEmployeeId,
  deleteEmployeeByEmployeeId,
  fetchTableData,
  fetchAllEmployee,
  fetchAllArticle,
  postNewEmployee,
  postNewRateArray,
  postNewWork,
  postNewArticleArray,
};
