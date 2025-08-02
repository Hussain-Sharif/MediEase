"use client"

import { useParams, useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Doctor, AvailabilityStatus } from '@/utils/types'
import { DoctorStatus } from '@/components/doctorStatus'
import { Header } from '@/components/header'
import { useDoctors } from '@/context/DoctorContext'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function DoctorDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Form state - including date and time
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [appointmentDate, setAppointmentDate] = useState<string>("")
  const [appointmentTime, setAppointmentTime] = useState<string>("")
  
  // Form validation state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: ""
  })
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Using context 
  const { getDoctorById, bookDoctor } = useDoctors()
  const doctor = getDoctorById(parseInt(params.id as string))

  useEffect(() => {
    setIsLoading(false)
  }, [])

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = (): string => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Get available time slots (you can customize this)
  const getAvailableTimeSlots = (): string[] => {
    return [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
      "16:00", "16:30", "17:00", "17:30", "18:00"
    ]
  }

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) return "Name is required"
    if (name.trim().length < 2) return "Name must be at least 2 characters"
    return ""
  }

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required"
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return ""
  }

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return "Phone number is required"
    const phoneRegex = /^[\+]?[0-9]{10,15}$/
    if (!phoneRegex.test(phone.replace(/\s|-/g, ''))) {
      return "Please enter a valid phone number (10-15 digits)"
    }
    return ""
  }

  const validateDate = (date: string): string => {
    if (!date) return "Appointment date is required"
    
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to compare only dates
    
    if (selectedDate < today) {
      return "Appointment date cannot be in the past"
    }
    
    // Optional: Limit to next 30 days
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    if (selectedDate > maxDate) {
      return "Please select a date within the next 30 days"
    }
    
    return ""
  }

  const validateTime = (time: string): string => {
    if (!time) return "Appointment time is required"
    
    const availableSlots = getAvailableTimeSlots()
    if (!availableSlots.includes(time)) {
      return "Please select a valid time slot"
    }
    
    // If appointment is today, check if time is not in the past
    if (appointmentDate === getTodayDate()) {
      const now = new Date()
      const [hours, minutes] = time.split(':').map(Number)
      const selectedTime = new Date()
      selectedTime.setHours(hours, minutes, 0, 0)
      
      if (selectedTime < now) {
        return "Selected time has already passed today"
      }
    }
    
    return ""
  }

  // Real-time validation on input change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    setErrors(prev => ({ ...prev, name: validateName(value) }))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setErrors(prev => ({ ...prev, email: validateEmail(value) }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(value)
    setErrors(prev => ({ ...prev, phone: validatePhone(value) }))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAppointmentDate(value)
    setErrors(prev => ({ ...prev, appointmentDate: validateDate(value) }))
    
    // Reset time if date changes (time validation depends on date)
    if (appointmentTime) {
      setErrors(prev => ({ ...prev, appointmentTime: validateTime(appointmentTime) }))
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setAppointmentTime(value)
    setErrors(prev => ({ ...prev, appointmentTime: validateTime(value) }))
  }

  // Form validation check
  const isFormValid = (): boolean => {
    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const phoneError = validatePhone(phone)
    const dateError = validateDate(appointmentDate)
    const timeError = validateTime(appointmentTime)
    
    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      appointmentDate: dateError,
      appointmentTime: timeError
    })
    
    return !nameError && !emailError && !phoneError && !dateError && !timeError
  }

  // Reset form
  const resetForm = () => {
    setName("")
    setEmail("")
    setPhone("")
    setAppointmentDate("")
    setAppointmentTime("")
    setErrors({ 
      name: "", 
      email: "", 
      phone: "", 
      appointmentDate: "", 
      appointmentTime: "" 
    })
  }

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid()) {
      toast.error("Please fix the form errors before submitting")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // You can access all form data here:
      const appointmentData = {
        patientName: name,
        patientEmail: email,
        patientPhone: phone,
        appointmentDate,
        appointmentTime,
        doctorId: doctor!.id,
        doctorName: doctor!.name
      }
      
      console.log("Booking data:", appointmentData)
      
      // Book the doctor using context
      bookDoctor(doctor!.id)
      
      // Success feedback with appointment details
      toast.success(
        `Appointment booked with ${doctor!.name} on ${appointmentDate} at ${appointmentTime}!`, 
        {
          duration: 4000,
          icon: '🎉'
        }
      )
      
      // Close dialog and reset form
      setIsDialogOpen(false)
      resetForm()
      
      // Redirect after success
      setTimeout(() => {
        router.push('/')
      }, 2000)
      
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading and error states remain the same...
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-800"></div>
          <p className="mt-4 text-gray-600">Loading doctor details...</p>
        </div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center mt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
            <Button onClick={() => router.push('/')} className="bg-cyan-800 hover:bg-cyan-700">
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Button>
          </div>
        </div>
      </>
    )
  }

  const profileImageAlter = doctor.profile_image || 
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'

  return (
    <>
      <Header />
      <Toaster position='top-right' />
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white mt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button 
            onClick={() => router.back()} 
            variant="outline" 
            className="mb-6 border-cyan-200 hover:bg-cyan-50"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header Section - remains the same */}
            <div className="bg-gradient-to-r from-cyan-800 via-cyan-700 to-cyan-600 text-white p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <figure className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={profileImageAlter}
                    alt={doctor.name}
                  />
                </figure>
                
                <div className="text-center md:text-left flex-1">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{doctor.name}</h1>
                    <DoctorStatus currentStatus={doctor.availability_status} />
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    {doctor.specialization.map((spec) => (
                      <Badge
                        key={spec}
                        className="bg-white/20 ring-2 ring-white/30 text-white font-semibold"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* About Section - remains the same */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About Dr. {doctor.name.split(' ')[1]}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {doctor.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptatibus deleniti 
                    omnis excepturi consequuntur. Eaque nostrum repellendus minima ea, ex illum eius 
                    cupiditate, doloremque doloribus facilis nam. Cumque, enim nam! Sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>

                {/* Booking Section */}
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Book an Appointment</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-cyan-600" size={20} />
                      <span className="text-gray-600">Available Mon-Fri, 9 AM - 6 PM</span>
                    </div>
                    
                    <div className="pt-4">
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            disabled={doctor.availability_status !== AvailabilityStatus.Available}
                            className="w-full bg-gradient-to-r from-cyan-800 via-cyan-700 to-cyan-600 hover:from-cyan-700 hover:via-cyan-600 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-lg font-semibold shadow-lg"
                          >
                            {doctor.availability_status === AvailabilityStatus.Available 
                              ? 'Book Appointment' 
                              : `Doctor is ${doctor.availability_status}`
                            }
                          </Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                          <form onSubmit={handleFormSubmit}>
                            <DialogHeader>
                              <DialogTitle>Book Your Appointment</DialogTitle>
                              <DialogDescription>
                                Schedule your appointment with Dr. {doctor.name.split(' ')[1]}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="grid gap-4 py-4">
                              {/* Name Field */}
                              <div className="grid gap-2">
                                <Label htmlFor="name">Patient Name *</Label>
                                <Input
                                  id="name"
                                  type="text"
                                  placeholder="Enter your full name"
                                  value={name}
                                  onChange={handleNameChange}
                                  className={errors.name ? "border-red-500 focus:border-red-500" : ""}
                                />
                                {errors.name && (
                                  <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                              </div>

                              {/* Email Field */}
                              <div className="grid gap-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="example@gmail.com"
                                  value={email}
                                  onChange={handleEmailChange}
                                  className={errors.email ? "border-red-500 focus:border-red-500" : ""}
                                />
                                {errors.email && (
                                  <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                              </div>

                              {/* Phone Field */}
                              <div className="grid gap-2">
                                <Label htmlFor="phone">Mobile Number *</Label>
                                <Input
                                  id="phone"
                                  type="tel"
                                  placeholder="+1234567890"
                                  value={phone}
                                  onChange={handlePhoneChange}
                                  className={errors.phone ? "border-red-500 focus:border-red-500" : ""}
                                />
                                {errors.phone && (
                                  <p className="text-sm text-red-500">{errors.phone}</p>
                                )}
                              </div>

                              {/* Date & Time Row */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Date Field */}
                                <div className="grid gap-2">
                                  <Label htmlFor="date" className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    Appointment Date *
                                  </Label>
                                  <Input
                                    id="date"
                                    type="date"
                                    min={getTodayDate()}
                                    value={appointmentDate}
                                    onChange={handleDateChange}
                                    className={errors.appointmentDate ? "border-red-500 focus:border-red-500" : ""}
                                  />
                                  {errors.appointmentDate && (
                                    <p className="text-sm text-red-500">{errors.appointmentDate}</p>
                                  )}
                                </div>

                                {/* Time Field */}
                                <div className="grid gap-2">
                                  <Label htmlFor="time" className="flex items-center gap-2">
                                    <Clock size={16} />
                                    Appointment Time *
                                  </Label>
                                  <select
                                    id="time"
                                    value={appointmentTime}
                                    onChange={handleTimeChange}
                                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                                      errors.appointmentTime ? "border-red-500 focus:border-red-500" : ""
                                    }`}
                                  >
                                    <option value="">Select time</option>
                                    {getAvailableTimeSlots().map((timeSlot) => (
                                      <option key={timeSlot} value={timeSlot}>
                                        {timeSlot}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.appointmentTime && (
                                    <p className="text-sm text-red-500">{errors.appointmentTime}</p>
                                  )}
                                </div>
                              </div>

                              {/* Appointment Summary */}
                              {appointmentDate && appointmentTime && (
                                <div className="mt-4 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                                  <h4 className="font-semibold text-cyan-900 mb-2">Appointment Summary</h4>
                                  <div className="text-sm text-cyan-700 space-y-1">
                                    <p><strong>Doctor:</strong> {doctor.name}</p>
                                    <p><strong>Date:</strong> {new Date(appointmentDate).toLocaleDateString('en-US', { 
                                      weekday: 'long', 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}</p>
                                    <p><strong>Time:</strong> {appointmentTime}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline" onClick={resetForm}>
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="bg-cyan-600 hover:bg-cyan-700"
                              >
                                {isSubmitting ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Booking...
                                  </>
                                ) : (
                                  'Confirm Booking'
                                )}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Status Messages */}
                    {doctor.availability_status === AvailabilityStatus.Booked ? (
                      <p className="text-sm text-cyan-600 text-center">
                        This doctor is booked by your appointment.
                      </p>
                    ) : (
                      doctor.availability_status !== AvailabilityStatus.Available ? (
                        <p className="text-sm text-red-600 text-center">
                          This doctor is currently not available for booking.
                        </p>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
