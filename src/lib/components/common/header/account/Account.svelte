<script lang="ts">
	import { login, logout } from '$lib/auth';
	import Account from '$lib/components/account/Account.svelte';
	import Preferences from '$lib/components/preferences/Preferences.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { db } from '$lib/db';
	import { t } from '$lib/translations';
	import Avatar from './Avatar.svelte';

	const user = db.cloud.currentUser;

	let openAccount = $state(false);
	let openPreferences = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost" size="icon" title={$t('header.account.toggle_menu')}>
			<Avatar />
			<span class="sr-only">{$t('header.account.toggle_menu')}</span>
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content align="end">
		{#if $user.isLoggedIn}
			<DropdownMenu.Label>{$user.email}</DropdownMenu.Label>
		{:else}
			<DropdownMenu.Item onclick={login}>{$t('header.account.sign_in')}</DropdownMenu.Item>
		{/if}
		<DropdownMenu.Separator />

		<DropdownMenu.Item onclick={() => (openAccount = true)}>
			{$t('header.account.menu_account')}
		</DropdownMenu.Item>

		<DropdownMenu.Item
			onclick={() => {
				openPreferences = true;
			}}
		>
			{$t('header.account.menu_preferences')}
		</DropdownMenu.Item>

		{#if $user.isLoggedIn}
			<DropdownMenu.Item onclick={logout}>{$t('header.account.log_out')}</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>

{#if openAccount}
	<Account bind:open={openAccount} />
{/if}
{#if openPreferences}
	<Preferences bind:open={openPreferences} />
{/if}
