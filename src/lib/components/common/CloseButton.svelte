<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { t } from '$lib/translations';
	import { X } from 'lucide-svelte';

	let { open = $bindable() }: { open: boolean } = $props();

	const close = () => {
		open = false;
	};
</script>

<div class="flex flex-row-reverse absolute right-1 top-1">
	<Button
		size="icon"
		variant="link"
		class="visible"
		onclick={close}
		title={$t('preferences.button.close')}
	>
		<X />
	</Button>
</div>
