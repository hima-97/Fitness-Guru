// This code defines a function called "objectID" that returns an object (ObjectId) that can be used to generate unique string ids.
// The function takes in four parameters: m, d, h and s. 
// The first two are assigned the global objects Math and Date. 
// The h parameter is assigned the value 16 which is the base of the mathematical system used to represent the id. 
// The s parameter is assigned a function that takes in an input s and returns the floor value of it as a string of base h.
// The returned object (ObjectId) has a function that takes the current time in seconds divided by 1000, then concatenates it with a string of spaces with a length of h, where each space is replaced by a randomly generated number (based on the Math.random() function) with a length of h. This creates a unique id.
// The function is exported as the default export of the module, making it accessible to other parts of the application that import it.

const objectID = () => {
    const ObjectId = (
        m = Math,
        d = Date,
        h = 16,
        s = (s) => m.floor(s).toString(h),
    ) =>
        s(d.now() / 1000) +
        " ".repeat(h).replace(/./g, () => s(m.random() * h));
    return ObjectId;
};

export default objectID;
