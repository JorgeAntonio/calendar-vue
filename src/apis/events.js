const baseURL = "http://localhost:3000/api/calendar";

export const fetchEvents = async () => {
  const response = await fetch(`${baseURL}/all`);
  return await response.json();
};

export const storeEvent = async (event) => {
  const response = await fetch(`${baseURL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return await response.json();
};

export const updateEvent = async (event) => {
  const response = await fetch(`${baseURL}/update/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return await response.json();
};

export const deleteEvent = async (id) => {
  const response = await fetch(`${baseURL}/delete/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};
