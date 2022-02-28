/*
Filename: apply.js
Targethtml: apply.html
Purpose: Validate application form and store data to local and session storages
Author: Hoang Chau Anh Pham
Date Written: 15/9/2021
Last Edit: 18/9/2021
*/
var check_reference = false;
var check_submit = false;

function validate_firstname() {
	var result = true;
	var text;
	var firstName = document.getElementById("firstname").value;	
	var firstname_regex = /[a-zA-Z ]+/;
	
	if (firstName == "") {
		result = false;
		text = "* This is a required field";
		document.getElementById("textfname").innerHTML = text;
	}
	else if (!(firstname_regex.test(firstName))) {
		result = false;
		text = "* Please enter a valid name";
		document.getElementById("textfname").innerHTML = text;
	}
	else {
		result = true;
		document.getElementById("textfname").innerHTML = "";
	}
	return result;
}

function validate_lastname() {
	var result = true;
	var text;
	var lastName = document.getElementById("lastname").value;
	var lastname_regex = /[a-zA-Z ]+/;
	if (lastName == "") {
		result = false;
		text = "* This is a required field";
		document.getElementById("textlname").innerHTML = text;
	}
	else if (!(lastname_regex.test(lastName))) {
		result = false;
		text = "* Please enter a valid name";
		document.getElementById("textlname").innerHTML = text;
	}
	else {
		result = true;
		document.getElementById("textlname").innerHTML = "";
	}
	return result;
}

function validate_dob() {
	var result = true;
	var text;
	
	var dobStr = document.getElementById("dob").value;  //validation of date of birth
	var dmy = dobStr.split("/");
	var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
	if (dobStr == "") {
		result = false;
		text = "* This is a required field";
		document.getElementById("textdob").innerText = text;
	}

	// console.log(dateObj)
	// console.log(year)
	// console.log(dmy)
	// return result
	else if (dmy.length != 3) {
		result = false;
		text = "Please enter a valid date in terms of dd/mm/yyyy";
		document.getElementById("textdob").innerText = text;
	} 
	else {
		 if (!(date_regex.test(dobStr))) {
			result = false;
			text = "Please enter a valid date in terms of dd/mm/yyyy";
			document.getElementById("textdob").innerText = text;
		}
		else if (dmy[0] == 29 && dmy[1] == 2 && dmy[2] % 4 != 0){
			result = false;
			text = "Please enter a valid date in terms of dd/mm/yyyy";
			document.getElementById("textdob").innerText = text;
		}
        else {
			const dateObj = new Date();
			const year = dateObj.getFullYear();
			
			if ((year - dmy[2]) < 15 || (year - dmy[2]) > 80) {
				result = false;
				text = "* You are not qualified because you are not 15-80 years old.";
				document.getElementById("textdob").innerText = text;
			}
			else {
				result = true;
				document.getElementById("textdob").innerHTML = "";
			}
		}
	}
	return result;
}

function validate_address() {
	var result = true;
	var text;
	var address = document.getElementById("address").value;
	if (address == "") {
		result = false;
		text = "* This is a required field";
		document.getElementById("textaddress").innerHTML = text;
	}
	else {
		result = true;
		document.getElementById("textaddress").innerHTML = "";
	}
	return result;
}
function validate_town() {
	var result = true;
	var text;
	var town = document.getElementById("town").value;
	if (town == "") {
		result = false;
		text = "* This is a required field";
		document.getElementById("texttown").innerHTML = text;
	}
	else {
		result = true;
	    document.getElementById("texttown").innerHTML = "";
	}
	return result;
}
	
function validate_gender(){
	var result = true;
	var text;
	if(!document.getElementById('male').checked && !document.getElementById('female').checked && !document.getElementById('other').checked) { // validate if a radio is checked
	    result = false;
		text = "* This is a required field.";
		document.getElementById("textgender").innerHTML = text;
	}
	else {
		result = true;
		document.getElementById("textgender").innerHTML = "";
	}
	return result;
}

