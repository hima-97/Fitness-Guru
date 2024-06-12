// The compare.js file in the client/src/utils directory of your project provides a utility function named "compare" that is essential for sorting arrays of objects alphabetically based on their 'name' property. This function ensures that the sorting process is case-insensitive and standardized across the application.

// **Function Definition**
// - **Name:** compare
// - **Parameters:** a, b (objects)
// - **Returns:** Integer (-1, 0, 1)

// **Description:**
// This function compares the 'name' property of two objects, `a` and `b`, to determine their alphabetical order. It is designed to assist in sorting operations where objects need to be ordered by names, such as in lists of users, items, or other entities that have a 'name' attribute.

// **Functionality and Implementation Details:**
// 1. **Case Normalization:**
//    - The 'name' properties of both objects are converted to uppercase using the `.toUpperCase()` method. This step is crucial for ensuring that the comparison is case-insensitive, allowing the function to treat names like "alice" and "Alice" equivalently.
// 2. **Comparison Logic:**
//    - The function compares the uppercase versions of the 'name' properties.
//    - If `aName` (the name of the first object) is alphabetically before `bName` (the name of the second object), the function returns -1.
//    - If `aName` is alphabetically after `bName`, it returns 1.
//    - If both names are identical after case conversion, it returns 0.

// **Use Cases:**
// - Sorting user lists, product catalogs, or any collection where objects are displayed alphabetically by name.
// - Ensuring consistent ordering in dropdowns, tables, or search results.

// **Example Usage:**
// ```javascript
// const users = [{ name: 'Alice' }, { name: 'bob' }, { name: 'charlie' }];
// users.sort(compare);
// // Expected output: [{ name: 'Alice' }, { name: 'bob' }, { name: 'charlie' }]
// ```

// **Exporting:**
// - The function is exported as a named export, allowing it to be imported and used throughout different components or utility functions within the application where alphabetical sorting by name is needed.

// **Benefits:**
// - Enhances user experience by providing a predictable and understandable sorting order.
// - Increases the functionality and reusability of the code by centralizing the sorting logic in a single utility function.

// This utility function is a fundamental building block for features that require data presentation in an ordered manner, contributing significantly to the maintainability and cleanliness of the code.



export default function compare(a, b){
    const aName = a.name.toUpperCase()
    const bName = b.name.toUpperCase()
    if(aName < bName){
        return -1
    }else if(aName > bName){
        return 1n 
    }else{
        return 0
    }
}