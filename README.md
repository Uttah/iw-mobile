## Boilerplate frontend mobile

За основу взят [форк](https://github.com/jbosse/ignite-expo-boilerplate) проверенного бойлерплейта [Ignite Andross](https://github.com/infinitered/ignite),
в который был добавлен expo.

TypeScript прикручивала с помощью инструкций от [Microsoft](https://github.com/Microsoft/TypeScript-React-Native-Starter).

## ПРОСТО ПОСМОТРЕТЬ (не разработчикам):
- В аппсторе или Google Play устанавливаете приложение Expo на свое устройство. 
- Логинитесь под учеткой для expo (см. карточку в трелло https://expo.io/@icoworld)
- Открываете вкладку Profile (таб внизу)
- Published projects -> icoworld2


### Установка

Из корневой папки:
```
npm i
npm i react@16.3.1 
```

### Запуск

#### MacOS:
Качаете Expo XDE, Project -> Open project, выбираете папку с проектом. Далее для дев режима нажать share, а полученный QR-код отсканировать из приложения Expo на своём мобильном. 

Для публикации "на бету", доступную всем заинтересованным лицам, нажать Publish (Надо предварительно создать общую учётку для Expo, и залогиниться в Expo XDE).

*Примечание для Android.
Когда открываете в Expo опубликованное или отсканированное через QR-код приложение, не забудьте опустить шторку на мобильном телефоне и нажать кнопку обновления. Чтобы подгрузились все последние изменения.*

#### Linux
[Ставим](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/) ноду и npm.
Далее установка как описано выше.
Вместо Expo XDE можно поставить Expo CLI:
```
npm install exp --global
```
Что-то поменяли в коде, чтобы опубликовать на бету, из корня проекта
```
exp publish .
```

exp start у меня пока не заработал (Linux через VirtualBox работает).

Если при публикации выдает Error: connect ECONNREFUSED, то выполните предварительно
 ```
exp start .
```
