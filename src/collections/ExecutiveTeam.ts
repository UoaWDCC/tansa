import type { CollectionConfig } from 'payload'

export const ExecutiveTeam: CollectionConfig = {
  slug: 'executive_team',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: false, // Executives could have same name.
      label: 'Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      unique: false,
      label: 'Role',
    },
    {
      name: 'ethnicity',
      type: 'text',
      required: false,
      unique: false,
      label: 'Ethnicity',
    },
    {
      name: 'university',
      type: 'text',
      required: false,
      unique: false,
      label: 'University',
    },
    {
      name: 'studying',
      type: 'text',
      required: false,
      unique: false,
      label: 'Studying',
    },
    {
      name: 'fun_fact',
      type: 'text',
      required: false,
      unique: false,
      label: 'Fun Fact',
    },
  ],
}
