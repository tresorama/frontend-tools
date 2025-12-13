<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="user-details">
  <span>Name</span>
  <span>{$page.data.session?.user?.name}</span>
  <span>Email</span>
  <span>{$page.data.session?.user?.email}</span>
</div>

<style lang="scss">
  .user-details {
    display: grid;
    grid-template-columns: minmax(5rem, auto) auto;
    justify-content: start;
  }
</style>
