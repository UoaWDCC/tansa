// Base media asset shape
type MediaBase = {
  id: number
  title: string
  alt: string
  prefix: string
  updatedAt: string
  createdAt: string
  url: string
  thumbnailURL: string | null
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX: number
  focalY: number
}

// MediaItem for generic use
type MediaItem = Pick<MediaBase, 'id' | 'title' | 'url' | 'alt' | 'width' | 'height'>

// CoverImage uses the full MediaBase, but may have an optional event
type CoverImage = MediaBase & {
  event: string | null
}

// A single photo object with nullable wrapper and title/event
type Photo = {
  id: string | null | undefined
  photo: Omit<MediaBase, 'title' | 'event'> & {
    title: string | null
    event: string | null
  }
}

// Event item structure
type EventItem = {
  id: number
  title: string
  date: string
  category: string
  description: string
  coverImage: CoverImage
  photos: Photo[]
  updatedAt: string
  createdAt: string
}
