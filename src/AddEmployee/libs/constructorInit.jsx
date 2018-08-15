export default function({ labels }) {
  this.state = {
    disableBtn: true,
    values: {},
  };

  this.labels = labels;

  this.labels.map(({ key, defaultValue, regexp }) => {
    this.state.values[key] = {
      value: defaultValue,
      valid: regexp.test(defaultValue),
    };
  });
}
