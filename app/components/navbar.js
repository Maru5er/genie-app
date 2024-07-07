import '../globals.css'
import Link from 'next/link'
export default function Navbar() {
    return(
      <nav className="border-b sticky top-0 bg-gray-900 text-gray-100 border-gray-800 z-10">
        <div className="h-14 max-w-7xl p-4 mx-auto flex items-center justify-between">
          <Link href="/" className="font-medium text-lg md:hover:underline">
            Genie
          </Link>
        </div>
      </nav>
    )
  }