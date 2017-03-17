##  Сборка стилей

 Для сборки стилей необходимо выполнить следующие:

1. Если у вас уже установлен Node выполните команду `npm install` в корне проекта, если
нет выполните шаги установки согласно инструкции: [nodejs.org](https://nodejs.org/en/download/package-manager/)

2. Далее вы можете выполнить команду `gulp watch` для отслеживания изменений стилей или выполнить `gulp build` для единовременной их сборки.

Далее вы можете изменять стили в папке /static/styles/_*.sccs, они будут скомпилированы в файл /static/dist/styles-min.css;

Для облегчения файла стилей все сторонние библиотеки компилируются в файл 'style-libs-min.css';

Так же предусмотрена сборка скриптов. Она так же выполняется при запуске выше перечисленных команд. Собранный файл находится /static/dist/scripts-min.js

(Файл библиотек скриптов компилирутеся так же как и файл стилей).
