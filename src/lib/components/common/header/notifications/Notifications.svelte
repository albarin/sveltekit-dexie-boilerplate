<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Bell } from 'lucide-svelte';
	import NotificationDot from './NotificationDot.svelte';
	import NotificationsPanel from './NotificationsPanel.svelte';

	const notifications = [3];

	const title = $derived(
		!notifications.length
			? 'You have no unread notifications'
			: `You have ${notifications.length} unread notifications`
	);
</script>

<Button class="relative" size="icon" variant="ghost" {title}>
	<Bell />
	{#if notifications.length > 0}
		<NotificationDot />
	{/if}

	<NotificationsPanel />
</Button>

<style>
	.animate-ping {
		animation-iteration-count: 3;
	}
</style>
