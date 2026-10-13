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

