<script lang="ts">
	import { inSync, login } from '$lib/auth';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Section from '$lib/components/ui/section';
	import { db } from '$lib/db';
	import { licenseDaysLeft, licenseIsEval, licenseIsExpired } from '$lib/license';
	import { t } from '$lib/translations';
	import { closeSettings } from '$lib/utils';

	const user = db.cloud.currentUser;
	const syncState = db.cloud.syncState;
	const synced = $derived(inSync($syncState));

	let license = $derived.by(() => {
		if (!$user.license) {
			return {
				label: $t('license.offline.label'),
				content: $t('license.offline.content'),
				button: {
					label: $t('license.offline.button'),
					action: () => {
						closeSettings();
						login();
					},
					color: 'bg-gray-500'
				},
				color: 'text-gray-500 border-gray-500 bg-gray-50'
			};
		}

		if (licenseIsExpired($user.license)) {
			return {
				label: $t('license.expired.label'),
				content: $t('license.expired.content'),
				button: {
					label: $t('license.expired.button'),
					action: () => console.log('Renew your license'),
					color: 'bg-red-500 hover:bg-red-600'
				},
				color: 'text-red-500 border-red-500 bg-red-50'
			};
		}

		let licenseExpiresInDays = licenseDaysLeft($user.license);
		if (licenseIsEval($user.license)) {
			return {
				label: $t('license.trial.label'),
				content: $t('license.trial.content', { days: licenseExpiresInDays }),
				button: {
					label: $t('license.trial.button'),
					action: () => console.log('Upgrade now'),
					color: 'bg-amber-600 hover:bg-amber-500'
				},
				color: 'text-amber-600 border-amber-600 bg-amber-50'
			};
		}

		if (licenseExpiresInDays) {
			return {
				label: $t('license.valid.label'),
				content: $t('license.valid.content', { days: licenseExpiresInDays }),
				button: {
					label: $t('license.valid.button'),
					action: () => console.log('Renew your license'),
					color: 'bg-emerald-600 hover:bg-emerald-500'
				},
				color: 'text-emerald-600 border-emerald-600 bg-emerald-50'
			};
		}
	});
</script>

{#if synced && license}
	<Section.Root>
		<Section.Content>
			<Alert.Root class={`px-5 pt-4 pb-5 text-sm ${license?.color}`}>
				<Alert.Title class="font-semibold text-lg">{license?.label}</Alert.Title>
				<Alert.Description class="flex flex-col gap-4 items-start">
					{license?.content}
					<Button
						class={`text-white ${license?.button.color}`}
						size="sm"
						onclick={license?.button?.action}
						title={license?.button?.label}
					>
						{license?.button?.label}
					</Button>
				</Alert.Description>
			</Alert.Root>
		</Section.Content>
	</Section.Root>
{/if}
