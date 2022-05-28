  //select elements
  //to make ques_count dynamic
  let countSpan=document.querySelector(".quiz-info .count span");
  let bullets=document.querySelector(".bullets");

  //to make bullets dynamic when questions num change
  let bulletsSpanContainer=document.querySelector(".bullets .spans");

  let quizArea=document.querySelector(".quiz-area");
  let answrsArea=document.querySelector(".answers-area");
  let submitButton=document.querySelector(".submit-button");
  let resultsContainer=document.querySelector(".results");
  let countdownElement=document.querySelector(".countdown");
  let finishbutton=document.querySelector(".finish-button");
   

  //set options
  let currentIndex=0;
  let rightAnswers=0;
  let countdownInterval;
  
  
  
  let exam_id = sessionStorage.getItem('exam_id');
  let token = localStorage.getItem('token');
  let finish = document.getElementById('finishButton');
  let send = document.getElementById('send');
  
  function getQuestions(){
      let myRequest= new XMLHttpRequest();
      myRequest.onreadystatechange=function(){
     
        if(this.readyState===4 &&  this.status===200){

              //covert from json to js object
              let questionsObject=JSON.parse(this.responseText);

              //to know how many questions
              let qCount=questionsObject.length;

             

              //create bullets +set questions count
                 creatBullets(qCount);

                 //add question data
                addQuestionData(questionsObject[ currentIndex],qCount);

                //start count down
                countdown(5,qCount);

                //click on submit
                submitButton.onclick= ( )=> {
                        
                 //get right answer
                 let theRightAnswer=questionsObject[ currentIndex].correctAnswer;
                

                  //increase index
                  currentIndex++;
                  //check the answer
                  checkAnswer(theRightAnswer,qCount);

                  //remove previous question
                  quizArea.innerHTML='';
                  answrsArea.innerHTML='';

                    //add question data
                addQuestionData(questionsObject[ currentIndex],qCount);

                //handle bullet class
                handleBullets();
                       // to stop count during click
                       clearInterval(countdownInterval);
                   //start count down
                   countdown(5,qCount);

                //show results
                showResults(qCount);
                        
                };


         }                                     
       };
       var token = localStorage.getItem('token');
       var exam_id = sessionStorage.getItem('exam_id');
       myRequest.open("GET", `https://app-e-exam.herokuapp.com/getSpacificQuestion/${exam_id}`,
       true);

       myRequest.setRequestHeader('Content-type','application/json; charset=UTF-8');
       myRequest.setRequestHeader('Authorization','Bearer ' + token);

       myRequest.send();
                           };

           getQuestions(); 

//num is questions number
function  creatBullets(num) {
        countSpan.innerHTML=num;

        //create spans
        for (let  i = 0;  i < num;  i++) {

                 //create bullet
                 let theBullet=document.createElement("span");

                 //to make bullet highlight in case questions changes"first index""
                 if (i===0 ) {
                      theBullet.className="on";   
                 }
                 
                 //append bullet to main bullet container
                 bulletsSpanContainer.appendChild(theBullet);

                 

                
        }
}

//function of add question
function  addQuestionData( obj , count) {
    if (currentIndex < count) {
         document.getElementById('finishButton').style.visibility = 'hidden';
             //create h2 question title
    let questionTitle=document.createElement("h2");

    //create question text
    let questionText=document.createTextNode(obj['question']);

    //append text to H2
    questionTitle.appendChild(questionText);

    //append H2 to the quiz arrea
    quizArea.appendChild(questionTitle);

    //create answers
    for (let  i = 1;  i <=4;  i++) {
            //create main answer div
            let mainDiv=document.createElement("div");
            //add class to main div
            mainDiv.className='answer';
            //create radio input
            let radioInput=document.createElement("input");
            //add type"radio" +name"to make all are connected together" +data-attribute"to compare with data attribute and right answer "+ id"to choose answer when click on label"
            radioInput.name="question";
            radioInput.type="radio";
            //answer wii be printed for 4 times
            radioInput.id=`answer${i}`;
            radioInput.dataset.answer=obj[`answer${i}`];

            //make first optiion selected
           // if ( i===1) {
           //        radioInput.checked=true;
           // }

            //create labels
            let theLabel=document.createElement("label");
            //add for attribute 
            theLabel.htmlFor=`answer${i}`;

            //creat label text
            let theLabelText=document.createTextNode(obj[`answer${i}`]);
            // add/apend text to label
            theLabel.appendChild(theLabelText);

            //add input+ label to Main div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);
            //append all divs to answer area
            answrsArea.appendChild(mainDiv);




            
    }
    }

}

