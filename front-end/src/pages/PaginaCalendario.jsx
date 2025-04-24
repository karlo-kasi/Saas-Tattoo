import Calendar from "../components/Calendar/Calendar";

export default function PaginaCalendario(){
  return(
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Calendario</h1>
      <Calendar />
    </div>
  )
}