<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { db } from '$lib/db';

	let ui = db.cloud.userInteraction;

	let otp = $state('');
	let open = $state($ui?.type === 'otp');

	$effect(() => {
		open = $ui?.type === 'otp';
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content role="dialog" class="dialog sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Enter code</Dialog.Title>
			<Dialog.Description>
				A One-Time password has been sent to your email, write it below to sign in.
			</Dialog.Description>
		</Dialog.Header>
		<form class="space-y-4">
			<div>
				<Input type="string" bind:value={otp} />
				{#if $ui?.alerts && $ui?.alerts?.length > 1 && otp.length > 0}
					<span class="text-sm text-red-400">{$ui.alerts[1].message}</span>
				{/if}
			</div>
			<Dialog.Footer>
				<Button
					type="submit"
					onclick={() => {
						$ui?.onSubmit({ otp });
						otp = '';
					}}
					disabled={!otp.length}
				>
					Sign in
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
