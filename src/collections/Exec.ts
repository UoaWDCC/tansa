import { CollectionConfig } from 'payload'

export const Exec: CollectionConfig = {
  slug: 'exec',
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      label: 'Alt Text', // Descriptive alt text for accessibility
    },
    {
        name: 'degree',
        type: 'text', 
        required: true, 
        label: 'Degree Text'
    }
  ],
  upload: {
    mimeTypes: ['image/*'], // Allow only images to be uploaded
  },
}
