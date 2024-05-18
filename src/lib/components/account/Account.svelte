<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { X } from 'lucide-svelte';

	let { open = $bindable() }: { open: boolean } = $props();

	const close = () => {
		open = false;
		history.back();
	};
</script>

<Sheet.Root bind:open onOutsideClick={close}>
	<Sheet.Content>
		<div class="flex flex-row-reverse relative bottom-5 left-5">
			<Button size="icon" variant="link" class="visible" on:click={close}>
				<X />
			</Button>
		</div>
		<Sheet.Header class="relative bottom-10">
			<Sheet.Title>Account</Sheet.Title>
			<Sheet.Description>This is your account</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>

<style>
	:global([data-dialog-close]) {
		visibility: hidden;
	}
</style>
