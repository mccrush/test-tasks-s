<script lang="ts">
  import arrows from "./assets/exchange-48.png";
  import { onMount } from "svelte";
  import { getAllCurrency } from "./api/getAllCurrency";

  import FormConverterFrom from "./lib/FormConverterFrom.svelte";
  import FormConverterTo from "./lib/FormConverterTo.svelte";

  let currencyFrom = "USD";
  let currencyTo = "RUB";
  let valueFrom = 0;
  let valueTo = 0;
  let arrayCurrencyFrom = [];
  let arrayCurrencyTo = [];

  onMount(() => {
    onChangeFromCurrency();
  });

  // Метод конвертации валют
  const calculationValue = (array, exCurrencyTo, exValueFrom) => {
    const exchangeItem = array.find((item) => item.currency === exCurrencyTo);
    const exchange = exchangeItem.value;
    return Number((exValueFrom * exchange).toFixed(2));
  };

  // В зависимости от того в какой из форм происходят изменения,
  // переопределяем основную валюту путем получения новго массива
  // (в котором значение валюты = 1)

  // Если изменения произошли в левой форме
  const onChangeFromCurrency = async () => {
    arrayCurrencyFrom = await getAllCurrency(currencyFrom);
    arrayCurrencyTo = arrayCurrencyFrom;

    valueTo = calculationValue(arrayCurrencyFrom, currencyTo, valueFrom);
  };

  // Если изменения произошли в правой форме
  const onChangeToCurrency = async () => {
    arrayCurrencyTo = await getAllCurrency(currencyTo);
    arrayCurrencyFrom = arrayCurrencyTo;

    valueFrom = calculationValue(arrayCurrencyTo, currencyFrom, valueTo);
  };
</script>

<main>
  <h1>Конвертер валют</h1>

  <!-- Пришлось сделать две формы, из-за чего часть кода дублируется.
  Еще нет большого опыта работы со Svelte чтобы обойтись одной формой,
  но понимаю, что это можно сделать -->
  <div class="cover-form">
    <FormConverterFrom
      arrayCurrency={arrayCurrencyFrom}
      bind:currencyFrom
      bind:valueFrom
      on:updateResult={onChangeFromCurrency}
    />
    <img src={arrows} class="arrows" alt="Arrows" />
    <FormConverterTo
      arrayCurrency={arrayCurrencyTo}
      bind:currencyTo
      bind:valueTo
      on:updateResult={onChangeToCurrency}
    />
  </div>
</main>
