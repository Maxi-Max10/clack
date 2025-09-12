/* login panel switch script adapted from provided example */
let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

let getButtons = (e) => e.preventDefault();

let changeForm = (e) => {
    if (!switchCtn) return;
    switchCtn.classList.add("is-gx");
    setTimeout(function(){
        switchCtn.classList.remove("is-gx");
    }, 1500);

    switchCtn.classList.toggle("is-txr");
    if (switchCircle[0]) switchCircle[0].classList.toggle("is-txr");
    if (switchCircle[1]) switchCircle[1].classList.toggle("is-txr");

    if (switchC1) switchC1.classList.toggle("is-hidden");
    if (switchC2) switchC2.classList.toggle("is-hidden");
    if (aContainer) aContainer.classList.toggle("is-txl");
    if (bContainer) bContainer.classList.toggle("is-txl");
    if (bContainer) bContainer.classList.toggle("is-z200");
}

let mainF = (e) => {
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons );
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm);
}

window.addEventListener("load", mainF);
