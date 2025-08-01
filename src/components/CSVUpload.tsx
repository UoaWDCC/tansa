import React, { useState } from 'react'
import { usePayloadAPI } from 'payload/components/hooks'

export const CSVUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
      setSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append('csvFile', file)

      const response = await fetch('/api/sponsors/upload-csv', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload CSV')
      }

      setSuccess(true)
      setFile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload CSV')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Sponsors CSV</h2>
      <div className="space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload CSV'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">CSV uploaded successfully!</p>}
      </div>
    </div>
  )
}
