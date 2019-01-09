function replaceQuotes(str) {
    var regexpFirst = /'(?![a-zA-Z])/g;
    var regexpSecond = /\s(')/g;
    str = str.replace(regexpFirst, '"');
    return str.replace(regexpSecond, ' "');
}
console.log(replaceQuotes("I'm the 'hero'. What your 'name'"));