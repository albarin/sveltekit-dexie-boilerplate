<script lang="ts">
	import { db } from '$lib/db';
	import LoggedInAccount from './LoggedInAccount.svelte';
	import LoggedOutAccount from './LoggedOutAccount.svelte';

	const user = db.cloud.currentUser;
</script>

{#if $user.isLoggedIn}
	<LoggedInAccount />
{:else}
	<LoggedOutAccount />
{/if}
