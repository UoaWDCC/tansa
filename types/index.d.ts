// Payload Types
type MediaItem = {
  id: number
  title: string
  url: string
  alt: string
  width: number
  height: number
}

type EventItem = {
  id: number
  title: string
  date: string
  description?: string
  coverImage?: string
  photos?: MediaItem[]
}

type ExecMember = {
  id: number
  name: string
  position: string
  degree: string
  category: string
  profileImage?: MediaItem
}

// Website Types
type EventSectionProps = {
  title: string
  date: string
  photoUrls: string[]
}
