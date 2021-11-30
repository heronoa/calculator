// VARIABLES
var expression = [], display = document.querySelector('.input'), result = document.querySelector('.output'), eq = expression.join('');
// FUNCTIONS
function ani(event) {
    var el = event.target;
    el.classList.add('pressed');
    setTimeout(function () {
        el.classList.remove('pressed');
    }, 100);
}
function press(e, event) {
    if (eq.endsWith('<sup>')) {
        expression.push(e.concat('</sup>'));
        refreshInput();
    }
    else if (e !== '=') {
        if (eq.endsWith('='))
            eraseAll();
        expression.push(e);
        refreshInput();
    }
    else if (e == '=') {
        solve();
        refreshInput();
    }
    else {
    }
}
function eraser() {
    if (!eq.endsWith('=')) {
        expression = expression.slice(0, (expression.length - 1));
        refreshInput();
    }
}
function eraseAll() {
    expression = [];
    eq = '';
    result.innerHTML = eq;
    refreshInput();
}
function refreshInput() {
    eq = expression.join('');
    display.innerHTML = eq;
}
function eraseEntry() {
    if (eq.endsWith('=')) {
        result.innerHTML = '';
        expression = expression.slice(0, (expression.length - 1));
        refreshInput();
    }
}
function solve() {
    while (eq.indexOf('x') > -1) {
        eq = eq.replace('x', '*');
    }
    while (eq.indexOf('÷') > -1) {
        eq = eq.replace('÷', '/');
    }
    while (eq.indexOf('<sup>') > -1) {
        var x = eq[eq.indexOf('<sup>') - 1];
        var y = eq[eq.indexOf('</sup>') - 1];
        eq = eq.replace("".concat(x, "<sup>").concat(y, "</sup>"), "Math.pow(".concat(x, ",").concat(y, ")"));
    }
    while (eq.indexOf('√') > -1) {
        var radicNs = radicP(eq);
        var str = radicNs.join('');
        var n = radicNs.length;
        var subs = eq.substring(eq.indexOf('√'), eq.indexOf('(') + n + 2);
        eq = eq.replace(subs, "Math.sqrt(".concat(str, ")"));
    }
    result.innerHTML = eval(eq);
    expression.push('=');
}
function radicP(str) {
    var numbers = [];
    var b = str.indexOf('(');
    var e;
    if (str.indexOf(')') > -1)
        e = str.indexOf(')');
    else
        e = b + 2;
    for (var i = b + 1; i < e; i++) {
        numbers.push(str[i]);
    }
    return numbers;
}
//  EVENTS
for (var i = 0; i < document.querySelectorAll('.keyboard--button').length; i++) {
    document.querySelectorAll('.keyboard--button')[i].addEventListener('click', ani);
}
