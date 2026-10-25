'use strict'
let userNameEl=document.querySelector('.weekly-tracker span')
userNameEl.textContent ='Guest';

// start calendar

const weekRangeEl=document.querySelector('#week-range')
const weekDayEl=document.querySelector('#week-days')
const today=new Date();

const currentDay= today.getDay();
let difference;
if (currentDay === 0){
    difference = -6;
}else{
    difference = 1 - currentDay;
}

const monday=new Date(today);
monday.setDate(today.getDate() + difference);

const sunday=new Date(monday)
sunday.setDate(monday.getDate() + 6);

const dateFormat={
    day:'numeric',
    month:'short'
};

weekRangeEl.textContent= `${monday.toLocaleDateString('en-US',dateFormat)} - ${sunday.toLocaleDateString('en-US',dateFormat)}`;

const weekDays=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
weekDayEl.innerHTML='';

weekDays.forEach((day,index)=>{
    const date=new Date(monday);
    date.setDate(monday.getDate() + index);

    const dayEl=document.createElement('div');
    dayEl.classList.add('day-card');
    if(date.toDateString() === today.toDateString()){
        dayEl.classList.add('active');
        
    }

    dayEl.innerHTML= `<span class='day-name'>${day}</span>
                    <span class='day-number'>${date.getDate()}</span>`;

    weekDayEl.appendChild(dayEl);
});

const weeklyProgressEl=document.querySelector('.weekly-chart-progress')

//  end calendar

// show date in right panel
const dailyDateEl = document.querySelector('#daily-date');

const previousDayBtn = document.querySelector('#previous-day');
const nextDayBtn = document.querySelector('#next-day');

let selectedDate = new Date();

function updateDailyDate() {
    dailyDateEl.textContent = selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

updateDailyDate();


// start habit complete

const habitDayBtn =document.querySelectorAll('.habit-day')
const weeklyChartEl=document.querySelector('.weekly-chart')
const weeklyPercentage=document.querySelector('.weekly-progress')
    

habitDayBtn.forEach((button)=>{
    button.addEventListener('click',()=>{
        button.classList.toggle('habit-done')
        updateWeeklyProgress();
        
    })
    
})

// start update chart with habit done


function updateWeeklyProgress() {
    const allHabitBtns = document.querySelectorAll('.habit-day')
    const completedBtns = document.querySelectorAll('.habit-day.habit-done')

    const totalDays = allHabitBtns.length
    const completedDays = completedBtns.length

    const progress = totalDays === 0
        ? 0
        : (completedDays / totalDays) * 100

    weeklyProgressEl.style.width = `${progress}%`
    weeklyPercentage.textContent = `${Math.round(progress)}% completed`
}
// end update chart with habit done

// start add habit
const modalOverlayEl=document.querySelector('.modal-overlay')
const addHabitBtn = document.querySelector('.add-habit')
const addBtn=document.querySelector('.addBtn')
const cancelBtn=document.querySelector('.canceltBtn')
const habitName=document.querySelector('#add-habit-name')
const habitColor=document.querySelector('#habit-color')
const addWeeklyHabitsEl=document.querySelector('.weekly-habits')


addHabitBtn.addEventListener('click',()=>{
    modalOverlayEl.classList.remove('hidden')
})
cancelBtn.addEventListener('click',()=>{
    modalOverlayEl.classList.add('hidden')
})

let habits = JSON.parse(localStorage.getItem('habits')) || []

// Add days to older habits that don't have them
habits.forEach((habit) => {
    if (!habit.days) {
        habit.days = [false, false, false, false, false, false, false]
    }
})


localStorage.setItem('habits', JSON.stringify(habits))

function renderHabit(habit) {
    const addDivEl = document.createElement('div')
    const addHbitName = document.createElement('span')
    const addHabitDot = document.createElement('span')
    const addHabitDays = document.createElement('div')

    addDivEl.classList.add('habit-items')
    addWeeklyHabitsEl.appendChild(addDivEl)

    addHabitDot.classList.add('habit-dot')
    addHabitDot.style.backgroundColor = habit.color
    addDivEl.appendChild(addHabitDot)

    addDivEl.style.setProperty('--habit-color', habit.color)

    addHbitName.classList.add('habit-name')
    addHbitName.textContent = habit.name
    addDivEl.appendChild(addHbitName)

    addHabitDays.classList.add('habit-days')
    addDivEl.appendChild(addHabitDays)

    for (let i = 0; i < 7; i++) {
        const addHabitBtn = document.createElement('button')
        addHabitBtn.classList.add('habit-day')

        addHabitBtn.dataset.habitName = habit.name
        addHabitBtn.dataset.dayIndex = i

        if (habit.days[i]) {
            addHabitBtn.classList.add('habit-done')
        }

        addHabitDays.appendChild(addHabitBtn)
    }
}

// Display saved habits
habits.forEach((habit) => {
    renderHabit(habit)
})
updateWeeklyProgress()
renderDailyHabits()


function renderDailyHabits() {
    const dailyHabitsEl = document.querySelector('.daily-habits');

    dailyHabitsEl.innerHTML = '';

    const dayIndex = (selectedDate.getDay() + 6) % 7;

    habits.forEach((habit) => {
        const card = document.createElement('div');
        card.classList.add('daily-habit-card');

        const name = document.createElement('span');
        name.classList.add('daily-habit-name');
        name.textContent = habit.name;

        const colorBar = document.createElement('span');
        colorBar.classList.add('daily-habit-color');
        colorBar.style.backgroundColor = habit.color;

        const info = document.createElement('div');
        info.classList.add('daily-habit-info');

        info.append(colorBar, name);
        card.appendChild(info);

        const status = document.createElement('span');
        status.classList.add('daily-habit-status');

        status.textContent = habit.days[dayIndex]
            ? 'Completed'
            : 'Not completed';

        card.appendChild(status);
        dailyHabitsEl.appendChild(card);
    });
}


// Add a new habit
addBtn.addEventListener('click', () => {
    if (habitName.value.trim() !== '') {
        const newHabit = {
            name: habitName.value.trim(),
            color: habitColor.value,
            days: [false, false, false, false, false, false, false]
        }

        habits.push(newHabit)
        localStorage.setItem('habits', JSON.stringify(habits))

        renderHabit(newHabit)
        updateWeeklyProgress()
        renderDailyHabits();

        habitName.value = ''
        modalOverlayEl.classList.add('hidden')
    }
})


addWeeklyHabitsEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('habit-day')) {
        const habitName = e.target.dataset.habitName
        const dayIndex = Number(e.target.dataset.dayIndex)

        const habit = habits.find((item) => item.name === habitName)

        if (habit) {
            habit.days[dayIndex] = !habit.days[dayIndex]

            e.target.classList.toggle('habit-done', habit.days[dayIndex])

            localStorage.setItem('habits', JSON.stringify(habits))
            updateWeeklyProgress()
        }
    }
})