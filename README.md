# Learning and understanding NodeJS

This is a repo containing all my notes and code exercises from the learning and understanding nodeJS course.

---

#### How Node modules really work

- **require** is a function, that you pass a 'path' too.
- **module.exports** is what the require function returns.
- this happens because our code is wrapped in a function that is passed these things as parameters.

#### JSON("JavaScript Object Notation”)

- A standard for structuring data.
- Inspired by JavaScript Object Literals.
- JS engines are built to understand it.
- No functions are sent in JSON, just data.
- The V8 engine has ability to convert JSON into a JavaScript Object.

```javascript
// Example JSON
{
  "firstname": "James",
  "lastname": "Hattersley",
}
```
