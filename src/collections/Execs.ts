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
      label: 'Degree Text',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        'Presidents',
        'Admin',
        'Marketing',
        'Activities',
        'AESIR',
        'Public Relations Officer',
        'Design',
        'Photography',
        'Interns'
      ],
      label: 'Category Text',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media', // Links to existing media collection
      required: false,
      label: 'Profile Image',
    },
  ],
}
