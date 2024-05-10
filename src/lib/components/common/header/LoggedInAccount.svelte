<script lang="ts">
	import { logout } from '$lib/auth';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { db } from '$lib/db';
	import Avatar from './Avatar.svelte';

	const user = db.cloud.currentUser;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" size="icon">
			<Avatar />
			<span class="sr-only">Toggle user menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>{$user.email}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={logout}>Logout</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
