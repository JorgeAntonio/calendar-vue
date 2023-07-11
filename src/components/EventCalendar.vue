<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import Footer from '../components/Footer.vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const id = ref(0)
const numEvents = ref(1)

const options = reactive({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
        left: 'title',
        center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        right: 'today prev,next'
    },
    footerToolbar: {
        left: 'prevYear,nextYear',
        center: '',
        right: ''
    },
    buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        list: 'Lista',
        prevYear: 'Año anterior',
        nextYear: 'Siguiente año'
    },
    titleFormat: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    },
    dayHeaderFormat: {
        weekday: 'long',
        day: 'numeric',
        omitCommas: true,
    },
    dayHeaderContent: (args) => {
        return args.date.toLocaleDateString('es', {
            weekday: 'long',
            day: 'numeric',
            omitCommas: true,
        })
    },
    editable: true,
    selectable: true,
    weekends: true,
    allDaySlot: false,
    slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short',
        hour12: false,
    },

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
    const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const startTime = 6 // Start time in hours (9 AM)
    const endTime = 23 // End time in hours (5 PM)

    options.events = [] // Clear existing events

    for (let i = 0; i < numEvents.value; i++) {
        const randomDay = daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)]
        const startHour = Math.floor(Math.random() * (endTime - startTime)) + startTime
        const endHour = startHour + 2 // Minimum duration of 2 hours

        const currentDate = options.initialDate || new Date()
        const currentDayOfWeek = daysOfWeek[currentDate.getDay()]

        let daysToAdd = daysOfWeek.indexOf(randomDay) - daysOfWeek.indexOf(currentDayOfWeek)
        if (options.initialView === 'timeGridWeek') {
            daysToAdd += 7 // Add a week if the initial view is weekly
        }

        const startDate = new Date(currentDate.getTime())
        startDate.setHours(startHour)
        startDate.setMinutes(0)
        startDate.setDate(startDate.getDate() + daysToAdd)

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

onMounted(() => {
    // Set the current day as the initial date
    options.initialDate = new Date()
})

generateRandomSchedule()
</script>

<template>
    <div class="">
        <div class="bg-gradient-to-r from-blue-900 to-green-600 h-1/2">
            <div class=" flex items-center justify-between mx-4 py-5">
                <div class="flex flex-col gap-4">
                    <h1 class="text-4xl font-bold text-white">FISI - UNAP</h1>
                    <h1 class="text-5xl font-bold text-white mb-6 uppercase">Generador de horario</h1>
                    <label class="font-medium text-lg text-white">Cantidad de Materias</label>
                    <div class="flex justify-start items-center gap-3">
                        <input v-model="numEvents" type="number" min="1"
                            class="rounded-md text-lg px-4 border-none py-2 font-medium bg-gray-200 leading-6"
                            placeholder="">
                        <button @click="generateRandomSchedule" type="button"
                            class="bg-gray-950 text-lg text-white px-4 py-2 rounded-md leading-6 hover:bg-gray-800">
                            Generar
                        </button>
                    </div>
                </div>
                <div class="flex justify-center items-center gap-6">
                    <img src="/public/logo_fisi.png" alt="" class="h-48">
                    <img src="/public/unap.png" alt="" class="h-48">
                </div>
            </div>


        </div>

        <div class="mx-4 py-5">
            <FullCalendar v-bind:options="options" @viewSkeletonRendered="scrollToCalendar" />
        </div>
        <Footer />
    </div>
</template>

<script>
const scrollToCalendar = () => {
    const calendarElement = document.getElementById('calendar')
    if (calendarElement) {
        calendarElement.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<style scoped></style>
