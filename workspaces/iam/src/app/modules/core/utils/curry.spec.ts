import { curry } from ".";

describe('curry', ()=> {
  it('should curry', ()=> {
    const add3 = curry((a, b, c) => a + b + c);

    expect(add3(1, 2, 3)).toBe(6); // 6
    expect(add3(1, 2)(3)).toBe(6); // 6
    expect(add3(1)(2, 3)).toBe(6); // 6
    expect(add3(1)(2)(3)).toBe(6); // 6

    const add4 = curry((a, b, c) => a + b + c, 1);
    expect(add4(2,3)).toBe(6);
    expect(add4(2)(3)).toBe(6);

  });

});


