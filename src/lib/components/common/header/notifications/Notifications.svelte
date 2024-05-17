<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';
	import { Bell } from 'lucide-svelte';
	import NotificationDot from './NotificationDot.svelte';
	import NotificationsPanel from './NotificationsPanel.svelte';

	let notifications = liveQuery(
		async () => await db.notifications.orderBy('date').reverse().toArray()
	);

	let open = $state(false);

	const title = $derived(
		$notifications?.length
			? `You have ${$notifications.length} unread notifications`
			: 'You have no unread notifications'
	);
</script>

<Button class="relative" size="icon" variant="ghost" {title} on:click={() => (open = true)}>
	<Bell />
	{#if $notifications?.length > 0}
		<NotificationDot />
	{/if}
</Button>

<NotificationsPanel bind:open notifications={$notifications} />
