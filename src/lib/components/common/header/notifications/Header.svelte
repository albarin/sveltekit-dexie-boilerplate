<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { db, type Notification } from '$lib/db';
	import { MailCheck, Trash } from 'lucide-svelte';

	const markAllAsRead = async () => {
		await db.notifications.bulkUpdate(
			notifications.map((n) => ({ key: n.id, changes: { read: true } }))
		);
	};

	const deleteAll = async () => {
		await db.notifications.clear();
	};

	let { notifications }: { notifications: Notification[] } = $props();

	const unreadCount = $derived(notifications?.filter((n) => !n.read).length);
</script>

<div class="flex items-center justify-between px-4 h-14">
	<div class="flex gap-2 items-center">
		{#if !notifications?.length}
			<h3 class="font-semibold text-md">No notifications</h3>
		{:else}
			<h3 class="font-semibold text-md">Notifications</h3>

			<div class="flex">
				{#if unreadCount > 0}
					<Button
						size="icon"
						variant="ghost"
						class=""
						title="Mark all as read"
						on:click={markAllAsRead}
					>
						<MailCheck size="15" />
					</Button>
				{/if}

				<Button size="icon" variant="ghost" title="Delete all" on:click={deleteAll}>
					<Trash size="15" />
				</Button>
			</div>
		{/if}
	</div>

	{#if unreadCount > 0}
		<Badge title={`${unreadCount} unread notifications`}>
			{unreadCount}
		</Badge>
	{/if}
</div>

<Separator />
