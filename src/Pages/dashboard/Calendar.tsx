import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@/styles/css/dashboard/calendar.css'
const Calendar = () => {
    return (
        <div className='calendar_content'>
            <FullCalendar
            plugins={[dayGridPlugin]}
            headerToolbar={{
                left: '',
                center: 'title',
                right: ''
            }}
            initialView="dayGridMonth"
        />
        </div>
    )
}
export default Calendar;