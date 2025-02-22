<script lang="ts">
	import { page } from '$app/state';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { db } from '$lib/db';
	import type { Notification } from '$lib/db/models/Notification';
	import { t } from '$lib/translations';
	import { MailCheck, Trash } from 'lucide-svelte';

	const notificationRepo = page.data.notificationRepository;

	let { notifications, unreadCount }: { notifications: Notification[]; unreadCount: number } =
		$props();
</script>

<div class="flex items-center justify-between px-4 h-14">
	<div class="flex gap-2 items-center">
		{#if !notifications?.length}
			<h3 class="font-semibold text-md">
				{$t('header.notifications.title.no_notifications')}
			</h3>
		{:else}
			<h3 class="font-semibold text-md">
				{$t('header.notifications.title.notifications')}
			</h3>

			<div class="flex">
				{#if unreadCount > 0}
					<Button
						size="icon"
						variant="ghost"
						class=""
						title={$t('header.notifications.header.button.mark_all_as_read')}
						onclick={() => notificationRepo.markAllAsRead(notifications)}
					>
						<MailCheck size="15" />
					</Button>
				{/if}

				<Button
					size="icon"
					variant="ghost"
					title={$t('header.notifications.header.button.delete_all')}
					onclick={() => notificationRepo.deleteAll(notificationRepo)}
				>
					<Trash size="15" />
				</Button>
			</div>
		{/if}
	</div>

	{#if unreadCount > 0}
		<Badge
			title={$t(`header.notifications.button.unread_${unreadCount === 1 ? '1' : 'n'}`, {
				notifications: unreadCount
			})}
		>
			{unreadCount}
		</Badge>
	{/if}
</div>

<Separator />