function checkAnswer(theRightAnswer,count) {
        let correctAnswer;
        let answers=document.getElementsByName("question");
        let theChoosenAnswer;
        //to compare btw choosen and right >> loop on all answers
        for(let i=0; i<answers.length;i++ ) {
                if ( answers[i].checked) {
                        
                        theChoosenAnswer=answers[i].dataset.answer;
                }


        }
        if ( theRightAnswer===theChoosenAnswer) {
                       
                rightAnswers++; 
                
                
           }

        
     console.log(`rightanswer is :${theRightAnswer}`);
     console.log(`choshen answer is :${theChoosenAnswer}`);

}

function handleBullets(){
       
        let bulletsSpans=document.querySelectorAll(".bullets .spans span");
        let arrayOfSpans=Array.from(bulletsSpans);
        //to make bullets focus on the correct num of ques.
        arrayOfSpans.forEach((span,index) =>{
             if ( currentIndex===index) {
                   span.className="on" ; 
             }
        })
}

function  showResults(count) {

        let theResults;
        if ( currentIndex===count) { 
                quizArea.remove();
                answrsArea.remove();
                submitButton.remove();
                bullets.remove();
                document.getElementById('finishButton').style.visibility = 'visible';
                finish.onclick = function addGrade() {
                //         //put here your steps that you want after click 
                        
                        fetch("https://app-e-exam.herokuapp.com/addGrad", {
                                method: "POST",
                                mode: "cors",
                                headers: {
                                "Content-type": "application/json; charset=UTF-8",
                                'Authorization': 'Bearer ' + token,
                                },
                                body:JSON.stringify({
                                exam: sessionStorage.getItem('exam_id'),
                                yourScore: rightAnswers
                                })
                        })
                        .then((res) => res.json())
                                  .then((res) => {
                                    console.log(res);
                                    alert(res.message);
                        
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                        
                        console.log(sessionStorage.getItem('exam_id'));
                        console.log(rightAnswers);
                        console.log(token);
                    }
               

                //results
                if ( rightAnswers > (count / 2)  &&  rightAnswers < count) {
                       theResults=`<span class="good">Good!</span>, ${rightAnswers} from ${count}.` ;
                }

                else if(rightAnswers===count){
                        theResults=`<span class="perfect">Perfect!</span>, ${rightAnswers} from ${count}.`;
                }

                else{
                        theResults=`<span class="bad">Bad...!</span>, ${rightAnswers} from ${count}.`;
                }


                resultsContainer.innerHTML=theResults;
                resultsContainer.style.padding="10 px";
                resultsContainer.style.backgroundColor="white";
                resultsContainer.style.padding="10px";
                

        }
}


function  countdown( duration , count) {
       
        if ( currentIndex<count) {
                let minutes , seconds;
                countdownInterval=setInterval(function () {
                        //minutes
                      minutes=parseInt(duration / 60);  
                      //seconds
                      seconds=parseInt(duration % 60); 
                      minutes=minutes<10? `0${minutes}`:minutes; 
                      seconds=seconds<10? `0${seconds}`:seconds; 

                      countdownElement.innerHTML=`${minutes} : ${seconds}`;

                      if (--duration < 0) {
                              //stop timer
                              clearInterval(countdownInterval);
                              //when time out countdown automatically clicked the butten
                               submitButton.click();
                      }

                }, 1000);
        }
}
// send.onclick =  function addSubject() {
//         fetch("https://app-e-exam.herokuapp.com/addGrad", {
//           method: "POST",
//           mode: "cors",
//           body: JSON.stringify({
//            exam: sessionStorage.getItem('exam_id'),
//            yourScore: rightAnswers
//           }),
//           headers: {
//             "Content-type": "application/json; charset=UTF-8",
//             Authorization: "Bearer " + token,
//           },
//         })
//           .then((res) => res.json())
//           .then((res) => {
//             console.log(res);
//             alert(res.message);

//           })
//           .catch((err) => {
//             console.log(err);
//           });
          
      
//       }
      console.log(sessionStorage.getItem('exam_id'));
      console.log(rightAnswers);
