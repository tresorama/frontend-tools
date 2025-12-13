<script lang="ts">
  import { storeTest } from '$lib/state/test/store';
</script>

<section>
  <p>Counter Sync: {$storeTest.counterSync.count}</p>
  <button type="button" on:click={storeTest.api.counterSync.actions.increment}>increment</button>
  <button type="button" on:click={storeTest.api.counterSync.actions.decrement}>decrement</button>
  <button type="button" on:click={storeTest.api.counterSync.actions.reset}>reset</button>
</section>

<section>
  <p>Counter Async: {$storeTest.counterAsync.count}</p>
  <button type="button" on:click={storeTest.api.counterAsync.actions.increment}>increment</button>
  <button type="button" on:click={storeTest.api.counterAsync.actions.decrement}>decrement</button>
  <button type="button" on:click={storeTest.api.counterAsync.actions.reset}>reset</button>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
</style>
