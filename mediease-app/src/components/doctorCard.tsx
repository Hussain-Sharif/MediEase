import { motion } from 'motion/react'
import { Card, CardContent, CardHeader } from './ui/card'
import { DoctorStatus } from './doctorStatus'
import { Badge } from './ui/badge'
import { ArrowRight, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'



const SuperBookingButton = ({ className }) => (
  <div className="flex items-center justify-center">
    <div
      className={cn(
        "group cursor-pointer border border-transparent bg-gradient-to-r from-cyan-800 via-cyan-700 to-cyan-600 shadow-md gap-2 h-[56px] flex items-center px-[18px] py-[10px] rounded-full transition hover:scale-[1.035] hover:shadow-xl",
        className
      )}
    >
      <div className="flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-white/10 ring-1 ring-cyan-300 transition group-hover:bg-cyan-700">
        <Globe className="mx-1 animate-spin text-cyan-200" />
        <p className="font-semibold tracking-tight text-white">Book Now</p>
      </div>
      <div className="ml-2 flex items-center justify-center rounded-full border-2 border-cyan-700 transition group-hover:bg-cyan-800 bg-white/20">
        <ArrowRight
          size={20}
          className="text-cyan-200 group-hover:-rotate-45 transition duration-300"
        />
      </div>
    </div>
  </div>
)

export const DoctorCard = ({ doctor }) => {
  const profileImageAlter =
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'

  return (
    <motion.div
      className="min-w-78 max-w-full"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="bg-gradient-to-b from-white via-cyan-50 to-cyan-100 border-2 border-cyan-100 shadow-lg rounded-2xl flex flex-col items-center">
        <CardHeader className="flex justify-center items-center mt-2 mb-3">
          <figure className="w-[90px] h-[90px] md:w-[150px] md:h-[150px] opacity-80 overflow-hidden rounded-[1000px] border-[3px] border-solid border-cyan-600 aspect-[1/1] flex-none relative">
            <img
              className="transition duration-300 absolute top-0 inset-0 rounded-inherit object-cover z-50"
              src={profileImageAlter}
              alt={doctor.name}
            />
          </figure>
        </CardHeader>
        <CardContent className="w-full px-4 pb-6 space-y-3">
          <div className="flex justify-between items-center w-full gap-4">
            <h2 className="text-xl md:text-[1.35rem] font-extrabold text-cyan-900">{doctor.name}</h2>
            <DoctorStatus currentStatus={doctor.availability_status} />
          </div>
          <p className="text-md text-gray-600 truncate">
            {doctor.description.slice(0, 30)}... <span className="text-cyan-600 hover:underline cursor-pointer">more</span>
          </p>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex flex-wrap gap-2">
              {doctor.specialization.map((each) => (
                <Badge
                  className="bg-cyan-800/90 ring-2 ring-cyan-200 text-white text-xs font-semibold shadow"
                  key={each}
                >
                  {each}
                </Badge>
              ))}
            </div>
            <SuperBookingButton className="mt-3" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
