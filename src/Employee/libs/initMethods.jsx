export default function() {
  this.checkInputs = (labels, state, setState) => () => {
    let valid = 0;
    labels.forEach(({ key }) => (!state[key].valid ? valid++ : ''));
    console.log(`valid = ${valid}`);
    setState({
      disableBtn: !!valid,
    });
  };

  this.handleOnChange = (key, regexp) => (event) => {
    this.setState(
      {
        [key]: {
          value: event.target.value,
          valid: regexp.test(event.target.value),
        },
      },
      this.checkInputs(this.labels, this.state, this.setState.bind(this))
    );
  };
}
