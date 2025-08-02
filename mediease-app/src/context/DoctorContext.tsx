"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import doctorDataArray from '@/utils/doctors.json'
import { Doctor, AvailabilityStatus } from '@/utils/types'

interface DoctorContextType {
  doctors: Doctor[]
  updateDoctorStatus: (doctorId: number, status: AvailabilityStatus) => void
  bookDoctor: (doctorId: number) => void
  getDoctorById: (id: number) => Doctor | undefined
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined)

export function DoctorProvider({ children }: { children: ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>(doctorDataArray)

  const updateDoctorStatus = (doctorId: number, status: AvailabilityStatus) => {
    setDoctors(prev => prev.map(doctor => 
      doctor.id === doctorId 
        ? { ...doctor, availability_status: status }
        : doctor
    ))
  }

  const bookDoctor = (doctorId: number) => {
    updateDoctorStatus(doctorId, AvailabilityStatus.Booked)
  }

  const getDoctorById = (id: number) => {
    return doctors.find(doctor => doctor.id === id)
  }

  return (
    <DoctorContext.Provider value={{
      doctors,
      updateDoctorStatus,
      bookDoctor,
      getDoctorById
    }}>
      {children}
    </DoctorContext.Provider>
  )
}

export function useDoctors() {
  const context = useContext(DoctorContext)
  if (context === undefined) {
    throw new Error('useDoctors must be used within a DoctorProvider')
  }
  return context
}
