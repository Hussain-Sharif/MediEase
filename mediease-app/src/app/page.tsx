"use client"

import React, { useEffect, useState } from "react";
import { Header } from "@/components/header";
import doctorDataArray from "../utils/doctors.json"
import { Doctor, DoctorSpecialization } from "@/utils/types";
import { DoctorCard } from "@/components/doctorCard";
import { TypewriterHero } from "@/components/ui/typewriter-hero";
import { SpecializedTabs } from "@/components/TabsGroup";
import { SearchTabs } from "@/components/searchTab";

export default function Home() {
  const [currentDoctors, setCurrentDoctors] = useState<Doctor[]>([]);
  const [selectedSpec,setSelectedSpec] = useState<{id:number,name:DoctorSpecialization}[]>([])
  const [searchCards,setSearchCards] = useState<string>('')

  const handleSpecChange = (userSelectedSpec:{id:number,name:DoctorSpecialization}) => {
   setSelectedSpec(prev=>prev.some(eachSpec=>eachSpec.id === userSelectedSpec.id)  // If present already remove it else add it 
   ? prev.filter(eachSpec=>eachSpec.id !== userSelectedSpec.id) : [...prev,userSelectedSpec]); 
  };

  useEffect(()=>{ // useEffect for specialization Tabs/Options
    if(selectedSpec.length===0){
      setCurrentDoctors(doctorDataArray)
    }else{
      const filteredDoctors = currentDoctors.filter((doctor: Doctor) =>{
        return doctor.specialization.some((doctorEachSpec:DoctorSpecialization)=>{
          return selectedSpec.some(eachSelectedSpec => eachSelectedSpec.name === doctorEachSpec)
        })
      });
      setCurrentDoctors(filteredDoctors);
    }
  },[selectedSpec])

  const handleUserSearchInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
     setSearchCards(e.target.value)
  }

  useEffect(()=>{ // useEffect for search
    if(!searchCards){
      setCurrentDoctors(doctorDataArray)
    }else{
      const filteredDoctors = currentDoctors.filter((doctor: Doctor) => {
        return doctor.name.toLowerCase().includes(searchCards.toLowerCase())  || doctor.description.toLowerCase().includes(searchCards.toLowerCase())
      });
      setCurrentDoctors(filteredDoctors);
    }
  },[searchCards])


  return (
    <>
    <Header/>
    <main className="mt-16 min-h-screen">
        <div className="z-30  h-fit flex flex-col jutify-center items-center w-full bg-background">
          <TypewriterHero
            title="Book your appointment now! Specialized in"
            description="Find your doctor that best suits you."
            words={["Dental",'Eye','Nose','General','Heart','Brain','Skin']}
            typingSpeed={80}
            deletingSpeed={40}
            pauseDuration={2000}
            cursorClassName="bg-linear-to-r from-cyan-600 via-cyan-500 to-cyan-300 "
            titleClassName="text-gray-900 dark:text-white"
            descriptionClassName="text-gray-600 dark:text-gray-300"
            typingClassName="bg-linear-to-r from-cyan-600 via-cyan-500 to-cyan-300 "
          />
          <div className=" space-y-2 w-full flex flex-col justify-center items-center p-2">
            <SearchTabs searchCards={searchCards} handleUserSearchInput={handleUserSearchInput} />
            <SpecializedTabs selectedSpec={selectedSpec} handleSpecChange={handleSpecChange}/>
          </div>
        </div>

          


          <ul className="p-2 mt-8 w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-4">
            {
              currentDoctors.map((doctor:Doctor) => (
                
                <DoctorCard  key={doctor.id} doctor={doctor}/>
              ))
            }
          </ul>
          <div className="w-full flex flex-col justify-center items-center">
            {
              (currentDoctors.length===0 && 
              (searchCards || selectedSpec.length>0) )
              &&
              <div>
                <h1 className="text-center text-2xl font-bold text-black">No Doctors Found</h1>
                <p className="text-center text-md  text-gray-600">Please Try Again</p>
              </div>
            }
          </div>
       
    </main>
    </>
  );
}
