<script lang="ts">
	import { login, logout } from '$lib/auth';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { db } from '$lib/db';
	import { t } from '$lib/translations';
	import { openSettings } from '$lib/utils';
	import Avatar from './Avatar.svelte';

	const user = db.cloud.currentUser;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button
			class="[&_svg]:size-5"
			variant="ghost"
			size="icon"
			title={$t('header.account.toggle_menu')}
		>
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

		<DropdownMenu.Item onclick={() => openSettings('account')}>
			{$t('header.account.menu_account')}
		</DropdownMenu.Item>

		<DropdownMenu.Item onclick={() => openSettings('preferences')}>
			{$t('header.account.menu_preferences')}
		</DropdownMenu.Item>

		{#if $user.isLoggedIn}
			<DropdownMenu.Item onclick={logout}>{$t('header.account.log_out')}</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
