import React from 'react'

const Loading = () => {
  return (
    <main className="min-h-screen">
      {/* Header Section with Bear and Title */}
      <div className="bg-tansa-blue relative h-[400px] flex items-center justify-center"></div>

      {/* Loading Skeleton Section */}
      <section className="py-12 bg-tansa-cream">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Loading
