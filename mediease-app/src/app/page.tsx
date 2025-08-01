"use client"

import { useState } from "react";
import { Header } from "@/components/header";
import doctorDataArray from "../utils/doctors.json"
import { Doctor } from "@/utils/types";
import { DoctorCard } from "@/components/doctorCard";

export default function Home() {
  const [currentDoctors, setCurrentDoctors] = useState<Doctor[]>(doctorDataArray);

  return (
    <>
    <Header/>
    <main className="mt-16 border min-h-screen">
        <h1 className="text-3xl font-bold underline">
          Mediease
        </h1>
        <ul className="mt-4 p-2 w-full border  flex justify-start flex-wrap gap-4">
          {
            currentDoctors.map((doctor:Doctor) => (
              
              <DoctorCard  key={doctor.id} doctor={doctor}/>
            ))
          }
        </ul>
    </main>
    </>
  );
}
