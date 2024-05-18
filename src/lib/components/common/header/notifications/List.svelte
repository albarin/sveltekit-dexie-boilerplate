<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Notification } from '$lib/db';
	import { X } from 'lucide-svelte';

	let { notifications }: { notifications: Notification[] } = $props();
</script>

<div class="max-h-80 overflow-scroll">
	{#each notifications as n (n.id)}
		<div key={n.id} class="flex justify-between pl-4 py-2" class:bg-muted={n.read}>
			<button title="Mark as read" class="w-full text-sm text-left" onclick={() => n.markAsRead()}>
				{n.message}
			</button>
			<button class="px-4 py-3" title="Delete" onclick={() => n.delete()}>
				<X size="15" />
			</button>
		</div>
		<Separator />
	{/each}
</div>
