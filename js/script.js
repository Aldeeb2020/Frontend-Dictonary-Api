const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById('result');
const sound = document.getElementById('sound');
const input = document.getElementById('inp-word');
const searchBtn = document.getElementById('search-btn');

function loadWord(word){
    fetch(`${url}${word}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
        <h3>${data[0].word}</h3>
        <button onclick="playSound()">
            <img src='images/volume.svg' />
        </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[1].partOfSpeech}</p>
            <p>${data[0].phonetic}</p>
        </div>
        <p class="word-meaning">
        ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""}
        </p>
         `;
         sound.setAttribute("src", `${data[0].phonetics[0].audio}`)
    }
    )
    .catch(() => {
        result.innerHTML = '<h3 class="error">Could`t Find The Word</h3>'
    })
}
searchBtn.addEventListener('click', function(){
    const inputValue = input.value;
    loadWord(inputValue);
})
function playSound(){
    sound.play();
}