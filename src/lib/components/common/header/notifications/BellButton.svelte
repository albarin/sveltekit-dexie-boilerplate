<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';
	import { Bell } from 'lucide-svelte';
	import NotificationsPanel from './Panel.svelte';
	import NotificationDot from './RedDot.svelte';

	let notifications = liveQuery(
		async () => await db.notifications.orderBy('created_at').reverse().toArray()
	);

	let open = $state(false);

	const title = $derived(
		$notifications?.length
			? `You have ${$notifications.length} unread notifications`
			: 'You have no unread notifications'
	);
</script>

<Button
	class={`relative ${open ? 'pointer-events-none' : ''}`}
	size="icon"
	variant="ghost"
	{title}
	on:click={() => (open = true)}
>
	<Bell />
	{#if $notifications?.length > 0}
		<NotificationDot />
	{/if}
</Button>

<NotificationsPanel bind:open notifications={$notifications} />
