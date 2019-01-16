window.onload = function () {
    /* Tab click */
    var detailsTab = document.getElementsByClassName('detailsTab');
    var blockInfo = document.getElementsByClassName('blockInformation');
    function tabCheck(event) {
        var nameId = event.target.id;
        for (let j = 0; j < detailsTab.length; j++) {
            detailsTab[j].classList.remove('currentTab');
        }
        event.target.classList.add('currentTab');
        for (let k = 0; k < detailsTab.length; k++) {
           if (detailsTab[k].classList.contains('currentTab') === true) blockInfo[k].classList.add('currentBlock');
           else blockInfo[k].classList.remove('currentBlock');
        }
    }
    for (let i = 0; i < detailsTab.length; i++) {
    detailsTab[i].addEventListener('click', tabCheck);
    }
    var today = document.getElementById('today');
    var fiveDay = document.getElementById('fiveDay');
    var history = document.getElementById('historyWeather');
  
    today.addEventListener('click',function () {javascript:document.location.href='weather-details.html';});
    fiveDay.addEventListener('click',function () {javascript:document.location.href='index.html';});
    history.addEventListener('click',function () {javascript:document.location.href='historical-review.html';});
};