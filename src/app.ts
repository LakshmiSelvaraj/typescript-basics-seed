const pizzas = [
    {name: "Pepperoni", toppings: ["Peperroni"]},
    {name: "Hawaian", toppings: ['Pineapple', 'ham']}
];

const mappedPizza = pizzas.map(function(pizza) {
    return pizza.name.toUpperCase();
});

const mappedPizzaArrowFunction = pizzas.map(pizza => {
    return pizza.name.toUpperCase();
});

const mappedPizzaImplicitArrowFunction = pizzas.map(pizza => pizza.name.toUpperCase());

console.log("Normal function: " + mappedPizza);
console.log("With Arrow function: " + mappedPizzaArrowFunction);
console.log("With implicit arrow function: " + mappedPizzaImplicitArrowFunction);

const pizza = {
    name: "Blazing Inferno",
    getName: function() {
        console.log(this.name);
    }
}

//The this in this function will be scoped to the timeout function. this will no longer refer to the pizza object
// const pizzaInTimeout = {
//     name: 'Blazing Inferno',
//     getName: function() {
//         setTimeout(function(){
//             console.log(this);
//         }, 100);
//     }
// }

//When the arrow function is used, a new scope is not created. this is not bound to anything new and hence will have whatever
//it was bound to earlier.
const pizzaInTimeout = {
    name: 'Blazing Inferno',
    getName: function() {
        setTimeout(() => {
            console.log(this.name);
        });
    }
}

const pizzaArrowFunctionEg = {
    name: 'Blazing Inferno',
    //getName: () => this.name; // this.name will not work here as it is on the actual object and there is no this at this point yet
    getName: () => pizza.name
}

pizza.getName();
pizzaInTimeout.getName();
console.log(pizzaArrowFunctionEg.getName());

const sauces = ['tomato', 'peri-peri'];

//Shorthand representation for creating an object
const order = {
    pizza, //instead of pizza:pizza 
    sauces //instad of sauces:sauces
};
console.log("Sauces in order created via shorthand representation: " + order.sauces);

const pizzaWithShorthandFunction = {
    name: "Pepperoni",
    sauces,
    getName() {
        return this.name;
    } //Instead of getName: function() {} or getName: () => {}
}

console.log("Pizza created with shorthand function notation: " + pizzaWithShorthandFunction.getName());

const sum = (...arr:any[]) => arr.reduce((previous, next) => previous + next);

console.log("Sum using rest parameters: " + sum(1,2,3,4,5));

//Array spread operator can be used for array concatentation

var toppings = ['Pepperoni'];
var newToppings = ['Pineapple'];
var allToppings = [...toppings, ...newToppings];
console.log("All toppings created via array spread operator: " + allToppings);

//Object destructuring
//When we use import { abc } from './var/etc'; We are picking certain properties from a module
const demoDestructureFunction = function({name: pizzaName, getName} : any) {
    return {pizzaName, getName};
}

const {pizzaName} = demoDestructureFunction(pizza);
console.log("Pizza name via object destructure: " + pizzaName);

//Array destructuring
const [firstPizza] = pizzas;
console.log("Pizza name via array destructure: " + firstPizza.name);

//Backtick - ES6 feature for multiline strings and for calling the javascript world from within the string
function normalizeCoupon(couponCode: string): string {
    return couponCode.toUpperCase();
}
console.log(`Normalized coupon is ${normalizeCoupon('pizza25')}`);

//Literal types and unions
let pizzaSize: string = 'small';
function selectPizzaSize(size: 'small' | 'medium' | 'large'): void {
    pizzaSize = size;
    
}
selectPizzaSize('medium')
console.log(`Pizza size selected via union and literal type is: ${pizzaSize}`);

//Function types

//Declare function with quantity as an optional parameter
let sumOrder: (price: number, quantity?: number) => number;
//Define function
sumOrder = (x, y = 1) => x*y;

console.log(`Price of one pizza: ${sumOrder(25)}`);
console.log(`Price of two pizzas: ${sumOrder(25, 2)}`);

//Tuple types - allow us to control how many elements in the array, the order of the elements and the datatype of the elements.
let pizzaTuple: [string, number, boolean];
pizzaTuple = ['Bacon', 1, true];

//Type assertions with the as keyword.
type Pizza = {
    name: string, getName: () => string
}
const serializedPizza = JSON.stringify(pizza);
function getPizzaNameFromSerializedPizza(obj: string): string {
    return (JSON.parse(obj) as Pizza).name;
}
console.log(`Type assertions: ${getPizzaNameFromSerializedPizza(serializedPizza)}`);

//Interfaces
type pizzaSizeType = 'small' | 'medium' | 'large';
interface Size {
    size: pizzaSizeType
}

interface PizzaInterface extends Size {
    name: string,
    toppings?: number //optional interface parameter - allows objects to be created without this property
    getName(): string,
    [key: number]: PizzaInterface, //Index signatures - allows us to add dynamic properties and to treat the object as a dictionary,
    [key: string]:any
}

function createPizza(name: string, size: pizzaSizeType) : PizzaInterface {
    return {
        name,
        size,
        getName() {
            return this.name;
        }
    }
}

const createdPizza = createPizza('Blazing Inferno', 'small');
createdPizza.toppings = 1;
createdPizza[1] = createdPizza;
createdPizza["xyz"] = "abc";
console.log(`${createdPizza.name} of size ${createdPizza.size} created with interfaces`);
console.log(`${createdPizza[1].name} of size ${createdPizza[1].size} created with interfaces`);
console.log(`${createdPizza.name}'s index signature property : ${createdPizza.xyz}`)

//Create class
interface SizesInterface {
    availableSizes: pizzaSizeType[];
}

//Abstract class can still have methods, you just cannot create an instance of the abstract class
abstract class PizzaSize implements SizesInterface{
    constructor(private sizes: pizzaSizeType[]) {}

    get availableSizes() {
        return this.sizes;
    }

    set availableSizes(sizes: pizzaSizeType[]) {
        this.sizes = sizes;
    }
};

class PizzaClass extends PizzaSize {
    constructor(readonly name:string, sizes:pizzaSizeType[]) {
        super(sizes);
    }

    static applyCoupon(percentage:number):string {
        return `PIZZA_DISCOUNT_${percentage}`;
    }
}

const pizzaSizeObj = new PizzaClass('Flaming Inferno', ['small', 'medium']);
console.log(`Pizza sizes via getter: ${pizzaSizeObj.availableSizes}`);
pizzaSizeObj.availableSizes = ['small', 'medium', 'large'];
console.log(`Pizza sizes via getter after chaning values via setter: ${pizzaSizeObj.availableSizes}`);
console.log(PizzaClass.applyCoupon(25));
