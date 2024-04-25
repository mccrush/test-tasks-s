<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let arrayCurrency;
  export let currencyTo;
  export let valueTo;

  const dispatch = createEventDispatcher();

  const updateResult = () => {
    dispatch("updateResult");
  };
</script>

<div class="form-converter">
  <input type="number" bind:value={valueTo} on:input={updateResult} />

  <select bind:value={currencyTo} on:change={updateResult}>
    {#each arrayCurrency as curr}
      <option value={curr.currency}>{curr.currency}</option>
    {/each}
  </select>
</div>
