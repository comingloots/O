let lang = "hindi";
let subject = "maths";
let showCount = 10;

document.getElementById("language").onchange = e=>{
lang = e.target.value;
render();
};

document.getElementById("subject").onchange = e=>{
subject = e.target.value;
showCount = 10;
render();
};

document.getElementById("moreBtn").onclick = ()=>{
showCount += 10;
render();
};

function render(){

let list = questionsData[subject];
let html = "";

list.slice(0,showCount).forEach(q=>{

html += `
<div class="q">
<p>${q[lang]}</p>
<button onclick="toggle(this)">Show Answer</button>
<div class="answer">${q.answer}</div>
</div>
`;

});

document.getElementById("questions").innerHTML = html;

}

function toggle(btn){
let ans = btn.nextElementSibling;
ans.style.display = ans.style.display==="block" ? "none":"block";
}

render();