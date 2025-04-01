import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Title',
    },
    {
      name: 'event',
      type: 'text',
      required: false,
      label: 'Event',
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
