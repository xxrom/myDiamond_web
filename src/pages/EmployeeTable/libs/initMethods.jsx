import { api } from '../../../libs/';

export default function() {
  this.fetchTableData = api.fetchTableData.bind(this);

  this.onClickEdit = (row) => () => {
    console.log(`clicked edit ROW`);
    console.log(row);
  };
}
