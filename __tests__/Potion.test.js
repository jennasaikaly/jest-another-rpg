const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

//use this console.log to make sure that the info in the mock file is overwriting the 
//real potion constructor
console.log(new Potion());

test('creates a health potion object', () => {
    const potion = new Potion('health');
  //checking that potion has the name value of 'health'
    expect(potion.name).toBe('health');
    //
    expect(potion.value).toEqual(expect.any(Number));
  });

  test('creates a random potion object', () => {
    const potion = new Potion();
  
    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
  });