<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Snail } from 'lucide-svelte';
	import CircleUserRound from 'lucide-svelte/icons/circle-user-round';
	import '../app.css';

	let { children } = $props();
</script>

<div class="container flex min-h-screen w-full flex-col">
	<header class="sticky top-0 flex justify-between h-16 items-center">
		<a href="/" class="flex gap-1 items-center">
			<Button size="icon" variant="link">
				<Snail class="h-7 w-7" strokeWidth="1.8" />
			</Button>
			<h1 class="text-xl">Home</h1>
		</a>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="link">
					<CircleUserRound class="h-7 w-7" />
					<span class="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
				<DropdownMenu.Item>Support</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Logout</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</header>

	<main class="h-screen p-4 md:p-10">
		{@render children()}
	</main>
</div>
