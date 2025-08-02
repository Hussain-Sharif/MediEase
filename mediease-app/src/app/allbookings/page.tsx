"use client"

import { DoctorCard } from "@/components/doctorCard";
import { Header } from "@/components/header";
import { useDoctors } from "@/context/DoctorContext"
import { usePaitentBooking } from "@/context/paitentBookingContext";
import { AvailabilityStatus, Bookings, Doctor } from "@/utils/types";
import { useState } from "react";


export default function Allbookings(){
    const {allBookings}=usePaitentBooking()

    const [bookedDoctors, setBookedDoctors] = useState<Bookings[]|[]>(allBookings);


    return(
        <div className="mt-20 p-2 h-screen">
            <Header/>
            <h1 className="text-2xl font-bold text-left">Appointment Booked Doctors</h1>
            <ul className="p-2 mt-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-4">
            {
                bookedDoctors.map((booking: Bookings) => (
                <DoctorCard  
                    key={booking?.doctor?.id} 
                    doctor={booking.doctor}
                />
                ))
            }
            </ul>
            {
                bookedDoctors.length===0 && <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="text-2xl  ">No Appointments Booked</h1>
                </div>
            }
        </div>
    )
}