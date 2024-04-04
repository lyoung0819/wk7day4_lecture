console.log('Hello from closures.js')

//                                               >> JAVASCRIPT  CLOSURES  <<        

// A  closure is a function that references variables in the outser scope from its inner scope 
// the closure preserves the outer scope insitde its inner scope 
// (It remembers and preserves its outer scope within the inner scope)



// this function does 2 things: defines a function called multiply, and returns it (just creates & returns Multiply, it doesn't run it)
function createMultiplier(x){ 
    // defines a function called multiply - this is a closure!
    function multiply(y){
        return x * y
    }
    // returns the multiply function
    return multiply
} 

let fiveTimes = createMultiplier(5);
console.log(fiveTimes)

console.log(fiveTimes(10)) // 50 -- in the context of fiveTimes,x = 5
// console.log(x); // error: x is not defined // because globally, x is not defined 

let timesThree = createMultiplier(3);
console.log(timesThree)

console.log(timesThree(10)); // 30
console.log(timesThree(7)); // 21


// What we can do with this is MODIFY those variables and save them PRIVATELY

// Stateful Function
function outer(){
    let myVar = 1;
    function inner(){
        console.log(myVar++)
    }
    return inner;
}

// let adder equal the return value of outer --> the inner function
let adder = outer(); // adder = the return of outer function because with (), the function is executed 
console.log(adder)

adder();
adder();
adder();
adder();
adder();
adder();
adder();

// But if we try to access myVar:
// console.log(myVar)  // error: myVar is not defined


// Non self-invoking function 
// Step 1 - Create a function 
function sayHi(aName){
    console.log('Hi ' + aName)
}

// Step 2 - Invoke the function with any params
sayHi('Charlie')


// OR -> 
// IIFE = Immediately Invoked Function Expression
// (function definition)(params)

(function sayHi(aName){
    console.log('Hi ' + aName)
})('Claire');

// Create the adder (Which we'll call stepper) using an IIFE
const stepper = (function(){
    let count =1;
    return function(){
        console.log(count++)
    }
})()

console.log(stepper);
stepper();
stepper();
stepper();
stepper();
stepper();


