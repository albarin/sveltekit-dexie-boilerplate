<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { db, type Notification } from '$lib/db';
	import { X } from 'lucide-svelte';

	const markAsRead = (id: number) => async () => {
		await db.notifications.update(id, { read: true });
	};

	const deleteNotification = (id: number) => async () => {
		await db.notifications.delete(id);
	};

	interface Props {
		notifications: Notification[];
	}

	let { notifications }: Props = $props();
</script>

<div class="max-h-80 overflow-scroll">
	{#each notifications as { id, message, read } (id)}
		<div key={id} class="flex justify-between pl-4 py-2" class:bg-muted={read}>
			<button title="Mark as read" class="w-full text-sm text-left" onclick={markAsRead(id!)}>
				{message}
			</button>
			<button class="px-4 py-3" title="Delete" onclick={deleteNotification(id!)}>
				<X size="15" />
			</button>
		</div>
		<Separator />
	{/each}
</div>
