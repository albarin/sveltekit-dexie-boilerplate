<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import * as Section from '$lib/components/ui/section';
	import * as Select from '$lib/components/ui/select';
	import { Setting } from '$lib/db';
	import { browserLocale, t } from '$lib/translations';
	import { liveQuery } from 'dexie';

	let language = liveQuery(() => Setting.getByKey('language'));

	let selectedLanguage = $state($language?.value || browserLocale);
	$effect(() => {
		// This would be normally done with $derived but it's necessary because
		// selectedLanguage is a binded  and derived state cannot be binded
		selectedLanguage = $language?.value || browserLocale;
	});

	const languages: Record<string, string> = {
		en: 'English',
		es: 'Español'
	};

	const updateLanguage = async (
		selected: { value: string; label: string; disabled: boolean } | undefined
	) => {
		if (!selected) {
			return;
		}

		Setting.update({
			...$language,
			key: 'language',
			value: selected.value
		} as Setting);

		invalidateAll();
	};
</script>

<Section.Root>
	<Section.Header>
		<Section.Title>{$t('preferences.language.title')}</Section.Title>
		<Section.Description>
			{$t('preferences.language.description')}
		</Section.Description>
	</Section.Header>
	<Section.Content>
		<Select.Root bind:selected={selectedLanguage} onSelectedChange={updateLanguage}>
			<Select.Trigger class="w-48">
				<Select.Value placeholder={languages[selectedLanguage]} />
			</Select.Trigger>
			<Select.Content>
				{#each Object.keys(languages) as language}
					<Select.Item value={language} label={languages[language]}>
						{languages[language]}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</Section.Content>
</Section.Root>
