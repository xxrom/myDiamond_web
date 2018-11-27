import { api } from '../../../libs/';

function initMethods() {
  this.fetchTableData = api.fetchTableData.bind(this);

  this.onClickEdit = (row) => () => {
    console.log(`clicked edit ROW`);
    console.log(row);
  };
}

export { initMethods };
