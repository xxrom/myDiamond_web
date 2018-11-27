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
  const ans = fetchData({
    url: 'employee-table/',
    thenFunction: ({ data }) => this.setState({ data }),
  });

  return ans;
}

function fetchWorkTableData() {
  const ans = fetchData({
    url: 'work-table/',
    thenFunction: ({ data }) => {
      data.forEach((item) => {
        // Для отображения в общей таблице (WorkTable), формируем employee_id_table
        item['employee_id_table'] = `${item['name']} [${item['employee_id']}]`;
      });
      this.setState({ data });
    },
  });

  console.log('fetchWorkTableData', ans);

  return ans;
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

// UPDATE DATA ON BACKEND
/**
 * Обновление Employee в таблице
 *
 * @param {*} body - { name: 'test name' } новые данные
 * @param {*} key - 'employee' ключ по которому отсылаем
 * @param {*} fullData - все данные row.original где вытаскиваем
 *              [key + '_id'] индекс записи для обновления данных
 * @returns
 */
async function updateTableData(body, key, fullData) {
  if (typeof key !== 'string' || typeof fullData !== 'object') {
    console.log(`error Update updateTableData key= [${key}]`);
    return null;
  }

  const ans = await fetchData({
    url: `/${key}/${fullData[key + '_id']}`,
    fetchOptionsMethod: 'PUT',
    fetchOptionsHeader: {
      'Content-type': 'application/json',
    },
    body,
  });

  console.log('updateTableData table= [${table}] ans', ans);

  return ans;
}

// DELETE
async function deleteTableData(table, id) {
  if (typeof table !== 'string' || typeof +id !== 'number') {
    console.log(`error Delete deleteTableData table= [${table}]`);
    return null;
  }

  const ans = await fetchData({
    url: `/${table}/${id}`,
    fetchOptionsMethod: 'DELETE',
    fetchOptionsHeader: {
      'Content-type': 'application/json',
    },
  });

  console.log(`delete table= [${table}] ans`, ans);

  return ans;
}

export {
  deleteRatesByEmployeeId,
  deleteEmployeeByEmployeeId,
  fetchTableData,
  fetchWorkTableData,
  fetchAllEmployee,
  fetchAllArticle,
  postNewEmployee,
  postNewRateArray,
  postNewWork,
  postNewArticleArray,
  updateTableData,
  deleteTableData,
};
