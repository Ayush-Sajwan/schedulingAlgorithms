let arrivalTime = document.getElementById('arrivalTime');
let burstTime = document.getElementById('burstTime');
let btn = document.getElementById('btn');
let rtable = document.getElementsByClassName('rtable')[0];
let algo = document.getElementById('algorithm');

btn.onclick = () => {



    rtable.style.display = 'flex';

    let chart = document.getElementsByClassName('chart')[0];
    //flushing old data from gantt chart
    chart.innerHTML = "";
    

    //taking values from input box
    let str1 = arrivalTime.value;
    let str2 = burstTime.value;

    str1 = str1.trim();
    str2 = str2.trim();

    //storing values in the array
    let atArray = str1.split(/\s+/);
    let btArray = str2.split(/\s+/);


    //converting string into integer in arrays
    for (i = 0; i < atArray.length; i++) {
        atArray[i] = parseInt(atArray[i]);
    }

    for (i = 0; i < btArray.length; i++) {
        btArray[i] = parseInt(btArray[i]);
    }


   //calculating only if number of process same in both arrays
   if(atArray.length==btArray.length){

    //creating a class for process
    class process {
        constructor(at, bt, ct, tt, wt, pid) {
            this.at = at;
            this.bt = bt;
            this.secbt=bt;
            this.ct = ct;
            this.tt = tt;
            this.wt = wt;
            this.pid = pid;
        }
    }

    //creating an array for processes
    let pArray = [];

    //pushing elements in array
    for (i = 0; i < atArray.length; i++) {
        pArray.push(
            new process(atArray[i], btArray[i], 0, 0, 0, i + 1)
        );
    }


    //sorting array on the basis of the arrival time
    pArray.sort((a, b) => {
        return a.at - b.at;
    });

    //taking intial completion time as arrival time of first process
    let ct = pArray[0].at;

    //creating variable for while loop working
    let flag=true;

    

    //variable to store index of process which executes
    let minIndex;
    
    //variable to detect change while printing gantt chart
    let old;
    //variable for initializing old variable for first time
    let oneflag=true;

    //calculating completion time of processes
    while(flag){

        flag=false;

        //finding any element whose bt is not zero
        for(i=0;i<pArray.length;i++){
            if(pArray[i].bt!=0){
                minIndex=i;
                flag=true;
                break;
                
            }
        }
 
        //finding the process with lowest burst time at a particular instant
        //given it has arrived in process queue
        for(i=0;i<pArray.length;i++){

            //checking only if burst time is not zero
            if(pArray[i].bt!=0){

            //selecting process with lowest burst time
            if(pArray[i].bt<pArray[minIndex].bt && pArray[i].at<=ct ){
                minIndex=i;
            }
            }
        }

        //incrementing time by one
        ct++;
        //decrementing the burst time of process
        pArray[minIndex].bt-=1;

        //this condition works only once 
        //to give initial value to old variable
        if(oneflag){
            old=minIndex;
            oneflag=false;
        }

        //calculating completion time of process
        if(pArray[minIndex].bt==0){  
        pArray[minIndex].ct=ct;

        //printing element if burst time becomes zero
        chart.innerHTML += `<div class="process">
        <div class="pnumber">P${pArray[minIndex].pid}</div>
        <div class="data">${pArray[minIndex].ct}</div>
        </div>`;
        //setting old to min so that it does not get printed 
        //again by condition after it
        old=minIndex;
        }

        

        //printing the old process in gantt chart 
        //if another process starts executing 
        //but given only when burst time of old process is not zero
        //because if it is zero then it is already printed by above condition 

        if(old!=minIndex && pArray[old].bt!=0){
        chart.innerHTML += `<div class="process">
        <div class="pnumber">P${pArray[old].pid}</div>
        <div class="data">${ct-1}</div>
        </div>`;
        }
         //setting old to min index to detect changes further
         old=minIndex;
    }


    //intializing burst time again 
    //for calculating tt and wt 
    for(i=0;i<pArray.length;i++){
       pArray[i].bt=pArray[i].secbt;
    }

    //calculating turn around time
    for (i = 0; i < pArray.length; i++) {
        pArray[i].tt = pArray[i].ct - pArray[i].at;
    }

    //calculating waiting time
    for (i = 0; i < pArray.length; i++) {
        pArray[i].wt = pArray[i].tt - pArray[i].bt;
    }



    //printing table on page
    let table = document.getElementById('result');
    table.innerHTML = `<tr>
    <th>P.no</th>
    <th>Arrival Time</th>
    <th>Burst Time</th>
    <th>Completion Time</th>
    <th>TurnAround Time</th>
    <th>Waiting Time</th>
    </tr>`;

    //adding elements in table
    for (i = 0; i < pArray.length; i++) {
        table.innerHTML += `<tr>
        <td>P${pArray[i].pid}</td>
        <td>${pArray[i].at}</td>
        <td>${pArray[i].bt}</td>
        <td>${pArray[i].ct}</td>
        <td>${pArray[i].tt}</td>
        <td>${pArray[i].wt}</td>
        </tr>`
    }

   }
   else{
    alert("Number of entries should be same in both input box");
   }



}