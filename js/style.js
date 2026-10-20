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
let dayComplete;
let allDays=7;

function progressPerWeek(){
    let progress=(dayComplete / allDays) * 100;
    weeklyProgressEl.style.width=`${progress}%`;
}

progressPerWeek();



//  end calendar

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


function updateWeeklyProgress(){
    const habitCompleteBtns=document.querySelectorAll('.habit-day.habit-done')
    let avgDayComplete;

    avgDayComplete=(habitCompleteBtns.length / 21) * 100;
    weeklyProgressEl.style.width = `${avgDayComplete}%`;
    weeklyPercentage.innerHTML=`${Math.round(avgDayComplete)}% completed`

}
updateWeeklyProgress();
// end update chart with habit done

// start add habit
const modalOverlayEl=document.querySelector('.modal-overlay')
const addHabitBtn = document.querySelector('.add-habit')
const addBtn=document.querySelector('.addBtn')
const cancelBtn=document.querySelector('.canceltBtn')
const habitName=document.querySelector('#add-habit-name')
const habitColor=document.querySelector('#habit-color')



addHabitBtn.addEventListener('click',()=>{
    modalOverlayEl.classList.remove('hidden')
})
cancelBtn.addEventListener('click',()=>{
    modalOverlayEl.classList.add('hidden')
})

addBtn.addEventListener('click',()=>{
    if(habitName.value.trim()!==''){

    }
})
