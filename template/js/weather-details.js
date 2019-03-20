'use strict';
window.onload = () => {
    /* Tab click */
    const [detailsTab, blockInfo] = getDataPage('ClassName',['detailsTab', 'blockInformation']);
    const tabCheck = (event) => {
        for (let j = 0; j < detailsTab.length; j++) {
            detailsTab[j].classList.remove('currentTab');
        }
        event.target.classList.add('currentTab');
        for (let k = 0; k < detailsTab.length; k++) {
            if (detailsTab[k].classList.contains('currentTab') === true) blockInfo[k].classList.add('currentBlock');
            else blockInfo[k].classList.remove('currentBlock');
        }
    };
    for (let i = 0; i < detailsTab.length; i++) {
        detailsTab[i].addEventListener('click', tabCheck);
    }
};
