var subjects = document.getElementById("getSubjects");
console.log("welcome");
var token = localStorage.getItem('token');
var h = sessionStorage.getItem('id');
// console.log(h);
console.log(token);
var allSubjects ;
var subjectIds=[];
var x=[];
var array =new Array;
let subject;
let exams;

function getCourses(){
     allCourses = allSubjects['data'];
     subject = allCourses['data'];
     for(i=0;i<allCourses.length;i++){
      let container = document.createElement('div');
      let course = document.createElement('div');
      let anchorCourse = document.createElement('a');

      // The main container
      container.className = 'subjectsContainer'; 

      // The Course

      course.className = 'subject';
      anchorCourse.innerHTML = allSubjects['data'][i].subjectName;
 
      anchorCourse.onclick = function (){
        sessionStorage.setItem('subjectName',anchorCourse.innerHTML);
        for(let j=0;j<allCourses.length;j++){
          let name =sessionStorage.getItem('subjectName');
          if(name == allCourses[j].subjectName){
            sessionStorage.setItem("id",allCourses[j]._id);
            
             anchorCourse.href = 'subject.html';
          }
        }
      }
      // course.style.backgroundColor = '#444';
      // course.style.color = 'white';
      // course.style.top = '10px';
      // course.style.left = '10px';
      // course.style.margin = '20px';
      // course.style.marginLeft = '5px';
      // course.style.marginRight = '5px';
      // course.style.padding ='100px'; 
      // course.style.width = '20%';
      // course.style.textAlign = 'center';
      // course.style.display = 'inline-block';
      course.appendChild(anchorCourse);
      document.body.appendChild(course);
      // courses.push(allSubjects['data'][i].subjectName);
      console.log(allSubjects['data'][i].subjectName);
    }

}


document.addEventListener("DOMContentLoaded", function(){
  fetch("https://app-e-exam.herokuapp.com/studentSubjects", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'Authorization': 'Bearer ' + token,
    }
  })
  .then(function (response) {
    if (response.ok) {
      console.log(response.status);
      return response.json();
    }
    console.log(response.status);
    return Promise.reject(response);
  })
  .then(function (data) {
    allSubjects = data;
    id = data.data;
    console.log(data);
    console.log(id);

    for(i=0;i<id.length;i++){
      subjectIds.push(allSubjects['data'][i]._id);
      x.push(allSubjects['data'][i]._id)
 
    }
    array.push(allSubjects);
  })
  .catch(function (error) {
    console.warn("Something went wrong.", error);
  });

  })

var subjectId = sessionStorage.getItem('id') ;
  

function getGrades(){
  var token = localStorage.getItem('token');
  let examId = sessionStorage.getItem('examId'); 
  fetch(`https://app-e-exam.herokuapp.com/spacificGrad/${examId}`, {
  method: "GET",
  mode: "cors",
  headers: {
      "Content-type": "application/json; charset=UTF-8",
      'Authorization': 'Bearer ' + token,
  }
  })
  .then(function (response) {
  if (response.ok) {
      console.log(response.status);
      return response.json();
  }
  console.log(response.status);
  return Promise.reject(response);
  })
  .then(function (data) {
  console.log(data);
  })
  .catch(function (error) {
  console.warn("Something went wrong.", error);
  });
}

