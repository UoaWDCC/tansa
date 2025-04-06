import { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Event Title',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Event Date',
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      label: 'Event Category',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Event Description',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media', // This will link to the Media collection
      required: true,
      label: 'Cover Image',
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Event Photos',
      fields: [
        {
          name: 'photo',
          type: 'relationship',
          relationTo: 'media', // Reference the Media collection for multiple images
        },
      ],
    },
  ],
}
