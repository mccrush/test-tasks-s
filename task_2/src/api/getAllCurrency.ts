import { fetchRequest } from "./fetchRequest"

// Преобразуем полученные данные с сервера в массив
export const getAllCurrency = async (currency) => {
  const dataObject = await fetchRequest(currency)

  let dataArray = []
  for (let key in dataObject) {
    dataArray.push({ currency: key, value: dataObject[key] })
  }

  return dataArray
}