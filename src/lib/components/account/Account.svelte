<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { t } from '$lib/translations';
	import { X } from 'lucide-svelte';
	import Separator from '../ui/separator/separator.svelte';
	import LicenseStatus from './AccountLicense.svelte';
	import Backup from './Backup.svelte';
	import Import from './Import.svelte';

	let { open = $bindable() }: { open: boolean } = $props();

	const close = () => {
		open = false;
		history.back();
	};
</script>

<Sheet.Root bind:open onOutsideClick={close}>
	<Sheet.Content class="account">
		<div class="flex flex-row-reverse absolute right-1 top-1">
			<Button
				size="icon"
				variant="link"
				class="visible"
				on:click={close}
				title={$t('account.button.close')}
			>
				<X />
			</Button>
		</div>

		<Sheet.Header>
			<Sheet.Title>{$t('account.title')}</Sheet.Title>
			<Separator />
		</Sheet.Header>

		<LicenseStatus />
		<Backup />
		<Import />
	</Sheet.Content>
</Sheet.Root>

<style>
	:global(.account button[data-dialog-close]) {
		visibility: hidden;
	}
</style>