function validate_state(){
	var result = true;
	var check = true;
	var new_text;
	var text;
	var state = document.getElementById("state").value; // take the state value
	if (state == "") {
		result = false;
		check = false;
		text = "* This is a required field";
		document.getElementById("textstate").innerHTML = text;
	}
	else {
		check = true;
		document.getElementById("textstate").innerHTML = "";
		if (state == "VIC") {
			text = "38";
		}
		if (state == "NSW") {
			text = "12";
		}
		if (state == "QLD") {
			text = "49";
		}
		if (state == "NT") {
			text = "0";
		}
		if (state == "WA") {
			text = "6";
		}
		if (state == "SA") {
			text = "5";
		}
		if (state == "TAS") {
			text = "7";
		}
		if (state == "ACT") {
			text = "0";
		}
	}
	var numb = parseInt(text[0]);
	var postcode = document.getElementById("postcode").value; // validation of postcode//change to for to check all.
    var post_regex = /\d{4}/;
	if (postcode == ""){
	    result = false;
		text = "* This is a required field.";
		document.getElementById("textpost").innerHTML = text;
	}
	else if (!post_regex.test(postcode)){
		result = false;
		text = "* Please enter a 4 digits postcode.";
		document.getElementById("textpost").innerHTML = text;
	}
	else {	
	    if (postcode >= 1000 && postcode <= 9999){
			result = true;
			document.getElementById("textpost").innerHTML = " ";
		}
		if (parseInt(postcode[0]) != numb){
			numb = parseInt(text[1]);
			if (text[1] == undefined){
				result = false;
				if (check == true) {
					new_text = "* Invalid postcode. Please enter a postcode start with ";
					document.getElementById("textpost").innerHTML = new_text + "'" + text[0] + "'";
				}
			}
			else 
			{
				if (parseInt(postcode[0]) != numb)
				{
					result = false;
					if (check == true) {
						new_text = "* Invalid postcode. Please enter a postcode start with ";
						document.getElementById("textpost").innerHTML = new_text + "'" + text[0] + "'" + " or " + "'" + text[1] + "'";
					}
				}
			}
		}
		else {
			result = true;
			document.getElementById("textpost").innerHTML = ""; // end of postcode validation
		}
	}
	return result;
}
	
function validate_other(){
	var result = true;
	const checkboxes_1 = document.querySelectorAll('input[name="techskill[]"]:checked'); // validate other skills textarea
	const checkboxes_2 = document.querySelectorAll('input[name="softskill[]"]:checked');
	var otherskill = document.getElementById('textarea').value;
	let values = [];
    checkboxes_1.forEach((checkbox) => {
        values.push(checkbox.value);
    });
	checkboxes_2.forEach((checkbox) => {
        values.push(checkbox.value);
    });
	if ((values.length != 0) && (otherskill == ""))
	{
		result = false;
		document.getElementById("textother").innerHTML = "* Do not left this blank";		
	} 
	else {
		result = true;
		document.getElementById("textother").innerHTML = "";	
	}
	return result;
}

function validate_qualification(){
	var result = true;
	var text;
	var qualifi = document.getElementById("qualify").value; // take the state value
	if (qualifi == "") {
		result = false;
		text = "* This is a required field";
		document.getElementById("textquali").innerHTML = text;
	}
	else {
		result = true;
		text = " ";
		document.getElementById("textquali").innerHTML = text;
	}
	return result;
}
function validate_email() {
	var result = true;
	var email_regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
	var email = document.getElementById("email").value;
	if (email == ""){
		result = false;
		document.getElementById("textemail").innerHTML = "* This is a required field.";
	}
	else if (!email_regex.test(email)){
	    result = false;
		document.getElementById("textemail").innerHTML = "* Please enter a valid email address.";
	}
	else {
		result = true;
		document.getElementById("textemail").innerHTML = " ";
	}
	return result;
}
function validate_phone() {
    var result = true;
	var phone_regex = /^[0-9 ]{8,12}$/;
	var phone = document.getElementById("phone").value;
	if (phone == ""){
		result = false;
		document.getElementById("textphone").innerHTML = "* This is a required field.";
	}
	else if (!phone_regex.test(phone)){
	    result = false;
		document.getElementById("textphone").innerHTML = "* Please enter a valid phone number of 8-12 digits or spaces.";
	}
	else {
		result = true;
		document.getElementById("textphone").innerHTML = " ";
	}
	return result;
}

