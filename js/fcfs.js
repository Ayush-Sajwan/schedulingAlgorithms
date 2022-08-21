
let arrivalTime = document.getElementById('arrivalTime');
let burstTime = document.getElementById('burstTime');
let btn = document.getElementById('btn');
let rtable = document.getElementsByClassName('rtable')[0];
let algo = document.getElementById('algorithm');

btn.onclick = () => {


        rtable.style.display = 'flex';

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
        if (atArray.length == btArray.length) {

            //creating a class for process
            class process {
                constructor(at, bt, ct, tt, wt, pid) {
                    this.at = at;
                    this.bt = bt;
                    this.ct = ct;
                    this.tt = tt;
                    this.wt = wt;
                    this.pid = pid;
                }
            }

            let pArray = [];

            for (i = 0; i < atArray.length; i++) {
                pArray.push(
                    new process(atArray[i], btArray[i], 0, 0, 0, i + 1)
                );
            }


            pArray.sort((a, b) => {
                return a.at - b.at;
            });


            let ct = pArray[0].at;

            //calculating completion time
            for (i = 0; i < pArray.length; i++) {
                ct += pArray[i].bt;
                pArray[i].ct = ct;
            }

            //calculating turn around time
            for (i = 0; i < pArray.length; i++) {
                pArray[i].tt = pArray[i].ct - pArray[i].at;
            }

            //calculating waiting time
            for (i = 0; i < pArray.length; i++) {
                pArray[i].wt = pArray[i].tt - pArray[i].bt;
            }

            let chart = document.getElementsByClassName('chart')[0];
            //flushing old data from gantt chart
            chart.innerHTML = "";
            //adding elements in gantt chart
            for (i = 0; i < pArray.length; i++) {
                chart.innerHTML += `<div class="process">
        <div class="pnumber">P${pArray[i].pid}</div>
        <div class="data">${pArray[i].ct}</div>
    </div>`;
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
        else {
            alert("Number of entries should be same in both input box");
        }


    
}

