<script lang="ts">
	import { format } from '$lib/date';
	import { Setting, db } from '$lib/db';
	import { t } from '$lib/translations';
	import { liveQuery } from 'dexie';
	import Button from '../ui/button/button.svelte';
	import * as Section from '../ui/section';

	let backup = liveQuery(() => Setting.get('last_backup'));

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
		link.download = 'boilerplate.json';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);

		if ($backup) {
			Setting.update($backup, { value: new Date().toISOString() });
		} else {
			Setting.create('last_backup', new Date().toISOString());
		}
	};
</script>

<Section.Root>
	<Section.Header>
		<Section.Title>{$t('account.backup.title')}</Section.Title>
		<Section.Description>
			<p>{$t('account.backup.description')}</p>
			{#if $backup}
				<p>
					{$t('account.backup.last_backup', { date: format($backup.value) })}
				</p>
			{:else}
				<p>{$t('account.backup.no_backup')}</p>
			{/if}
		</Section.Description>
	</Section.Header>
	<Section.Content>
		<Button size="sm" on:click={download} title={$t('account.backup.download')}>
			{$t('account.backup.download')}
		</Button>
	</Section.Content>
</Section.Root>
