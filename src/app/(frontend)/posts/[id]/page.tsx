import React from 'react'

interface PostProps {
  params: {
    id: string
  }
}

const Post = async ({ params }: PostProps) => {
  const { id } = await params

  return (
    <div>
      <h1>Post: {id}</h1>
    </div>
  )
}

export default Post
