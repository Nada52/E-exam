var token = localStorage.getItem('token');
document.addEventListener("DOMContentLoaded", function(){
    fetch("https://app-e-exam.herokuapp.com/teacherSubjects", {
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
    exams = data['data'];
    let allExams = data;
    let table = document.getElementById('professorSubjectsTable');
    
   
    for (let i = 0; i<exams.length;i++){
        let tr = document.createElement('tr');
        // let td1 = document.createElement('td');
        // let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        // td1.innerHTML = exams[i]['department'];
        // td2.innerHTML = exams[i]['level'];
        td3.innerHTML = exams[i]['subjectName'];
      
        let actionButton = document.createElement('a');
        
        actionButton.innerHTML = 'add exam';
      
      
        // actionButton.href ="ques.html";
        actionButton.onclick = function (){
            sessionStorage.setItem('subject_id',exams[i]['_id']);
            actionButton.href='createexam.html';

        }
        //actionButton.onclick = takeExam();
        // idExams.push(examId);
        td4.appendChild(actionButton);
        // tr.appendChild(td1);
        // tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        table.appendChild(tr);
    }
      console.log(exams);
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
  
    })

   
    