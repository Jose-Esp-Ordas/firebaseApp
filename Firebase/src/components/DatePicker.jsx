import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"

const DatePicker = ({ date, setDate, hour, setHour }) => {
  const [open, setOpen] = useState(false)
      
  return (
    <>
    <div className="flex flex-col gap-3">
       <FieldLabel htmlFor="feedback" className=" text-white">Fecha:</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              data-empty={!date}
              className="data-[empty=true]:text-muted-foreground w-[200px] font-normal h-[7vh] border-white border rounded-4xl"
            >
              <CalendarIcon />
              {date ? format(date, "PPP", { locale: es }) : <span>Elige una fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0  translate-y-1/2" align="start" side="bottom" sideOffset={8}>
            <Calendar mode="single" selected={date} onSelect={(selectedDate) => { setDate(selectedDate); setOpen(false); }} locale={es} />
          </PopoverContent>
        </Popover>
    </div>
     <div className="flex flex-col gap-3">
       <FieldLabel htmlFor="feedback" className=" text-white">Hora:</FieldLabel>
        <Input
        className="w-32 bg-black text-white h-[7vh]"
          type="time"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          step="1"
          defaultValue="10:30:00"
        />
      </div>
    </>
  )
}

export default DatePicker