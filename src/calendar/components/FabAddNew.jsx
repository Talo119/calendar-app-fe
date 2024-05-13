
import { useUiStore } from "../../hooks"
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { addHours } from "date-fns";

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const hanleClickNew = () =>{
        setActiveEvent({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours(new Date(), 2),
            user: {
            id: "123",
            name: "Carlos",
            },
        });
        openDateModal()
    }
  return (
    <button
        className="btn btn-primary fab"
        onClick={hanleClickNew}
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