function validate_university(){
	var result = true;
	var text;
	var university = document.getElementById("university").value;	// validate name field
	var uni_regex = /[a-zA-Z ]+/;
	
	if (university == "") {
		result = false;
		text = "* This is a required field";
		document.getElementById("textuni").innerHTML = text;
	}
	else if (!(uni_regex.test(university))) {
		result = false;
		text = "* Please enter a valid university";
		document.getElementById("textuni").innerHTML = text;
	}
	else {
		result = true;
		document.getElementById("textuni").innerHTML = "";
	}
	return result;
}

function transfer_ref(){
	document.getElementById("refpos").value = window.localStorage.getItem("refnum");
	document.getElementById("refpos").readOnly = true;
}
function validate_ref(){
	// document.getElementById("refpos").value = "";
	// document.getElementById("refpos").readOnly = false;
	var result = false;
	var ref = document.getElementById('refpos').value;
	var ref_regex = /^[a-zA-Z0-9]{5}$/;
	if (ref ==""){
		result = false;
		document.getElementById('textref').innerHTML = "* This is a required field";
	}
	else if (!ref_regex.test(ref)){
		result = false;
		document.getElementById('textref').innerHTML = "* Please enter a valid 5 characters reference number";
	}
	else {
		result = true;
		document.getElementById('textref').innerHTML = "";
	}
	console.log('ref: ' + ref_regex.test(ref));
	return result;
}


function validateForm() {
	var check_firstname = validate_firstname();	
	var check_lastname = validate_lastname();	
	var check_dob = validate_dob();
	var check_address = validate_address();	
	var check_town = validate_town();
	var check_email = validate_email();
	var check_phone = validate_phone();
	var check_uni = validate_university();
	var check_quali = validate_qualification();
	var check_gender = validate_gender();
	var check_state = validate_state();
	var check_other = validate_other();
	var check_ref;
	if (!check_reference) {
		// console.log(check_reference)
		check_ref = validate_ref();
	}
	else check_ref = true;
	
	console.log(check_firstname);
	console.log( check_lastname);
    console.log(check_address);
	console.log( check_town);
	console.log(check_dob);
	console.log( check_gender);
	console.log( check_state);
	console.log(check_other);
	console.log(check_email);
	console.log(check_phone);
	console.log(check_uni);
	console.log( check_quali);
	console.log(check_ref);
		
	session_Storage(); // auto store for the next apply
    if (check_firstname && check_lastname && check_address && check_town && check_dob && check_gender && check_state && 
	check_email && check_phone && check_uni && check_quali && check_ref && check_other){
		check_submit = true;
		return true;
	}
	else {
		return false;
	}
}

var check_set_ref = false;

