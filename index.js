let main = document.querySelector('.root') ;
function create() {
    let array=[];
    
    let quest = document.createElement('input');
    quest.placeholder ="question title";
    let ans1 = document.createElement('input');
    ans1.placeholder ="answer 1";
    let ans2 = document.createElement('input');
    ans2.placeholder ="answer 2";
    let ans3 = document.createElement('input');
    ans3.placeholder ="answer 3";
    let ans4 = document.createElement('input');
    ans4.placeholder ="answer 4";
    let right = document.createElement('input');
    right.placeholder = "right answer";
    let q,one,two,three,four,rightans;
    quest.type="text";
    quest.value ='';
    quest.onchange = function (){
        quest.value= this.value;
        q  = quest.value;
        
    }
    ans1.onchange = function (){
        ans1.value = this.value;
         one = ans1.value;
    }
    ans2.onchange = function (){
        ans2.value = this.value;
         two= ans2.value;
    }
    ans3.onchange = function (){
        ans3.value = this.value;
         three = ans3.value;
    }
    ans4.onchange = function (){
        ans4.value = this.value;
         four = ans4.value;
    }
    right.onchange = function (){
        right.value = this.value;
         rightans = right.value;
    }

    let btn = document.createElement('button');
    btn.innerHTML = "addQuestion";
    btn.onclick= function (){
        let arr ={};
        arr['question'] = q;
        arr['one'] =  one;
        arr['two'] =  two;
        arr['three'] =  three;
        arr['four'] =  four;
        arr['rightanswer'] = rightans;
        array.push(arr);
        arr={};
        console.log(array);
        create();
    }
    main.appendChild(quest);
    main.appendChild(ans1);
    main.appendChild(ans2);
    main.appendChild(ans3);
    main.appendChild(ans4);
    main.appendChild(right);
    main.append(btn);
}
create();