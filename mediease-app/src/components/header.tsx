import { BookPlusIcon } from "lucide-react"
import Link from "next/link"

export const Header = () => {
    return (
        <header className="bg-cyan-800 text-white p-4 
        flex items-center justify-start
        md:justify-center
        shadow-md fixed top-0 left-0 right-0 z-50 ">
            <Link href="/">
                <h1 className="text-2xl font-bold">MediEase</h1>
            </Link>

            <div className="w-fit">
                <Link href="/allbookings" 
                className="ml-4 text-lg flex items-center w-fit absolute right-4 top-4 ">
                    <BookPlusIcon className="h-6 w-6" />
                    <p className="ml-2 hidden md:block">All Bookings</p>
                    </Link>
            </div>
        </header>
    )
}