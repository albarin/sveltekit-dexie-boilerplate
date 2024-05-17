<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { type Notification } from '$lib/db';
	import Header from './Header.svelte';
	import List from './List.svelte';

	interface Props {
		open: boolean;
		notifications: Notification[];
	}

	let { open = $bindable(), notifications }: Props = $props();
</script>

<Popover.Root bind:open>
	<Popover.Trigger />
	<Popover.Content class="p-0" side="bottom" align="end" strategy="absolute">
		<Header {notifications} />

		<List {notifications} />
	</Popover.Content>
</Popover.Root>
