<script lang="ts">
  import { page } from '$app/stores';

  import SectionUserProfile from './section-user-profile.svelte';
  import SectionGlobalSettings from './section-global-settings.svelte';
</script>

<div>
  <h1>Account</h1>
  {#if !$page.data.session}
    <div class="not-logged">
      <p>Please login</p>
    </div>
  {:else}
    <div class="logged">
      <h2>Profile</h2>
      <SectionUserProfile />
      <h2>Global Settings</h2>
      <SectionGlobalSettings />
    </div>
  {/if}
</div>

<style lang="scss">
  .not-logged {
    text-align: center;
  }

  .logged {
    h2 {
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
</style>
