export default function() {
  const regexp = {
    name: /^[ ]{0,}[a-zа-яё]+[ ]{1,}[a-zа-яё]+[ ]{0,}$/i,
    number: /^[ ]{0,}[0-9]+[ ]{0,}$/,
    date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i,
  };

  this.labels = [
    {
      label: 'Фамилия Имя',
      key: 'name',
      regexp: regexp.name,
      type: 'text',
      defaultValue: 'ФамилияИмя',
    },
    {
      label: 'Тариф-будни',
      key: 'rate_week_day',
      regexp: regexp.number,
      type: 'text',
      defaultValue: '100',
    },
    {
      label: 'Тариф-выходной',
      key: 'rate_week_end',
      regexp: regexp.number,
      type: 'text',
      defaultValue: '200',
    },
    {
      label: 'Начало тарифа',
      key: 'start_date',
      regexp: regexp.date,
      type: 'date',
      defaultValue: String(new Date().toISOString().slice(0, 10)),
    }, // send to server new Date().toISOString()
    {
      label: 'Конец тарифа',
      key: 'end_date',
      regexp: regexp.date,
      type: 'date',
      defaultValue: String(
        new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          .toISOString()
          .slice(0, 10)
      ),
    },
  ];

  this.state = {
    disableBtn: true,
  };

  this.labels.map(
    ({ key, defaultValue, regexp }, index) =>
      (this.state[key] = {
        value: defaultValue,
        valid: regexp.test(defaultValue),
      })
  );
}
