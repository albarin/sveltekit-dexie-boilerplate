<script lang="ts">
	import Account from './Account.svelte';
	import LicenseBadge from './LicenseBadge.svelte';
	import Logo from './Logo.svelte';
	import SyncStatus from './SyncStatus.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import Notifications from './notifications/BellButton.svelte';
	import { browser } from '$app/environment';

	let isOnline = $state(browser ? navigator.onLine : true);
</script>

<svelte:window on:online={() => (isOnline = true)} on:offline={() => (isOnline = false)} />

<header class="sticky top-0 bg-background border-b py-1 px-4">
	<div class="flex items-center">
		<Logo />

		<LicenseBadge />

		<div class="flex flex-1 items-center justify-end">
			<SyncStatus />
			<ThemeSwitcher />
			<Notifications />
			<Account />
		</div>
	</div>
</header>

{#if !isOnline}
	<div class="sticky top-0 bg-red-500 text-white text-sm text-center border-b py-1 px-4">
		No network connection. Some features may be unavailable. Sync will resume when connection is
		restored.
	</div>
{/if}
