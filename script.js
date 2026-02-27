let lang = "hindi";
let subject = "maths";
let showCount = 10;
let searchText = "";

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

function render(){

let list = questionsData[subject];

if(searchText){
list = list.filter(q =>
q[lang].toLowerCase().includes(searchText)
);
}

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

if(ans.style.display==="block"){
ans.style.display="none";
btn.innerText="Show Answer";
}else{
ans.style.display="block";
btn.innerText="Hide Answer";
}

}

render();
