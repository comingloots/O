let lang = "hindi";
let subject = "maths";
let showCount = 10;
let searchText = "";

/* SOUNDS */

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

/* CONTROLS */

document.getElementById("language").onchange = e=>{
lang = e.target.value;
render();
};

document.getElementById("subject").onchange = e=>{
subject = e.target.value;
showCount = 10;
render();
};

document.getElementById("search").oninput = e=>{
searchText = e.target.value.toLowerCase();
render();
};

document.getElementById("moreBtn").onclick = ()=>{
showCount += 10;
render();
};

/* QUESTION LIST */

function render(){

let list = (questionsData && questionsData[subject]) ? questionsData[subject] : [];

if(searchText){
list = list.filter(q =>
(q[lang] || "").toLowerCase().includes(searchText)
);
}

let html = "";

list.slice(0,showCount).forEach(q=>{

html += `
<div class="q">
<p>${q[lang] || q.hindi || q.english || ""}</p>

<button onclick="toggle(this)">Show Answer</button>

<div class="answer">
<span class="ansText">${q.answer}</span>
<br>
<button onclick="translateAns(this)">🌐 Hindi</button>
</div>

</div>
`;

});

document.getElementById("questions").innerHTML = html;

}

function toggle(btn){

let ans = btn.nextElementSibling;

if(ans.style.display==="block"){
ans.style.display="none";
btn.innerText="Show Answer";
}else{
ans.style.display="block";
btn.innerText="Hide Answer";
}

}

render();

/* QUIZ SYSTEM */

let quizList = [];
let quizIndex = 0;
let score = 0;

function startQuiz(){

quizList = [...questionsData[subject]]
.sort(()=>0.5 - Math.random())
.slice(0,25);

quizIndex = 0;
score = 0;

showQuiz();

}

/* RANDOM OPTIONS */

function generateOptions(correct){

let options = new Set();
options.add(correct);

let pool = questionsData[subject] || [];
let attempts = 0;

while(options.size < 4 && attempts < 50){

let random = pool[Math.floor(Math.random()*pool.length)].answer;

if(random) options.add(random);

attempts++;

}

return Array.from(options).sort(()=>Math.random()-0.5);

}

/* SHOW QUIZ */

function showQuiz(){

if(quizIndex >= quizList.length){
finishQuiz();
return;
}

let q = quizList[quizIndex];

let questionText = q[lang] || q.hindi || q.english;

let options = generateOptions(q.answer);

let html = `
<div class="q">

<p><b>Question ${quizIndex+1}/25</b></p>

<p id="qText">${questionText}</p>
<button onclick="translateQuestion()">🌐 Hindi</button>
`;

options.forEach(opt=>{
html += `<button class="option" onclick="selectAnswer('${opt}')">${opt}</button>`;
});

html += `</div>`;

document.getElementById("questions").innerHTML = html;

}

/* ANSWER CHECK */

function selectAnswer(ans){

let correct = quizList[quizIndex].answer;

if(ans === correct){

score++;
correctSound.play();
alert("Correct ✅");

}else{

wrongSound.play();
alert("Wrong ❌ \n\nCorrect Answer:\n" + correct);

}

quizIndex++;

showQuiz();

}

/* FINISH SCREEN */

function finishQuiz(){

document.getElementById("questions").innerHTML = `
<div class="q">
<h2>Quiz Finished 🎉</h2>
<p>Your Score: ${score}/25</p>
<button onclick="startQuiz()">Play Again</button>
</div>
`;

}

/* TRANSLATION */

function translateAns(btn){

let text = btn.parentElement.querySelector(".ansText").innerText;

let url =
"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q="
+ encodeURIComponent(text);

fetch(url)
.then(res => res.json())
.then(data => {

btn.parentElement.querySelector(".ansText").innerText =
data[0][0][0];

});

}

function translateQuestion(){

let text = document.getElementById("qText").innerText;

let url =
"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q="
+ encodeURIComponent(text);

fetch(url)
.then(res => res.json())
.then(data => {

document.getElementById("qText").innerText =
data[0][0][0];

});

}
