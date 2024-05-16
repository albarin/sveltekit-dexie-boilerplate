<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Bell } from 'lucide-svelte';

	const notifications = [];

	const title = $derived(
		!notifications.length
			? 'You have no unread notifications'
			: `You have ${notifications.length} unread notifications`
	);
</script>

<Button class="relative" size="icon" variant="ghost" {title}>
	<Bell />
	{#if notifications.length > 0}
		<span class="absolute flex h-2 w-2 bottom-5 right-[10px]">
			<span
				class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
			>
			</span>
			<span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
		</span>
	{/if}
</Button>

<style>
	.animate-ping {
		animation-iteration-count: 3;
	}
</style>
