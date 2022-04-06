$(function(){
var $firstName =$('#firstName');
var $lastName =$('#lastName');
var $email =$('#email');
var $password=$('#password');


$('createUser').on('click',function(){
var user = {
    firstName: $firstName.val(),
    lastName: $lastName.val(),
    email: $email.val(),
    password: $password.val(),
    role:"student"
};
$.ajax({
    type:'POST',
    url:'https://app-e-exam.herokuapp.com/sign_Up',
    data: user,
    success: function(data,status){
        console.log(data);
    },
    error: function(){
        alert('sign up failed');
    }
});
})
});