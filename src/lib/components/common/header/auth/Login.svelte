<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { db } from '$lib/db';
	import { isEmailValid } from '$lib/utils';

	let ui = db.cloud.userInteraction;

	let email = $state('');
	let open = $state($ui?.type === 'email');

	$effect(() => {
		open = $ui?.type === 'email';
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content role="dialog" class="dialog sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create an account</Dialog.Title>
			<Dialog.Description>Enter your email below to create your account</Dialog.Description>
		</Dialog.Header>

		<form class="space-y-4">
			<div class="flex flex-col gap-2">
				<Input bind:value={email} type="email" placeholder="my@email.com" />
				{#if $ui?.alerts && $ui?.alerts?.length > 0 && email.length > 0}
					<span class="text-sm text-red-400">{$ui.alerts[0].message}</span>
				{/if}
			</div>
			<Dialog.Footer>
				<Button
					type="submit"
					onclick={() => {
						// waitingForOTP = true;
						$ui?.onSubmit({ email });
						email = '';
					}}
					disabled={!isEmailValid(email)}
				>
					Sign in
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
