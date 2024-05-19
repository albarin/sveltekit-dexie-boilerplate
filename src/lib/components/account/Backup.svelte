<script>
	import { format } from '$lib/date';
	import { Setting, db } from '$lib/db';
	import { liveQuery } from 'dexie';
	import Button from '../ui/button/button.svelte';
	import * as Section from './section';

	let backup = liveQuery(() => Setting.get('last_backup'));

	const download = async () => {
		const data = await Promise.all(
			db.backupTables.map(async (table) => {
				const tableData = await db.table(table).toArray();
				return { [table]: tableData };
			})
		);

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
		<Section.Title>Backup</Section.Title>
		<Section.Description>
			<p>Download your data to a file.</p>
			{#if $backup}
				<p>
					Your last backup was on the {format($backup.value)}.
				</p>
			{:else}
				<p>You haven't backed up your data yet.</p>
			{/if}
		</Section.Description>
	</Section.Header>
	<Section.Content>
		<Button size="sm" on:click={download}>Download</Button>
	</Section.Content>
</Section.Root>
