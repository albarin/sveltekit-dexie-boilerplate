<script lang="ts">
	import { db } from '$lib/db';
	import { t } from '$lib/translations';
	import { RefreshCw } from 'lucide-svelte';
	import * as Section from './section';

	let error = $state('');
	let uploading = $state(false);
	let done = $state(false);
	let uploader: HTMLInputElement | undefined = $state(undefined);

	const importBackup = async () => {
		error = '';
		uploading = true;

		let maxFileSize = 3145728;
		const file = uploader?.files![0];
		if (!file) {
			error = $t('account.import.error.no_file_selected');
			uploading = false;
			return;
		}

		if (file.size > maxFileSize) {
			error = $t('account.import.error.file_size_exceeded');
			uploading = false;
			return;
		}

		const fileExtensionArray = file.type.split('/');
		const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];

		if (!fileExtension.includes('json')) {
			error = $t('account.import.error.invalid_file_type');
			uploading = false;
			return;
		}

		const text = await file.text();
		let jsonData;

		try {
			jsonData = JSON.parse(text);
		} catch (e) {
			error = $t('account.import.error.invalid_format');
			uploading = false;
			return;
		}

		const tables = Object.keys(jsonData);

		for (const table of tables) {
			try {
				await db.table(table).bulkPut(jsonData[table]);
			} catch (e) {
				error = $t('account.import.error.error_importing', { table });
				uploading = false;
				return;
			}
		}

		done = true;
		uploading = false;
	};
</script>

<Section.Root>
	<Section.Header>
		<Section.Title>{$t('account.import.title')}</Section.Title>
		<Section.Description>{$t('account.import.description')}</Section.Description>
	</Section.Header>
	<Section.Content>
		<input
			class="w-52 flex h-9 rounded-md border border-input bg-background px-2 py-1.5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
			bind:this={uploader}
			type="file"
			onchange={importBackup}
		/>

		<div class="mt-3 text-sm">
			{#if uploading}
				<span class="flex gap-2 items-center ml-2 text-green-600">
					<RefreshCw class="animate-spin-slow" />
					{$t('account.import.importing')}
				</span>
			{:else if error && !done}
				<span class="text-destructive">{error}</span>
			{:else if done}
				{#if error}
					<span class="text-destructive">{error}</span>
				{:else}
					<span class="text-success text-green-600 text-">{$t('account.import.imported')}</span>
				{/if}
			{/if}
		</div>
	</Section.Content>
</Section.Root>
