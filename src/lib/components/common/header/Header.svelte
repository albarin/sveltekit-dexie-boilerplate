<script lang="ts">
	import Account from './Account.svelte';
	import Logo from './Logo.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<header class="sticky top-0 flex justify-between h-16 items-center">
	<Logo />

	<div class="flex gap-2 justify-center">
		<ThemeSwitcher />
		<Account />
	</div>
</header>
