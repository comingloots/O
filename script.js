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
<div class="answer">${q.answer}</div>
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

quizList = questionsData[subject]
.sort(()=>0.5 - Math.random())
.slice(0,25);

quizIndex = 0;
score = 0;

showQuiz();

}

/* RANDOM OPTIONS */

function generateOptions(correct){

let options = [correct];

let pool = questionsData[subject] || [];

while(options.length < 4 && pool.length){

let random = pool[Math.floor(Math.random()*pool.length)].answer;

if(random && !options.includes(random)){
options.push(random);
}

}

return options.sort(()=>Math.random()-0.5);

}

/* SHOW QUIZ */

function showQuiz(){

if(!quizList.length) return;

let q = quizList[quizIndex];

let questionText = q[lang] || q.hindi || q.english;

let options = generateOptions(q.answer);

let html = `
<div class="q">
<p><b>Question ${quizIndex+1}/25</b></p>
<p>${questionText}</p>
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

if(quizIndex < 25){
showQuiz();
}else{
finishQuiz();
}

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
.option{
display:block;
width:100%;
margin:8px 0;
}
