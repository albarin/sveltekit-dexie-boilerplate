<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import { t } from '$lib/translations';
	import { liveQuery } from 'dexie';
	import { Bell } from 'lucide-svelte';
	import NotificationsPanel from './Panel.svelte';
	import NotificationDot from './RedDot.svelte';

	const notificationRepo = page.data.notificationRepository;

	let open = $state(false);
	let notifications = liveQuery(() => notificationRepo.all());

	const unreadCount = $derived($notifications?.filter((n) => !n.read).length);

	const title = $derived(
		unreadCount
			? $t(`header.notifications.button.unread_${unreadCount === 1 ? '1' : 'n'}`, {
					notifications: unreadCount
				})
			: $t('header.notifications.button.no_notifications')
	);
</script>

<Button
	class={`[&_svg]:size-5 relative ${open ? 'pointer-events-none' : ''}`}
	size="icon"
	variant="ghost"
	{title}
	onclick={() => (open = true)}
>
	<Bell />
	{#if unreadCount > 0}
		<NotificationDot />
	{/if}
</Button>

<NotificationsPanel bind:open notifications={$notifications} {unreadCount} />
