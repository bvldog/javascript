const currentTime = document.querySelector('.currentTime');

function setTime() {
        const date = new Date(); 
        const hours = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        currentTime.innerText = `${hours < 10 ? `0${hours}`: hours}:${min < 10 ? `0${min}`:min}:${sec < 10 ? `0${sec}`:sec}`
}

function init(){
        setTime();
        setInterval(setTime, 1000); 
} 
init();
