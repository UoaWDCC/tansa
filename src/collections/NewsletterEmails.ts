import type { CollectionConfig } from 'payload'

export const NewsletterEmails: CollectionConfig = {
  slug: 'newsletter_emails',
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
      unique: true,
      label: 'Email Address',
    },
  ],
}
