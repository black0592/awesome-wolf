var fs = require('fs');
var body = fs.readFileSync('./body').toString();
var footer = fs.readFileSync('./footer').toString();
var map = body.split('\r\n');
map.sort(
  function (param1,param2){
    return param1.localeCompare(param2);
  }
)
// console.log(map)
map = map.map((item) => (item.split('：')));
// console.log(map)

fs.writeFileSync('../index.md', body + footer);

console.log('reach eof');
console.log('啊'.localeCompare('不'),'才'.localeCompare('不'));
