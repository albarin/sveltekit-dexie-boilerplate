<script lang="ts">
	import { pushState } from '$app/navigation';
	import { login, logout } from '$lib/auth';
	import Account from '$lib/components/account/Account.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { db } from '$lib/db';
	import Avatar from './Avatar.svelte';

	const user = db.cloud.currentUser;

	let openAccount = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost" size="icon">
			<Avatar />
			<span class="sr-only">Toggle user menu</span>
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content align="end">
		{#if $user.isLoggedIn}
			<DropdownMenu.Label>{$user.email}</DropdownMenu.Label>
		{:else}
			<DropdownMenu.Item onclick={login}>Sign in</DropdownMenu.Item>
		{/if}
		<DropdownMenu.Separator />

		<DropdownMenu.Item
			onclick={() => {
				pushState('/account', {});
				openAccount = true;
			}}
		>
			Account
		</DropdownMenu.Item>

		{#if $user.isLoggedIn}
			<DropdownMenu.Item onclick={logout}>Logout</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>

<Account bind:open={openAccount} />
