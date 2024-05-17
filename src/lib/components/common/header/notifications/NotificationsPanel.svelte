<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import { Separator } from '$lib/components/ui/separator';
	import { db, type Notification } from '$lib/db';
	import { MailCheck, Trash, X } from 'lucide-svelte';

	let { open = $bindable(), notifications }: { open: boolean; notifications: Notification[] } =
		$props();

	const unreadNotifications = $derived(notifications?.filter((n) => !n.read));

	const markAsRead = (id: number) => async () => {
		await db.notifications.update(id, { read: true });
	};

	const markAllAsRead = async () => {
		await db.notifications.bulkUpdate(
			notifications.map((n) => ({ key: n.id, changes: { read: true } }))
		);
	};

	const deleteAll = async () => {
		await db.notifications.clear();
	};

	const deleteNotification = (id: number) => async () => {
		await db.notifications.delete(id);
	};
</script>

<Popover.Root bind:open>
	<Popover.Trigger />
	<Popover.Content class="p-0" side="bottom" align="end" strategy="absolute">
		<div class="flex items-center justify-between px-4 h-14">
			<div class="flex gap-2 items-center">
				{#if notifications?.length}
					<h3 class="font-semibold text-md">Notifications</h3>
				{:else}
					<h3 class="font-semibold text-md">No notifications</h3>
				{/if}

				{#if notifications?.length > 0}
					<div class="flex">
						{#if unreadNotifications?.length > 0}
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

			{#if unreadNotifications?.length > 0}
				<Badge title={`${unreadNotifications?.length} unread notifications`}>
					{unreadNotifications?.length}
				</Badge>
			{/if}
		</div>
		<Separator />

		<div class="max-h-80 overflow-scroll">
			{#each notifications as notification (notification.id)}
				<div
					key={notification.id}
					class="flex justify-between pl-4 py-2"
					class:bg-muted={notification.read}
				>
					<button
						title="Mark as read"
						class="w-full text-sm text-left"
						onclick={markAsRead(notification.id)}
					>
						{notification.body}
					</button>
					<button class="px-4 py-3" title="Delete" onclick={deleteNotification(notification.id)}>
						<X size="15" />
					</button>
				</div>
				<Separator />
			{/each}
		</div>
	</Popover.Content>
</Popover.Root>
