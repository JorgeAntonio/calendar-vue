import { onMounted, ref } from "vue";
import {
  deleteEvent,
  fetchEvents,
  storeEvent,
  updateEvent,
} from "../apis/events.js";

export default function useEvents() {
  const getEvents = ref([]);

  const setEvents = async (events) => {
    getEvents.value = await fetchEvents();
  };

  const createEvent = async (event) => {
    await storeEvent(event);
  };

  const updateEventById = async (event, id) => {
    await updateEvent(event, id);
  };

  const deleteEventById = async (id) => {
    await deleteEvent(id);
  };

  onMounted(setEvents);

  return {
    getEvents,
    setEvents,
    createEvent,
    updateEventById,
    deleteEventById,
  };
}
