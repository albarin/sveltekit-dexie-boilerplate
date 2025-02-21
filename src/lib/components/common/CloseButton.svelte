<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { t } from '$lib/translations';
	import { closeSettings } from '$lib/utils';
	import { X } from 'lucide-svelte';
</script>

<div class="flex flex-row-reverse absolute right-1 top-1">
	<Button
		size="icon"
		variant="link"
		class="visible"
		onclick={() => closeSettings()}
		title={$t('preferences.button.close')}
	>
		<X />
	</Button>
</div>
