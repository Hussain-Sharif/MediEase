"use client"

import { Bookings } from "@/utils/types"
import { createContext, ReactNode, useContext, useState } from "react"


interface PaitentBookingContextType{
    allBookings:Bookings[]
    updateAllBookings:(booking:Bookings)=>void 
    getBookingById:(id:number)=>Bookings | undefined
}

const PaitentBookingContext = createContext<PaitentBookingContextType|undefined>(undefined)

export function PaitentBookingProvider({ children }: { children: ReactNode }) {
    const [allBookings, setAllBookings] = useState<Bookings[]>([])

    const updateAllBookings=(booking:Bookings)=>{
        setAllBookings(prevBookings => [...prevBookings, booking])
    }

    const getBookingById = (id: number) => {
    return allBookings.find(eaechBooking => eaechBooking.doctor.id === id)
  }
    console.log('current All Bookings',allBookings)
    return (
        <PaitentBookingContext.Provider 
        value={{
            allBookings,
            updateAllBookings,
            getBookingById
        }}
        >
            {children}
        </PaitentBookingContext.Provider>
    )
}

export function usePaitentBooking() {
    const context = useContext(PaitentBookingContext)
    if (context === undefined) {
        throw new Error("usePaitentBooking must be used within a PaitentBookingProvider")
    }
    return context
}