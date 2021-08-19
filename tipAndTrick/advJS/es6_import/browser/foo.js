
//export 를 사용한다.
function foo () {
  console.log('it is foo')

  let _elm = document.createElement('p')
  _elm.innerText = 'hello es6'

  document.body.appendChild(_elm)



}
var bar = "it is bar";
var kaa = "it is karrr";

export {foo,bar,kaa}
