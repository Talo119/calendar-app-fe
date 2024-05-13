import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const hanleDelete = () => {
    startDeletingEvent();
  };
  return (
    <button
      className={'btn btn-danger fab-danger'}
      onClick={hanleDelete}
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
    >
      <i className="fas fa-trash"></i>
    </button>
  );
};
