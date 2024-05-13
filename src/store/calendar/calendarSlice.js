import { createSlice } from "@reduxjs/toolkit";

// import { addHours } from "date-fns";
/* const tempEvent = {
  id: "123456",
  title: "Cumple Jefe",
  notes: "Hay que armarnos el pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    id: "123",
    name: "Carlos",
  },
}; */

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (e) => e.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onGetEvents: (state, { payload = [] }) => {
      // state.events = payload;
      payload.forEach(event => {
        const exists = state.events.some(dbEvent => dbEvent.id === payload.id);
        if (!exists) {
          state.events.push( event );
        }
      });
      state.isLoadingEvents = false;
    },
    onLogoutCalendar: ( state ) =>{
      state.isLoadingEvents = true;
      state.event = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onGetEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
