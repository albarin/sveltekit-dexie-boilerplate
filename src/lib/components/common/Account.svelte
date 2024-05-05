<script lang="ts">
	import LoggedInAccount from './LoggedInAccount.svelte';
	import LoggedOutAccount from './LoggedOutAccount.svelte';

	const loggedIn = true;
</script>

{#if loggedIn}
	<LoggedInAccount />
{:else}
	<LoggedOutAccount />
{/if}
