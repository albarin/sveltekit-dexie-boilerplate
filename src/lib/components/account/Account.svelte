<script lang="ts">
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { t } from '$lib/translations';
	import CloseButton from '../common/CloseButton.svelte';
	import LicenseStatus from './AccountLicense.svelte';
	import Backup from './Backup.svelte';
	import Import from './Import.svelte';

	let { open = $bindable() }: { open: boolean } = $props();
</script>

<Sheet.Root bind:open>
	<Sheet.Content class="account">
		<CloseButton bind:open />

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
