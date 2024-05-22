<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Notification } from '$lib/db';
	import { t } from '$lib/translations';
	import { X } from 'lucide-svelte';

	let { notifications }: { notifications: Notification[] } = $props();
</script>

<div class="max-h-80 overflow-scroll">
	{#each notifications as n (n.id)}
		<div key={n.id} class="flex justify-between pl-4 py-2" class:bg-muted={n.read}>
			<button
				class="w-full text-sm text-left"
				title={$t('header.notifications.notification.mark_as_read')}
				onclick={() => n.markAsRead()}
			>
				{n.message}
			</button>
			<button
				class="px-4 py-3"
				title={$t('header.notifications.notification.delete')}
				onclick={() => n.delete()}
			>
				<X size="15" />
			</button>
		</div>
		<Separator />
	{/each}
</div>
