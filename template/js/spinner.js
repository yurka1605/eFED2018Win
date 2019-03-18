const overlay = document.getElementsByClassName('overlay')[0];
const spinner = document.getElementsByClassName('spinner')[0];
const sun = document.getElementById('sun');
const body = document.getElementsByTagName('body')[0];
async function hideSpinner() {
    await setTimeout(() => {
        spinner.style.display = 'none';
        overlay.style.display = 'none';
        body.style.overflow = 'auto';
    }, 2000);
}
async function twistSpinner() {
    spinner.style.display = 'block';
    overlay.style.display = 'block';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    sun.classList.add('sun');
    await setTimeout(function() {
        sun.classList.remove('sun');
        sun.classList.add('path');
    },1000);
}
