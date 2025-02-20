<script lang="ts">
	import { PUBLIC_DB_NAME } from '$env/static/public';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Section from '$lib/components/ui/section';
	import { format } from '$lib/date';
	import { Setting, db } from '$lib/db';
	import { t } from '$lib/translations';
	import { liveQuery } from 'dexie';

	let backup = liveQuery(() => Setting.getByKey('last_backup'));
	let language = liveQuery(() => Setting.getByKey('language'));

	const download = async () => {
		const tablesData = await Promise.all(
			db.backupTables.map(async (table) => {
				const tableData = await db.table(table).toArray();
				return { [table]: tableData };
			})
		);

		const data = tablesData.reduce((acc, obj) => Object.assign(acc, obj), {});

		const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${PUBLIC_DB_NAME}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);

		Setting.update({
			...$backup,
			key: 'last_backup',
			value: new Date().toISOString()
		} as Setting);
	};
</script>

<Section.Root>
	<Section.Header>
		<Section.Title>{$t('account.backup.title')}</Section.Title>
		<Section.Description>
			<p>{$t('account.backup.description')}</p>
			{#if $backup}
				<p>
					{$t('account.backup.last_backup', { date: format($backup.value, $language?.value) })}
				</p>
			{:else}
				<p>{$t('account.backup.no_backup')}</p>
			{/if}
		</Section.Description>
	</Section.Header>
	<Section.Content>
		<Button size="sm" onclick={download} title={$t('account.backup.download')}>
			{$t('account.backup.download')}
		</Button>
	</Section.Content>
</Section.Root>
