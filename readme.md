## Project Structure

# `myDiamond_web` folder
* |
* |- assets - статические данные (картинки)
* |- src - данные по странице
* | \
* |  |- components - переиспользуемые компоненты
* |  | \
* |  |  |- common - "тупые" компоненты
* |  |  |- smart - "умные" компоненты
* |  |  |-
* |  |
* |  |- HOC - high order component
* |  |  \
* |  |
* |  |- libs - вспомогательные общие библиотеки
* |  |  \
* |  |
* |  |- pages
* |  | \
* |  |  |- EmployeeForm - форма заполнения нового сотрудника
* |  |  |- EmployeeTable - таблица сотрудников
* |  |  |- Table - таблица со всеми данными ???
* |  |  |- WorkForm - форма добавления работы (сотрудник и его работы)
* |  |  |-
* |  |
* |  |- App.jsx - точка входа приложения
* |  |-
* |- ui - sketch дизайн
* | \
* |
* |- .stylelintrc - настройки стилей
* |- changelog.md - ...
* |- readme.md - ...
* |- server.js - раздача статичных данных из assets
* |- webpack.config.js - ...
* |-