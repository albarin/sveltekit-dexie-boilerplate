export const manifest: ManifestOptions = {
  id: 'boilerplate',
  name: 'Boilerplate',
  description: 'Boilerplate description',
  theme_color: '#ffffff',
  icons: [
    {
      src: 'logo.png',
      type: 'image/png',
      sizes: '512x512',
      purpose: 'any'
    }
  ],
  screenshots: [
    {
      src: 'logo.png',
      type: 'image/png',
      sizes: '512x512',
      form_factor: 'wide',
    },
    {
      src: 'logo.png',
      type: 'image/png',
      sizes: '512x512',
      form_factor: 'narrow',
    },
  ]
};