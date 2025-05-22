import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <div className="bg-tansa-blue h-[100px]"></div>
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-tansa-blue mb-4">404 Not Found</h1>
          <Link href="/" className="bg-tansa-blue text-bold px-6 py-3 rounded-lg">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
