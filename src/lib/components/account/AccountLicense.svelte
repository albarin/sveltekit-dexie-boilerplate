<script lang="ts">
	import { inSync, login } from '$lib/auth';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import { db } from '$lib/db';
	import { licenseDaysLeft, licenseIsExpired, licenseIsValid } from '$lib/license';
	import * as Section from './section';

	const user = db.cloud.currentUser;
	const syncState = db.cloud.syncState;
	const synced = $derived(inSync($syncState));

	let license = $derived.by(() => {
		if (!$user.license) {
			return {
				label: 'Offline',
				content:
					'You are offline. All your data is stored on your browser only. Start your free trial to sync your data and try premium features.',
				button: {
					label: 'Start free trial!',
					action: login,
					color: 'bg-gray-500'
				},
				color: 'text-gray-500 border-gray-500 bg-gray-50'
			};
		}

		if (licenseIsExpired($user.license)) {
			return {
				label: 'Expired',
				content:
					"Your license is expired. You can still use the app but you don't have access premium to features anymore.",
				button: {
					label: 'Renew your license',
					action: () => console.log('Renew your license'),
					color: 'bg-red-500'
				},
				color: 'text-red-500 border-red-500 bg-red-50'
			};
		}

		let licenseExpiresInDays = licenseDaysLeft($user.license);
		if (licenseExpiresInDays) {
			return {
				label: 'Trial',
				content: `Your free trial ends in ${licenseExpiresInDays} days. Upgrade to continue using the app and access premium features.`,
				button: {
					label: 'Upgrade now!',
					action: () => console.log('Upgrade now'),
					color: 'bg-teal-600'
				},
				color: 'text-teal-500 border-teal-500 bg-teal-50'
			};
		}
	});
</script>

{#if synced && !licenseIsValid($user.license)}
	<Section.Root>
		<Section.Content>
			<Alert.Root class={`px-5 pt-4 pb-5 text-sm ${license?.color}`}>
				<Alert.Title class="font-semibold text-lg">{license?.label}</Alert.Title>
				<Alert.Description class="flex flex-col gap-4 items-start">
					{license?.content}
					<Button class={license?.button.color} size="sm" onclick={license?.button?.action}>
						{license?.button?.label}
					</Button>
				</Alert.Description>
			</Alert.Root>
		</Section.Content>
	</Section.Root>
{/if}
