<script lang="ts">
	import { inSync } from '$lib/auth';
	import Button from '$lib/components/ui/button/button.svelte';
	import { db } from '$lib/db';
	import { RefreshCw } from 'lucide-svelte';

	const syncState = db.cloud.syncState;
	const synced = $derived(inSync($syncState));
</script>

{#if !synced}
	<Button size="icon" variant="ghost">
		<RefreshCw class="animate-spin-slow" />
	</Button>
{/if}
