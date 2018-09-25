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