<script lang="ts">
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { t } from '$lib/translations';
	import CloseButton from '../common/CloseButton.svelte';
	import Language from './Language.svelte';

	let { open = $bindable() }: { open: boolean } = $props();
</script>

<Sheet.Root bind:open>
	<Sheet.Content class="preferences">
		<CloseButton bind:open />

		<Sheet.Header>
			<Sheet.Title>{$t('preferences.title')}</Sheet.Title>
			<Separator />
		</Sheet.Header>

		<Language />
	</Sheet.Content>
</Sheet.Root>

<style>
	:global(.preferences button[data-dialog-close]) {
		visibility: hidden;
	}
</style>
