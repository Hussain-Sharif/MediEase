
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { DoctorSpecialization, Specialization } from "@/utils/types"
import { allSpecializations } from "@/utils/contants"
import { FilterIcon } from "lucide-react"
import { Badge } from "./ui/badge"



export const SpecializedTabs=(props)=>{
    const {selectedSpec,handleSpecChange}=props
    return(
        <Popover>
            <PopoverTrigger asChild >
                <Button variant="outline" className="w-[300px] border-cyan-300 border-2 justify-start text-wrap  h-auto text-zinc-500">
                <FilterIcon className="mr-2 " />
                {selectedSpec.length > 0
                    ? <>
                    <div className="flex flex-wrap items-center gap-2">
                        {
                            selectedSpec.map((eachSpec) => <Badge className=" rounded-md bg-cyan-400" key={eachSpec.id}>
                        {eachSpec.name}
                    </Badge>)
                        }
                    </div>
                    </>
                    : <div>
                        
                        <span>Fliter by Specialization of the doctor</span>
                    </div>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full border-2 border-cyan-300  overflow-y-auto">
                <div className="p-4 space-y-2">
                {allSpecializations.map((eachSpec) => (
                    <div key={eachSpec.id} className="flex items-center space-x-2">
                    <Checkbox
                        id={`${eachSpec.id}`}
                        checked={selectedSpec.some((eachSelectedSpec) => eachSelectedSpec.id === eachSpec.id)}
                        onCheckedChange={() => handleSpecChange(eachSpec)}
                    />
                    <Label htmlFor={`${eachSpec.id}`}>{eachSpec.name}</Label>
                    </div>
                ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}