"use client"

import { DoctorCard } from "@/components/doctorCard";
import { Header } from "@/components/header";
import { useDoctors } from "@/context/DoctorContext"
import { AvailabilityStatus, Doctor } from "@/utils/types";
import { useState } from "react";


export default function Allbookings(){
    const {doctors}=useDoctors()

    const [bookedDoctors, setBookedDoctors] = useState<Doctor|[]>(doctors.filter(eachDoctors=>eachDoctors.availability_status===AvailabilityStatus.Booked));


    return(
        <div className="mt-20 p-2">
            <Header/>
            <h1 className="text-2xl font-bold text-left">Appointment Booked Doctors</h1>
            <ul className="p-2 mt-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-4">
            {
                bookedDoctors.map((doctor: Doctor) => (
                <DoctorCard  
                    key={doctor.id} 
                    doctor={doctor}
                />
                ))
            }
            </ul>
        </div>
    )
}