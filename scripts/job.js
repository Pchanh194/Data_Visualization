/*
Filename: apply.js
Targethtml: apply.html
Purpose: Store reference number
Author: Hoang Chau Anh Pham
Date Written: 15/9/2021
Last Edit: 18/9/2021
*/


function storeRef(){
	var refpos = document.getElementById("ref").innerText; 
	console.log(refpos);
	console.log(ref);
	window.localStorage.setItem('refnum', refpos);
	//document.getElementById("text").innerText = window.localStorage.getItem('refnum');
	window.location = "apply.html";
	window.localStorage.setItem('href', window.location.pathname);
	console.log(window.location.pathname);
}

function init(){
	document.getElementById("apply").onclick = function(){storeRef()};
}

window.onload = init;
