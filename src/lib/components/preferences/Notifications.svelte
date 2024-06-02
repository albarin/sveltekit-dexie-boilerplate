<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { Label } from '$lib/components/ui/label';
	import * as Section from '$lib/components/ui/section';
	import { Switch } from '$lib/components/ui/switch';
	import { db } from '$lib/db';
	import { subscribe, unsubscribe } from '$lib/notifications';
	import { t } from '$lib/translations';

	let user = db.cloud.currentUser;
	let checked = $state(!!$page.data.subscription);

	const handleChange = async () => {
		if (checked) {
			await unsubscribe();
		} else {
			const subscription = await subscribe($user.email);
			if (!subscription) {
				checked = false;
			}
		}
		invalidateAll();
	};
</script>

<Section.Root>
	<Section.Header>
		<Section.Title>{$t('preferences.notifications.title')}</Section.Title>
		<Section.Description>
			{$t('preferences.notifications.description')}
		</Section.Description>
	</Section.Header>
	<Section.Content>
		<div class="space-y-2">
			<div class="flex items-center gap-2">
				<Switch
					bind:checked
					disabled={Notification.permission === 'denied'}
					onCheckedChange={handleChange}
				/>
				<Label>{$t('preferences.notifications.switch_label')}</Label>
			</div>
			{#if Notification.permission === 'denied'}
				<div>
					<p class="text-sm text-destructive">{$t('preferences.notifications.no_permission_1')}</p>
					<p class="text-sm text-destructive">{$t('preferences.notifications.no_permission_2')}</p>
				</div>
			{/if}
		</div>
	</Section.Content>
</Section.Root>
