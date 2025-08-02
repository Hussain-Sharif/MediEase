"use client"
import { AvailabilityStatus, DoctorAvailabilityStatus } from "@/utils/types"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { SparklesIcon, Stethoscope } from "lucide-react"



export const DoctorStatus = (props) => {
    const {currentStatus,className}=props
    const [statusColor, setStatusColor]=useState<string>('bg-green-500')

    const decideStatusColor=()=>{
        switch (currentStatus) {
            case AvailabilityStatus.Available:
                setStatusColor('bg-green-500')
                break;
            case AvailabilityStatus.Busy:
                setStatusColor('bg-red-500')
                break;
            case AvailabilityStatus.Booked:
                setStatusColor('bg-blue-500')
                break;
            case AvailabilityStatus.OnLeave:
                setStatusColor('bg-yellow-500')
                break;
            default:
                break;
        }
    }

    useEffect(()=>{
        decideStatusColor()
    })

    return (
        
            <Badge
            variant={'default'}
            className={`mb-3 ${statusColor} rounded-[14px] border-1 border-gray-600/10 text-white text-sm md:left-6 ${className}`}
            >
            <Stethoscope size={20} className=" mr-1  text-gray-100 " />
                {currentStatus}
            </Badge>
        
    )
}