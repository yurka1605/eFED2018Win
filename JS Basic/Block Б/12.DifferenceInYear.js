function differenceInYears(dateOne, dateTwo) {
    /* первая дата */
    var year1 = dateOne.getFullYear();
    var month1 = dateOne.getMonth();
    var day1 = dateOne.getDay();
    /* вторая дата */
    var year2 = dateTwo.getFullYear();
    var month2 = dateTwo.getMonth();
    var day2 = dateTwo.getDay();
    /* вычисление дней */ 
    dateOne = year1*365 + month1*30 + day1;
    dateTwo = year2*365 + month2*30 + day2;
    var difference = (dateTwo - dateOne)/365;
    difference = +difference.toFixed(1);
    if(difference < 0 ) {
        difference = -1*difference;
    }
    return difference;
}
console.log(differenceInYears(new Date(2014, 10, 2), new Date(2016, 10, 2)));
console.log(differenceInYears(new Date(2014, 6), new Date(2014, 0)));
  