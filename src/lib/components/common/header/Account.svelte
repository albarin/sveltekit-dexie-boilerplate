<script lang="ts">
	import { inSync } from '$lib/auth';
	import { db } from '$lib/db';
	import LoggedInAccount from './LoggedInAccount.svelte';
	import LoggedOutAccount from './LoggedOutAccount.svelte';

	const user = db.cloud.currentUser;
	const syncState = db.cloud.syncState;

	const synced = $derived(inSync($syncState));
</script>

{#if synced && $user.isLoggedIn}
	<LoggedInAccount />
{:else}
	<LoggedOutAccount />
{/if}
