console.log('Hello This Is Object Creation!')

let myCar = {
    color: 'red',
    make: 'Ford',
    model: 'Mustang',
    drive: function(miles){
        console.log(`${this.color} ${this.make} ${this.model} has driven ${miles} miles.`)
    }
};

// you can use a function as the value to a property key within an object. You can then later call that function by accessing the key and placing in any arguments(if any)

console.log(myCar);
console.log(typeof myCar);
console.log(myCar.drive);

myCar.drive(100)


// -----------

// ES5 OBJECT PROTOTYPES
// The class keyword wasn't added to JS until ES6

let testPerson = {};
testPerson.age = 22;
testPerson.name = 'John'
testPerson.jump = function(){console.log(this.name + ' just jumped')}
testPerson.squat = function(){console.log(this.name + ' just squated')}

console.table(testPerson);
testPerson.squat()


// Remember - to execute a function, you need to include the paranthesese 

// JS Functions are Objects!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions

function doesNothing(){};

console.log(doesNothing); // will output the actual function itself
console.log(typeof doesNothing); // 'function'

doesNothing.aKey = 'a value';
console.log(doesNothing.aKey); // It can hold both properties AND methods! 


const createPerson = function(name, age){
    createPerson.realName = name; // use .realName because .name is already a read-only property
    createPerson.age = age;
    createPerson.jump = function(){console.log(this.realName + ' just jumped')}
    createPerson.squat = function(){console.log(this.realName + ' just squated')}

    return createPerson;
}

let person1 = createPerson('Julie', 25);
console.log(person1)
person1.jump()
person1.squat()


// NEW Keyword
// The new keyword will initialize an object and return it for you. It will also allow the use of this keyword
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

const createPerson2 = function(name, age){
    this.name = name; // use .realName because .name is already a read-only property
    this.age = age;
    this.jump = function(){console.log(this.name + ' just jumped')}
    this.squat = function(){console.log(this.name + ' just squated')}
};

let person2 = new createPerson2('Mike', 33); // you need the 'new' keyword 
console.log(person2)

person2.jump();
person2.squat();


let sally = new createPerson2('Sally', 45);
let frank = new createPerson2('Frank', 76);

console.log(sally);
console.log(frank);
// The above method works fine, but it has an issue. Every time I make a new person, I have to save all the person's methods to memory. 
// So sally's jump function and frank's jump function are different in memory, and take up unecessary space 

// We can define a prototype for all objects to share to prevent wasting memory space. These are stored in memory once, and use the this 
// keyword to find the correct references. This saves tons of memory space, and prototypes should be used with ES5 objects when declaring 
// many instances of the same object.

// >>PROTOTYPE

let personMethods = {
    jump: function(){console.log(this.name + ' just jumped')},
    squat: function(){console.log(this.name + ' just squated')}
}

// now we can just reference these methods in creating a new object

const createPerson3 = function(name, age){
    this.name = name;
    this.age = age;
    this.jump = personMethods.jump;
    this.squat = personMethods.squat;
};

let hannah = new createPerson3('Hannah', 43);
let bill = new createPerson3('Bill', 14);

console.log(hannah.jump === bill.jump)// true - because these methods are the same in memory

// This way can be clunky ^ !! We have to worry about multiple things, the object, its methods, etc.

// Instead:
// Every function has a property called .prototype that is an object

function doNothing(){};

console.log(typeof doNothing.prototype); // object 

// We can leverage this to store information:

// Under the hood, there is an Object.crate(obj) happening 
// static method on the object that creates a new object, using an exisiting object as the prototype of the newly created (aka the backup look up)

let parent = {
    first: 'Seamus',
    last: 'Callahan',
    nationality: 'Irish'
};

console.log(parent);
// Syntax: Object.create(obj) -- obj is the other object blueprint you're passing in. So you can manually change values, but it will assume the other keys,vals from the object being used as a prototype

let child1 = Object.create(parent);
child1.first = 'Eileen'
console.log(child1)
console.log(child1.first);
console.log(child1.last);
console.log(child1.nationality);


// We can use the prototype object that is already built-in to every object we have, to manage a function (so it has 1 place in memory opposed to repeats) INSTEAD of creating an entirely different object outside that we point back to (as in Person3 where we have jump: newPerson3.jump)

const createPerson4 = function(name, age){
    this.name = name; 
    this.age = age;
}

createPerson4.prototype.jump = function(){console.log(this.name + ' just jumped')}
createPerson4.prototype.squat = function(){console.log(this.name + ' just squatted')}


let dan = new createPerson4('Dan', 28);
console.log(dan);

dan.jump();
dan.squat();