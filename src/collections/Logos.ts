import { CollectionConfig } from 'payload'

export const Logos: CollectionConfig = {
  slug: 'logos',
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'sponsor',
      type: 'text',
      required: false,
      label: 'Title',
    },
    {
      name: 'alt',
      type: 'text',
      required: false,
      label: 'Alt Text', // Descriptive alt text for accessibility
    },
  ],
  upload: {
    mimeTypes: ['image/*'], // Allow only images to be uploaded
  },
}
