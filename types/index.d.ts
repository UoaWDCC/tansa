declare type MediaItem = {
  id: number
  title: string
  url?: string
  alt: string
  width?: number
  height?: number
}

declare type Photo = {
  id: string | null | undefined
  photo: {
    id: number
    title: string | null
    event: string | null
    alt: string | null
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
}

declare type CoverImage = {
  id: number
  title: string
  event: string | null
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

declare type EventItem = {
  id: number
  title: string
  date: string
  category: string
  description: string
  coverImage: CoverImage
  photos: Photo[] // This should now work with the adjusted Photo type
  updatedAt: string
  createdAt: string
}
