<script lang="ts">
	import Account from './Account.svelte';
	import Logo from './Logo.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<header class="sticky top-0 bg-background border-b p-2 px-4">
	<div class="flex justify-between items-center">
		<Logo />

		<div class="flex gap-2 justify-center">
			<ThemeSwitcher />
			<Account />
		</div>
	</div>
</header>
