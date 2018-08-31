export default function({ labels }) {
  this.state = {
    values: {},
  };

  this.labels = labels;

  labels.forEach(({ key, defaultValue, regexp }) => {
    this.state.values[key] = {
      value: defaultValue,
      valid: regexp.test(defaultValue),
    };
  });
}
