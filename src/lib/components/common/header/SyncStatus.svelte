<script lang="ts">
	import { inSync } from '$lib/auth';
	import Button from '$lib/components/ui/button/button.svelte';
	import { db } from '$lib/db';
	import { t } from '$lib/translations';
	import { RefreshCw } from 'lucide-svelte';

	const syncState = db.cloud.syncState;
	const synced = $derived(inSync($syncState));
</script>

{#if !synced}
	<Button size="icon" variant="ghost" title={$t('header.sync.syncing')}>
		<RefreshCw class="animate-spin-slow" />
	</Button>
{/if}
