<script lang="ts">
	import { isExpiredLicense, isValidLicense, licenseDaysLeft } from '$lib/auth';
	import { db } from '$lib/db';
	import { Toaster, toast } from 'svelte-sonner';

	const user = db.cloud.currentUser;

	$effect(() => {
		if (!$user.license) {
			toast.warning('You are offline', {
				id: 'license-toast',
				duration: Number.POSITIVE_INFINITY
			});
			return;
		}

		if (isExpiredLicense($user.license)) {
			toast.error(
				'Your license has expired. You are in offline mode until a valid license is purchased.',
				{
					id: 'license-toast',
					duration: Number.POSITIVE_INFINITY
				}
			);
			return;
		}

		let licenseExpiresInDays = licenseDaysLeft($user.license);
		if (licenseExpiresInDays) {
			toast.warning(`Your license expires in ${licenseExpiresInDays} days.`, {
				id: 'license-toast',
				duration: Number.POSITIVE_INFINITY
			});
			return;
		}

		if (isValidLicense($user.license)) {
			toast.dismiss('license-toast');
			return;
		}
	});
</script>

<Toaster
	richColors
	position="bottom-left"
	toastOptions={{
		class: 'max-w-max h-12'
	}}
/>
