'use strict';
function counter(index) {
    let current = 0;
    return () => {
        current = current + index;
        return current;
    }
}
const next = counter(1); // next

console.log(next());
console.log(next());
console.log(next());

const prev = counter(-1);// prev

console.log(prev());
console.log(prev());
console.log(prev());
//Доп задание
'use strict';
function counter(index) {
    let current = 0;
    let numberCall = 0;
    let history = [];
    return () => {
    		numberCall++;
        current = current + index;
        if( history.length  == 10) {
          history.shift();
          history.push(current);
        } else history.push(current);
        return {
        	current: current,
          numberCurrentCall: numberCall,
        	historyCounter: history,
        };
    }
}
const next = counter(1); // next
function startNextCounter(delayCounter, stopCounter) {
	const intervalId = setInterval(() => {
  	console.log(next());
	}, delayCounter)
  setTimeout(() => {
  	clearInterval(intervalId);
  },stopCounter);
}
startNextCounter(100, 500);

const prev = counter(-1); // next
function startPrevCounter(delayCounter, stopCounter) {
	const intervalId = setInterval(() => {
  	console.log(prev());
	}, delayCounter)
  setTimeout(() => {
  	clearInterval(intervalId);
  },stopCounter);
}
startPrevCounter(200, 1000);