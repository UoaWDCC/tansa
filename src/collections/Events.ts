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
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Event Description',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Cover Image',
    },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true, // Enables multiple image uploads
      required: false,
      label: 'Event Photos',
    },
  ],
}
