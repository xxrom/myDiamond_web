import { sendData } from './';

export default function() {
  // this.checkInputs = (labels) => () => {
  //   let valid = 0;
  //   labels.forEach(({ key }) => (!this.state.values[key].valid ? valid++ : ''));

  //   console.log(`valid = ${valid}`);

  //   this.setState({
  //     disableBtn: !!valid,
  //   });
  // };

  this.handleOnChange = (key, regexp) => (event) => {
    this.setState(
      {
        values: {
          ...this.state.values,
          [key]: {
            value: event.target.value,
            valid: regexp.test(event.target.value),
          },
        },
      }
      // ,this.checkInputs(this.labels).bind(this)
    );
  };
}
