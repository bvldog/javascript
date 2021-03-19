const greetingForm = document.querySelector('.greetingInput'),
        greetingInput = greetingForm.querySelector('input'),
        greetingText = document.querySelector('h1');


const NAME = "name",
        SHOWING = "showing";


function resetHandler() {
        greetingText.classList.remove(SHOWING);
        localStorage.removeItem(NAME);
        setGreetings();
}


function setGreetings(){ 
        greetingForm.classList.add(SHOWING);
        greetingForm.addEventListener("submit", inputHandler);
        
}

function resetBtn() { 
        const resetBtn = document.createElement('button');
        resetBtn.innerText = "reset";
        greetingText.appendChild(resetBtn);
        resetBtn.addEventListener("click", resetHandler);
}

function showGreetings(text) {
        greetingText.classList.add(SHOWING);
        greetingText.innerText = `Hey! Perfect! ${text}`
        resetBtn();
}

function saveGreetingToLS(text) {
        localStorage.setItem(NAME, text)
}

function inputHandler(e) { 
        e.preventDefault()
        const currentInputValue = greetingInput.value;
        if (currentInputValue) {
        greetingText.innerText = `Hey! Perfect! ${currentInputValue}`
        greetingForm.classList.remove(SHOWING);
        greetingText.classList.add(SHOWING);
        resetBtn();
        saveGreetingToLS(currentInputValue);
        } else {
         console.log("input name plz");
        }

}

function loadGreeting() { 
        const loadedGreeting = localStorage.getItem(NAME);
        if(loadedGreeting === null ){ 
                setGreetings();
        } else { 
                showGreetings(loadedGreeting);
                console.log("have name");
        }

}


function init(){
        loadGreeting();
}



init();


