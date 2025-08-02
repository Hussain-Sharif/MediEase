import { motion } from 'motion/react'
import { Card, CardContent, CardHeader } from './ui/card'
import { DoctorStatus } from './doctorStatus'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ArrowRight, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Doctor } from '@/utils/types'

export const DoctorCard = (props:{doctor:Doctor|undefined}) => {
  const { doctor } = props
  const profileImageAlter = doctor?.profile_image ||
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'

  return (
    <motion.div
      className="min-w-72 max-w-full"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="m-0 bg-gradient-to-b from-white via-cyan-50 to-cyan-100 border-2 border-cyan-100 shadow-lg rounded-2xl flex flex-col gap-0 items-center hover:shadow-xl transition-shadow duration-300">
        <DoctorStatus className="self-end mr-2" currentStatus={doctor?.availability_status} />
        <CardHeader className="flex justify-center items-center mb-3">
          <figure className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] overflow-hidden rounded-[1000px] border-[3px] border-solid border-cyan-600  flex-none relative">
            <img
              className=" w-full h-full  object-cover z-10"
              src={profileImageAlter}
              alt={doctor?.name}
            />
          </figure>
          {/* <figure className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <img
                    className="w-full h-full object-cover z-20"
                    src={profileImageAlter}
                    alt={doctor.name}
                  />
                </figure> */}
        </CardHeader>
        <CardContent className="w-full px-4 pb-6 pt-0 space-y-3">
          <div className="flex flex-col justify-between items-center w-full gap-2 space-y-2">
            <h2 className="text-xl md:text-[1.35rem] font-extrabold self-start text-cyan-900 truncate">{doctor?.name}</h2>
          </div>
          <p className="text-md text-gray-600 truncate">
            {doctor?.description.slice(0, 30)}...
          </p>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex flex-wrap gap-2">
              {doctor?.specialization.map((each) => (
                <Badge
                  className="bg-cyan-800/90 ring-2 ring-cyan-200 text-white text-xs font-semibold shadow"
                  key={each}
                >
                  {each}
                </Badge>
              ))}
            </div>
            
            {/*  Navigation Button for details of Corresponding Doctor */}
            <Link href={`/doctor/${doctor?.id}`} className="mt-3 ">
              
                <Button
                className={cn(
                  "w-full group cursor-pointer border border-transparent bg-gradient-to-r from-cyan-800 via-cyan-700 to-cyan-600 shadow-md gap-2 h-[56px] flex items-center px-[18px] py-[10px] rounded-full transition hover:scale-[1.035] hover:shadow-xl"
                )}
              >
                <div className="flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-white/10 ring-1 ring-cyan-300 transition group-hover:bg-cyan-700">
                  <Eye className="mx-1 text-cyan-200" />
                  <p className="font-semibold tracking-tight text-white">View Details</p>
                </div>
                <div className="ml-2 flex items-center justify-center rounded-full border-2 border-cyan-700 transition group-hover:bg-cyan-800 bg-white/20">
                  <ArrowRight
                    size={20}
                    className="text-cyan-200 group-hover:-rotate-45 transition duration-300"
                  />
                </div>
              </Button>
           
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
