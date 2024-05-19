<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { X } from 'lucide-svelte';
	import Separator from '../ui/separator/separator.svelte';
	import Backup from './Backup.svelte';

	let { open = $bindable() }: { open: boolean } = $props();

	const close = () => {
		open = false;
		history.back();
	};
</script>

<Sheet.Root bind:open onOutsideClick={close}>
	<Sheet.Content class="account">
		<div class="flex flex-row-reverse absolute right-1 top-1">
			<Button size="icon" variant="link" class="visible" on:click={close}>
				<X />
			</Button>
		</div>

		<Sheet.Header>
			<Sheet.Title>Account</Sheet.Title>
			<Separator />
		</Sheet.Header>

		<Backup />
	</Sheet.Content>
</Sheet.Root>

<style>
	:global(.account button[data-dialog-close]) {
		visibility: hidden;
	}
</style>
