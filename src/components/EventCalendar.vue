<script setup>
import { reactive, ref, watch } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

// import bootstrap5Plugin from '@fullcalendar/bootstrap5';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

const id = ref(0)
const numEvents = ref(1)

const options = reactive({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    initialView: 'dayGridMonth',
    // themeSystem: 'bootstrap5',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    editable: true,
    selectable: true,
    weekends: true,
    select: (info) => {
        id.value = id.value + 1

        const cal = info.view.calendar
        cal.unselect()
        cal.addEvent({
            id: id.value,
            title: `Materia ${id.value}`,
            start: info.start,
            end: info.end,
            allDay: false,
        })
    },
    eventClick: (info) => {
        if (info.event) {
            info.event.remove()
        }
    },
    events: [],
})

const generateRandomSchedule = () => {
    const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const startTime = 7 // Start time in hours (9 AM)
    const endTime = 22 // End time in hours (5 PM)

    options.events = [] // Clear existing events

    for (let i = 0; i < numEvents.value; i++) {
        const randomDay = daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)]
        const startHour = Math.floor(Math.random() * (endTime - startTime - 1)) + startTime // Minimum duration of 2 hours
        const endHour = startHour + 2 // Duration of 2 hours

        const startDate = new Date()
        startDate.setHours(startHour)
        startDate.setMinutes(0)
        startDate.setDate(startDate.getDate() + daysOfWeek.indexOf(randomDay))

        const endDate = new Date(startDate)
        endDate.setHours(endHour)

        id.value = id.value + 1
        options.events.push({
            id: id.value,
            title: `Materia ${id.value}`,
            start: startDate,
            end: endDate,
            allDay: false,
        })
    }
}

watch(options.events, () => {
    // You can add additional logic here to handle changes in events
})

generateRandomSchedule()
</script>

<template>
    <div>
        <div class="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex flex-col items-center justify-center">
            <div class="flex items-center gap-4 py-3">
                <img src="/public/logo_fisi.png" alt="" class="h-36">
                <h1 class="text-5xl font-bold text-white">FISI - UNAP</h1>
                <img src="https://enlinea.unapiquitos.edu.pe/images/escudo.png" alt="" class="h-36">
            </div>

            <h1 class="text-4xl font-bold text-white mb-6 uppercase">Generador de horarios</h1>
            <a href="#calendar"
                class="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded uppercase transition-all duration-300 ease-in-out">
                Probar
            </a>
            <div class="flex items-center gap-4 pt-3">
                <ul class="flex flex-wrap items-center mt-3 gap-3 text-sm font-medium sm:mt-0">
                    <li>
                        <router-link to="" class="hover:underline">Acerca de</router-link>
                    </li>
                    <li>
                        <router-link href="#" class="hover:underline">Contactar</router-link>
                    </li>
                </ul>
            </div>
        </div>

        <div class="p-4" id="calendar">
            <label for="" class="font-medium text-lg">Materias a generar:</label>
            <div class="flex justify-start items-center gap-3 py-3">
                <input v-model="numEvents" type="number" min="1" class="border rounded-md px-4 py-2 font-medium bg-gray-200"
                    placeholder="">
                <button @click="generateRandomSchedule" type="button"
                    class="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900">
                    Generar
                </button>
            </div>
            <FullCalendar v-bind:options="options" />
        </div>
    </div>
</template>
  
  
  
  


<style scoped></style>
