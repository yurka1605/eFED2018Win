window.addEventListener('scroll', () =>{
    const scrollElem = document.documentElement;
    const header = document.getElementsByTagName('header')[0];
    const footer = document.getElementsByTagName('footer')[0];
    if(window.pageYOffset > 0) {
        header.style.top = 0;
        footer.style.bottom = 0;
        if (window.pageYOffset == scrollElem.scrollHeight - scrollElem.clientHeight) {
            footer.style.bottom = '3px';
        }
    } else {
        header.style.top = '3px';
    }
});