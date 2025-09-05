document.getElementById("userForm").addEventListener("submit",(event)=>{
event.preventDefault();
const nameField=document.getElementById("name");
const emailField=document.getElementById("email");
const ageField=document.getElementById("age");
const successMessage=document.getElementById("successMessage");
const successData=document.getElementById("successData");
const nameError=document.getElementById("nameError");
document.getElementById("nameError").classList.add("d-none");
document.getElementById("emailError").classList.add("d-none");
document.getElementById("ageError").classList.add("d-none");
let valid=true;
if(nameField.value.trim()===""){
nameField.classList.add("is-invalid");
nameError.classList.remove("d-none");
valid=false;
} else{
nameField.classList.remove("is-invalid");
document.getElementById("nameError").classList.add("d-none");
}
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailPattern.test(emailField.value) || !emailField.value.endsWith(".com")){
emailField.classList.add("is-invalid");
document.getElementById("emailError").classList.remove("d-none");
valid=false;
} else{
emailField.classList.remove("is-invalid");
document.getElementById("emailError").classList.add("d-none"); }

const age=parseInt(ageField.value);
if(isNaN(age) || age<18 || age>150){
ageField.classList.add("is-invalid");
document.getElementById("ageError").classList.remove("d-none");
valid=false;
} else{
ageField.classList.remove("is-invalid");
document.getElementById("ageError").classList.add("d-none");
}
if(valid){
successData.innerHTML=`Name : ${nameField.value}<br>
Email : ${emailField.value}<br>
Age : ${ageField.value}`;
successMessage.classList.remove("d-none");
document.getElementById("userForm").reset();
}else{
successMessage.classList.add("d-none");
}
})
