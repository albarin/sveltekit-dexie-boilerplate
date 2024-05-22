<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { t } from '$lib/translations';
	import { X } from 'lucide-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Language from './Language.svelte';

	let { open = $bindable() }: { open: boolean } = $props();

	const close = () => {
		open = false;
		history.back();
	};
</script>

<Sheet.Root bind:open onOutsideClick={close}>
	<Sheet.Content class="preferences">
		<div class="flex flex-row-reverse absolute right-1 top-1">
			<Button
				size="icon"
				variant="link"
				class="visible"
				on:click={close}
				title={$t('preferences.button.close')}
			>
				<X />
			</Button>
		</div>

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
