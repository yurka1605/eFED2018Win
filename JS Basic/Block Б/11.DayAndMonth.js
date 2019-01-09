function getNames(today) {
    var todayMonth = today.getMonth();
    var todayDay = today.getDay();
    switch (todayMonth) {
        case 0:
            todayMonth = 'January';
            break;
        case 1:
            todayMonth = 'February';
            break;
        case 2:
            todayMonth = 'March';
            break;
        case 3:
            todayMonth = 'April';
            break;
        case 4:
            todayMonth = 'May';
            break;
        case 5:
            todayMonth = 'June';
            break;
        case 6:
            todayMonth = 'July';
            break;
        case 7:
            todayMonth = 'August';
            break;
        case 8:
            todayMonth = 'September';
            break;
        case 9:
            todayMonth = 'October';
            break;
        case 10:
            todayMonth = 'November';
            break;
        case 11:
            todayMonth = 'Decmber';
            break;
        }
    switch (todayDay) {
        case 0:
            todayDay = 'Sunday';
            break;
        case 1:
            todayDay = 'Monday';
            break;
        case 2:
            todayDay = 'Tuesday';
            break;
        case 3:
            todayDay = 'Wednesday';
            break;
        case 4:
            todayDay = 'Thursday';
            break;
        case 5:
            todayDay = 'Friday';
            break;
        case 6:
            todayDay = 'Saturday';
            break;
        }
    today = todayMonth + ', ' + todayDay;
    return today;
}
console.log(getNames(new Date()));  