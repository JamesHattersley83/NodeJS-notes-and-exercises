var buf = new Buffer.from("Hello", "utf-8");

console.log(buf);
console.log(buf.toString());
console.log(buf.toJSON());

buf.write("wo");
console.log(buf.toString());
