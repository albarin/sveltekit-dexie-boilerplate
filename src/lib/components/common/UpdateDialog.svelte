<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { t } from '$lib/translations';

	interface Props {
		newVersionAvailable: boolean;
		serviceWorker: ServiceWorker | undefined;
	}

	let { newVersionAvailable, serviceWorker }: Props = $props();

	const update = () => {
		serviceWorker?.postMessage({ type: 'SKIP_WAITING' });
		location.reload();
	};
</script>

<AlertDialog.Root open={newVersionAvailable}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{$t('common.update.dialog_title')}</AlertDialog.Title>
			<AlertDialog.Description>
				<p>{$t('common.update.dialog_description_1')}</p>
				<p>{$t('common.update.dialog_description_2')}</p>
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>{$t('common.update.dialog_cancel_button')}</AlertDialog.Cancel>
			<AlertDialog.Action onclick={update}
				>{$t('common.update.dialog_update_button')}</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
