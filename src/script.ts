// VARIABLES
let expression = [], 
display = document.querySelector('.input'), 
result = document.querySelector('.output'), 
eq = expression.join('');


// FUNCTIONS
function ani(event:any){
    const el = event.target;
    el.classList.add('pressed');
    setTimeout(()=>{
    el.classList.remove('pressed');
    },100)
}
        

function press(e: any, event: any):any {
    if (eq.endsWith('<sup>')){
        expression.push(e.concat('</sup>'));
        refreshInput();
    } else if(e !== '=') {
        if(eq.endsWith('='))
            eraseAll();
        expression.push(e);
        refreshInput()
        
    } else if(e == '=') { 
        solve();
        refreshInput()
    } else {

    }

    
}

function eraser() {
    if(!eq.endsWith('=')) {
        expression = expression.slice(0,(expression.length -1))
        refreshInput()
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
    if(eq.endsWith('=')) {
        result.innerHTML = '';
        expression = expression.slice(0,(expression.length -1))
        refreshInput()
    }
}
function solve() {
    while(eq.indexOf('x') > -1) {
        eq = eq.replace('x','*');
    }
    while(eq.indexOf('÷') > -1) {
        eq = eq.replace('÷','/');
    }
    while(eq.indexOf('<sup>') > -1) {
        let x = eq[eq.indexOf('<sup>')-1];
        let y = eq[eq.indexOf('</sup>')-1];
        eq = eq.replace( `${x}<sup>${y}</sup>`, `Math.pow(${x},${y})`);
    }
    while(eq.indexOf('√') > -1) {
        let radicNs = radicP(eq);
        let str = radicNs.join('');
        let n = radicNs.length
        let subs =  eq.substring(eq.indexOf('√'), eq.indexOf('(') + n +2);
        eq = eq.replace(subs,`Math.sqrt(${str})`);

    }
    result.innerHTML = eval(eq);
    expression.push('=');
}
function radicP(str: string): any {
    let numbers = [];
    let b = str.indexOf('(');
    let e:number;
    if(str.indexOf(')') > -1)
        e = str.indexOf(')');
    else
        e = b+2;
        
        for(let i = b+1; i < e; i++) {
            numbers.push(str[i]);
        }
    return numbers
}

//  EVENTS

for(let i = 0; i < document.querySelectorAll('.keyboard--button').length; i++) {
    document.querySelectorAll('.keyboard--button')[i].addEventListener('click',ani);
    }