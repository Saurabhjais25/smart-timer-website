let mode = "pomodoro";
let time = 25 * 60;
let timer = null;
let isBreak = false;

function updateDisplay(){
    let m = String(Math.floor(time/60)).padStart(2,'0');
    let s = String(time%60).padStart(2,'0');
    document.getElementById('display').textContent = 00:${m}:${s};
}

function setMode(m){
    resetTimer();
    mode = m;
    if(m === "pomodoro") time = 25*60;
    if(m === "countdown") time = 0;
    updateDisplay();
}

function startTimer(){
    if(timer) return;

    if(mode === "countdown" && time === 0){
        let mins = parseInt(document.getElementById('minutes').value);
        if(!isNaN(mins)) time = mins*60;
    }

    timer = setInterval(()=>{
        time--;
        if(time <= 0){
            document.getElementById('alarm').play();

            if(mode === "pomodoro"){
                isBreak = !isBreak;
                time = isBreak ? 5*60 : 25*60;
            } else {
                resetTimer();
            }
        }
        updateDisplay();
    },1000);
}

function pauseTimer(){
    clearInterval(timer);
    timer = null;
}

function resetTimer(){
    pauseTimer();
    time = (mode === "pomodoro") ? 25*60 : 0;
    updateDisplay();
}

function toggleDarkMode(){
    document.body.classList.toggle('dark');
}

updateDisplay();