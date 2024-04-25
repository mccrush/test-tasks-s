<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let arrayCurrency;
  export let currencyFrom;
  export let valueFrom;

  const dispatch = createEventDispatcher();

  const updateResult = () => {
    dispatch("updateResult");
  };
</script>

<div class="form-converter">
  <input type="number" bind:value={valueFrom} on:input={updateResult} />

  <select bind:value={currencyFrom} on:change={updateResult}>
    {#each arrayCurrency as curr}
      <option value={curr.currency}>{curr.currency}</option>
    {/each}
  </select>
</div>