function session_Storage() {
    window.sessionStorage.setItem('firstname', document.getElementById("firstname").value);
	window.sessionStorage.setItem('lastname', document.getElementById("lastname").value);
	window.sessionStorage.setItem('dob', document.getElementById("dob").value);
	if(document.getElementById('male').checked){ 
		window.sessionStorage.setItem('gender', 'male');
	}
	else if (document.getElementById('female').checked) {
		window.sessionStorage.setItem('gender', 'female');
	}
	else if (document.getElementById('other').checked) {
		window.sessionStorage.setItem('gender', 'other');
	}
	window.sessionStorage.setItem('address', document.getElementById("address").value);
	window.sessionStorage.setItem('town', document.getElementById("town").value);
	window.sessionStorage.setItem('state', document.getElementById("state").value);
	window.sessionStorage.setItem('postcode', document.getElementById("postcode").value);
	window.sessionStorage.setItem('email', document.getElementById("email").value);
	window.sessionStorage.setItem('phone', document.getElementById("phone").value);
	window.sessionStorage.setItem('univer', document.getElementById("university").value);
	window.sessionStorage.setItem('qualify', document.getElementById("qualify").value);
	// check all the above id for better future!!!
	// sessionStorage the checkboxes!!!
    console.log(document.getElementById("refpos").value);
	window.sessionStorage.setItem('ref', document.getElementById("refpos").value);
	// check_set_ref = true;
	
	console.log(check_reference);

	const checkboxes_1 = document.querySelectorAll('input[name="techskill[]"]:checked'); // validate other skills textarea
	const checkboxes_2 = document.querySelectorAll('input[name="softskill[]"]:checked');
	let values = [];
    checkboxes_1.forEach((checkbox) => {
        values.push(checkbox.value);
    });
	checkboxes_2.forEach((checkbox) => {
        values.push(checkbox.value);
    });
	window.sessionStorage.setItem('skill', values);
	var otherskill = document.getElementById('textarea').value;
	if (otherskill != ""){
		window.sessionStorage.setItem('other', otherskill);
	}

}
function display_from_sessionStorage(){
	document.getElementById("firstname").value = window.sessionStorage.getItem('firstname');
	document.getElementById("lastname").value = window.sessionStorage.getItem('lastname');
	document.getElementById("dob").value = window.sessionStorage.getItem('dob');
	var gender = window.sessionStorage.getItem('gender');
	if (gender != undefined){
		document.getElementById(gender).checked = true;
	}

	console.log(gender);
	
	document.getElementById("address").value = window.sessionStorage.getItem('address');
	document.getElementById("town").value = window.sessionStorage.getItem('town');
	document.getElementById("state").value = window.sessionStorage.getItem('state');
	document.getElementById("postcode").value = window.sessionStorage.getItem('postcode');
	document.getElementById("email").value = window.sessionStorage.getItem('email');
	document.getElementById("phone").value = window.sessionStorage.getItem('phone');
	document.getElementById("university").value = window.sessionStorage.getItem('univer');
	document.getElementById("qualify").value = window.sessionStorage.getItem('qualify');
	console.log(check_reference);
	console.log(check_set_ref);
	console.log(window.sessionStorage.getItem('ref'));
	if (!check_reference){
        document.getElementById("refpos").value = window.sessionStorage.getItem('ref');
    }
	let values = []
	values = window.sessionStorage.getItem('skill');
	// console.log(values);
	if (values != undefined)
	{
		var item = values.split(",");
		for( let i = 0; i < item.length; i++){
		console.log(String(item[i]));
		document.getElementById(String(item[i])).checked = true;
		// console.log(String(item));
		}
	}
	if (window.sessionStorage.getItem('other') != undefined){
		console.log(window.sessionStorage.getItem('other'));
		document.getElementById("textarea").value = window.sessionStorage.getItem('other');
	}

}

function initialise() {
	var formElement = document.getElementById("regform");
	formElement.onsubmit = validateForm;
	if (window.localStorage.getItem('href') == '/jobs-details-1.html' || window.localStorage.getItem('href') == '/jobs-details-2.html' || window.localStorage.getItem('href') == '/jobs-details-3.html' ){
		transfer_ref();
		check_reference = true;
		// console.log(check_reference);
	}
	if (check_submit){
		session_Storage();
		check_reference = false;
		if (window.localStorage.getItem('href') == '/jobs-details-1.html' || window.localStorage.getItem('href') == '/jobs-details-2.html' || window.localStorage.getItem('href') == '/jobs-details-3.html' ){
			transfer_ref();
            check_reference = true;
		}
		else {
			check_reference = false;
		}
	}
    // sessionStorage.clear();
	display_from_sessionStorage();
}
window.onload = initialise;

//consider to place all the text above or under the form or place it after each input.
//ask Guangming if other box as firstname, last name need to be validate by js or leave it as it is. 
//ask Guangming if we return to the page and is the previous is the reference from site, will we still display it and store in sesstionstorage.
//ask Guangming about other skill.
