
const playerRecord = document.querySelector(".name");
const message = document.querySelector('.mensagem__motivacional');
const record = document.querySelector(".timeRecord");
const button = document.querySelector(".again");
const table = document.querySelector(".score");

const characters = [
    'parona',
    'fushi',
    'march',
    'gugu',
    'mia',
    'tonari',
    'cavalo',
    'bonchen',
    'lobo',
    'eko',
    'rean',
    'alma',
];

const loadGame = () => {
    const grid = document.querySelector(".grid")

    const duplicateCharacters = [...characters, ...characters];
    const suffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

    suffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

/* CRIAR AS CARTAS */

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element;

}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../images/${character}.jpg)`;

    card.addEventListener("click", revealCard);
    card.setAttribute('data-character', character);

    card.appendChild(front);
    card.appendChild(back);



    return card;
}

/* GIRO A CARTA */
let firstCard = '';
let secondCard = '';

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes("reveal-card")) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCard()
    }

}

/* VERIFICAR SE SÃO IGUAIS */

const checkCard = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');


    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame()

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = '';
            secondCard = '';

        }, 500);
    }

}

/* JOGO ACABOU? */

const checkEndGame = () => {
    const disabledCard = document.querySelectorAll('.disabled-card');

    if (disabledCard.length === 2) {
        newRecord()
    }
}

/* CRONOMETRO */

let currentTime;

const startTimer = () => {
    const timer = document.querySelector(".timer");


    this.loop = setInterval(() => {
        currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

/* RECORDES */

let timeRecord;

const newRecord = () => {
    clearInterval(this.loop);
    document.body.style.overflow = "hidden";

    let newTimeRecord = localStorage.getItem('timeRecord');

    if (newTimeRecord === null) {
        localStorage.setItem('timeRecord', currentTime);
        message.innerHTML = 'Primeiro recorde feito!'
        button.textContent = "Tentar novamente"

    }

    else if (currentTime < newTimeRecord && newTimeRecord != null) {
        localStorage.clear()
        localStorage.setItem('timeRecord', currentTime);

        message.innerHTML = 'Recorde novo. Parabéns!'
        button.textContent = "Que tal um novo?"


    } else {
        message.innerHTML = 'Foi quase!!! Tente novamente'

    }


    table.classList.remove('none');
    button.addEventListener('click', reload = () => { location.reload() });
    playerRecord.innerHTML = localStorage.getItem('name');
    record.innerHTML = `${localStorage.getItem('timeRecord')}s`;
}


window.onload = () => {

    const spanPlayer = document.querySelector('.player');
    spanPlayer.innerHTML = localStorage.getItem('name');

    loadGame()
    startTimer()
}







