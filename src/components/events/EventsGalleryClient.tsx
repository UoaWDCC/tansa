// src/components/EventGalleryClient.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Download } from 'lucide-react'
import { PhotoModal } from './PhotoModal'

interface EventGalleryClientProps {
  title: string
  date: string
  photos: string[]
}

// --- Your original layout logic ---
function getImageDimensions(url: string, idx: number) {
  const aspectRatios = [
    { width: 4, height: 3 },
    { width: 16, height: 9 },
    { width: 3, height: 4 },
    { width: 1, height: 1 },
    { width: 5, height: 4 },
    { width: 3, height: 2 },
  ]
  const ratio = aspectRatios[idx % aspectRatios.length]
  return { width: ratio.width * 100, height: ratio.height * 100 }
}

function calculateRowLayout(
  photos: Array<{ url: string; idx: number }>,
  containerWidth: number,
  targetHeight = 180,
) {
  const rows: Array<Array<{ url: string; idx: number; width: number; height: number }>> = []
  let currentRow: Array<{ url: string; idx: number; width: number; height: number }> = []
  let currentRowWidth = 0
  const minPhotosPerRow = 5
  const maxPhotosPerRow = 7

  for (const photo of photos) {
    const dimensions = getImageDimensions(photo.url, photo.idx)
    const aspectRatio = dimensions.width / dimensions.height
    const photoWidth = targetHeight * aspectRatio

    const shouldFinalizeRow =
      currentRow.length >= minPhotosPerRow &&
      (currentRowWidth + photoWidth > containerWidth || currentRow.length >= maxPhotosPerRow)

    if (shouldFinalizeRow) {
      const scale = containerWidth / currentRowWidth
      const scaledRow = currentRow.map((item) => ({
        ...item,
        width: item.width * scale,
        height: item.height * scale,
      }))
      rows.push(scaledRow)

      currentRow = [{ ...photo, width: photoWidth, height: targetHeight }]
      currentRowWidth = photoWidth
    } else {
      currentRow.push({ ...photo, width: photoWidth, height: targetHeight })
      currentRowWidth += photoWidth
    }
  }

  if (currentRow.length > 0) {
    const scale = containerWidth / currentRowWidth
    const scaledRow = currentRow.map((item) => ({
      ...item,
      width: item.width * scale,
      height: item.height * scale,
    }))
    rows.push(scaledRow)
  }

  return rows
}

// --- Client Component ---
export default function EventGalleryClient({ title, date, photos }: EventGalleryClientProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const photosWithIdx = photos.map((url, idx) => ({ url, idx }))
  const containerWidth = 1200
  const rows = calculateRowLayout(photosWithIdx, containerWidth)

  const handlePhotoClick = (idx: number) => {
    setCurrentPhotoIndex(idx)
    setModalOpen(true)
  }

  const handleDownload = async (url: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${title}-photo-${idx + 1}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Download failed', err)
    }
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-1">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1">
            {row.map((photo) => (
              <div
                key={photo.idx}
                className="relative cursor-pointer group overflow-hidden bg-tansa-cream rounded-md"
                style={{ width: `${photo.width}px`, height: `${photo.height}px`, flex: 'none' }}
                onClick={() => handlePhotoClick(photo.idx)}
              >
                <Image
                  src={photo.url || '/placeholder.svg'}
                  alt={`${title} photo ${photo.idx + 1}`}
                  fill
                  priority={photo.idx < 12}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <button
                  onClick={(e) => handleDownload(photo.url, photo.idx, e)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <Download className="w-4 h-4 text-white" />
                </button>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>
        ))}

        {photos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No photos available for this event.</p>
          </div>
        )}
      </div>

      <PhotoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        photos={photos}
        currentIndex={currentPhotoIndex}
        onNavigate={setCurrentPhotoIndex}
        eventTitle={title}
      />
    </>
  )
}
