<script lang="ts">
	import { page } from '$app/state';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { t } from '$lib/translations';
	import { closeSettings } from '$lib/utils';
	import CloseButton from '../common/CloseButton.svelte';
	import LicenseStatus from './AccountLicense.svelte';
	import Backup from './Backup.svelte';
	import Import from './Import.svelte';

	let open = $derived(page.url.searchParams.get('settings') === 'account');

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			closeSettings();
		}
	};
</script>

<Sheet.Root {open} onOpenChange={handleOpenChange}>
	<Sheet.Content class="account">
		<CloseButton />

		<Sheet.Header>
			<Sheet.Title>{$t('account.title')}</Sheet.Title>
			<Separator />
		</Sheet.Header>

		<LicenseStatus />
		<Backup />
		<Import />
	</Sheet.Content>
</Sheet.Root>
