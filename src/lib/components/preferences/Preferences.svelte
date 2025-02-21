<script lang="ts">
	import { page } from '$app/state';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { t } from '$lib/translations';
	import { closeSettings } from '$lib/utils';
	import CloseButton from '../common/CloseButton.svelte';
	import Language from './Language.svelte';
	import Notifications from './Notifications.svelte';

	let open = $derived(page.url.searchParams.get('settings') === 'preferences');

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			closeSettings();
		}
	};
</script>

<Sheet.Root {open} onOpenChange={handleOpenChange}>
	<Sheet.Content class="preferences">
		<CloseButton />

		<Sheet.Header>
			<Sheet.Title>{$t('preferences.title')}</Sheet.Title>
			<Separator />
		</Sheet.Header>

		<Language />

		<Notifications />
	</Sheet.Content>
</Sheet.Root>
