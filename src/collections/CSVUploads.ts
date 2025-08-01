import type { CollectionConfig } from 'payload'
import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'

export const CSVUploads: CollectionConfig = {
  slug: 'csv-uploads',
  upload: {
    staticDir: 'media',
    mimeTypes: ['text/csv'],
  },
  admin: {
    useAsTitle: 'filename',
    description: 'Upload a CSV file to add multiple sponsors at once.',
  },
  fields: [],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const filePath = path.join(process.cwd(), 'media', doc.filename)
        const sponsors: any[] = []

        await new Promise((resolve, reject) => {
          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              if (row['Name'] && row['Location'] && row['Sponsorship Details']) {
                sponsors.push({
                  name: row['Name'],
                  location: row['Location'],
                  instagram: row['Instagram'] || null,
                  sponsorshipDetails: row['Sponsorship Details'],
                  logo: null,
                })
              }
            })
            .on('end', () => resolve(sponsors))
            .on('error', (error) => {
              console.error('CSV Processing Error:', error)
              reject(error)
            })
        })

        for (const sponsor of sponsors) {
          try {
            await req.payload.create({
              collection: 'sponsors',
              data: sponsor,
            })
          } catch (error) {
            console.error('Error creating sponsor:', error)
          }
        }
      },
    ],
  },
}
