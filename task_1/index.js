import { encoded, translations } from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

const decoded = []
const unincluded = ['groupId', 'service', 'formatSize', 'ca']
const unicId = []
const nonUnicId = []

// Перебираем массив encoded
encoded.forEach(element => {
  // Получаем массив ключей закодированного элемента
  let keysArray = Object.keys(element)

  // Фильтруем ключи, оставляем только нужные
  keysArray = keysArray.filter(item => !unincluded.includes(item))

  // Перебираем ключи элемента
  keysArray.forEach(key => {
    // Проверяем есть ли в словаре ключи со значениями из элемента по ключу
    if (element[key] in translations) {

      // Формируем массив из уникальных id
      if (!nonUnicId.includes(element[key]) && !unicId.includes(element[key])) {
        unicId.push(element[key])
      } else if (unicId.includes(element[key])) {
        nonUnicId.push(element[key])
        const index = unicId.indexOf(element[key])
        unicId.splice(index, 1)
      }

      // Заменяем код на значение из словаря
      element[key] = translations[element[key]]
    }
  });

  decoded.push(element)
});

console.log(decoded)
console.log('unicId =', unicId)
