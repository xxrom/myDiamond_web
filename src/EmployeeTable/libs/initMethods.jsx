export default function() {
  this.onClickDelete = (row) => () => {
    console.log(`clicked Delete ROW`);
    console.log(row);

    const { employee_id } = row.original;
    console.log(`delete by employee_id = ${employee_id}`);
  };

  this.onClickEdit = (row) => () => {
    console.log(`clicked edit ROW`);
    console.log(row);
  };
}
