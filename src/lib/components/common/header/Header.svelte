<script lang="ts">
	import { browser } from '$app/environment';
	import { t } from '$lib/translations';
	import Account from './account/Account.svelte';
	import LicenseBadge from './LicenseBadge.svelte';
	import Logo from './Logo.svelte';
	import Notifications from './notifications/BellButton.svelte';
	import SyncStatus from './SyncStatus.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

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
		{$t('header.offline')}
	</div>
{/if}
