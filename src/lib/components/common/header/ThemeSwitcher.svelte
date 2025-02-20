<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { t } from '$lib/translations';
	import { Moon, Sun } from 'lucide-svelte';
	import { mode, toggleMode } from 'mode-watcher';

	const modeTitle = $derived(
		$mode === 'dark' ? $t('header.theme_switcher.light') : $t('header.theme_switcher.dark')
	);
</script>

<Button class="[&_svg]:size-5" onclick={toggleMode} variant="ghost" size="icon" title={modeTitle}>
	<Sun class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
	<Moon class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
	<span class="sr-only">{modeTitle}</span>
</Button>
