const reqURL = 'https://open.er-api.com/v6/latest/'

// Получаем данные с сервера и берем значение валют (rates)
export const fetchRequest = async (currency = 'USD') => {
  try {
    let response = await fetch(reqURL + currency)
    if (response.ok) {
      let json = await response.json();
      if (json.result === 'success') {
        return json.rates
      } else {
        console.error("Ошибка json.result: " + json.result)
      }
    } else {
      console.error("Ошибка HTTP: " + response.status);
    }
  } catch (error) {
    console.error("Ошибка fetchRequest: " + error);
  }
}