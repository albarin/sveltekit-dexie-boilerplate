<script lang="ts">
	import Account from './Account.svelte';
	import LicenseBadge from './LicenseBadge.svelte';
	import Logo from './Logo.svelte';
	import SyncStatus from './SyncStatus.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import Notifications from './notifications/BellButton.svelte';
</script>

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
