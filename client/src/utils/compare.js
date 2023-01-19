// This code defines a function named "compare" that takes in two parameters, "a" and "b". 
// This function is used to compare the 'name' property of two objects and determine which one comes first in alphabetical order.
// The function starts by converting the 'name' property of both objects to uppercase using the .toUpperCase() method.
// This is done to ensure that the comparison is case-insensitive, so that 'a' and 'A' are considered the same.
// Then the function compares the two names using if-else statements:
// -    If the name of the first object (aName) is alphabetically lower than the name of the second object (bName), the function returns -1.
// -    If the name of the first object (aName) is alphabetically greater than the name of the second object (bName), the function returns 1.
// -    Otherwise, the function returns 0.
// This function is exported so that it can be used in other parts of the application.
// It can be used to sort an array of objects by the name property in alphabetical order.

export default function compare(a, b){
    const aName = a.name.toUpperCase()
    const bName = b.name.toUpperCase()
    if(aName < bName){
        return -1
    }else if(aName > bName){
        return 1
    }else{
        return 0
    }
}