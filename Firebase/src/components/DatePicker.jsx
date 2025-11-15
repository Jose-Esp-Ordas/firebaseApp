import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DatePicker = ({ date, setDate }) => {
      
  return (
    <>
     <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={(date) => setDate(date)} />
      </PopoverContent>
    </Popover>
     <div className="flex flex-col gap-3">
        <Input
        className="w-32 mt-2 bg-black text-gray-700"
          type="time"
          id="time-picker"
          step="1"
          defaultValue="10:30:00"
        />
      </div>
    </>
  )
}

export default DatePicker