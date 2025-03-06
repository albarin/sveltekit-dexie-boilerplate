<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { login } from '$lib/auth';
	import { Label } from '$lib/components/ui/label';
	import * as Section from '$lib/components/ui/section';
	import { Switch } from '$lib/components/ui/switch';
	import { db } from '$lib/db';
	import { subscribe, unsubscribe } from '$lib/notifications';
	import { t } from '$lib/translations';
	import { closeSettings } from '$lib/utils';

	let user = db.cloud.currentUser;
	let checked = $state(!!page.data.subscription);

	const handleChange = async () => {
		if (checked) {
			const subscription = await subscribe($user);
			if (!subscription) {
				checked = false;
			}
		} else {
			await unsubscribe($user);
		}

		invalidateAll();
	};
</script>

<Section.Root>
	<Section.Header>
		<Section.Title>{$t('preferences.notifications.title')}</Section.Title>
		<Section.Description>
			{#if !$user.isLoggedIn}
				<button
					class="font-semibold hover:underline"
					onclick={() => {
						closeSettings();
						login();
					}}
				>
					{$t('preferences.notifications.logged_out.button')}
				</button>

				{$t('preferences.notifications.logged_out.description')}
			{:else}
				{$t('preferences.notifications.description')}
			{/if}
		</Section.Description>
	</Section.Header>
	{#if $user.isLoggedIn}
		<Section.Content>
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<Switch
						bind:checked
						disabled={Notification.permission === 'denied' || !$user.isLoggedIn}
						onCheckedChange={handleChange}
					/>
					<Label>{$t('preferences.notifications.switch_label')}</Label>
				</div>
				{#if Notification.permission === 'denied'}
					<div>
						<p class="text-sm text-destructive">
							{$t('preferences.notifications.no_permission_1')}
						</p>
						<p class="text-sm text-destructive">
							{$t('preferences.notifications.no_permission_2')}
						</p>
					</div>
				{/if}
			</div>
		</Section.Content>
	{/if}
</Section.Root>
