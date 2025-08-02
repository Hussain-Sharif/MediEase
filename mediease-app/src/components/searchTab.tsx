import { SearchIcon } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"


export const SearchTabs=(props)=>{
    const {searchCards,handleUserSearchInput}=props

    return(
        <div className="flex items-center min-w-xs md:min-w-md p-2
        rounded-full bg-linear-to-t from-cyan-600 via-cyan-500 to-cyan-300
         max-w-md border gap-1 focus-visible:ring-1">
            <SearchIcon className="ml-2 h-6 w-6" />
            <Input
            className="placeholder:text-white flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search...with any Key word" 
            type="search" 
            value={searchCards}
            onChange={
                 handleUserSearchInput
            }        
            /> 
        </div>
    )
}