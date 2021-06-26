function test() {
  return true;
}

//test2 = test;
test2 = undefined

//유효성 검사가 먼저 와야 한다.
if( test2 && test2()  ) {
  console.log(test());
}
else {
  console.log('check')
}