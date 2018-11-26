import { mock } from '../__mocks__/mock.js';

describe('See mock at console log', () => {
  it('Should output', done => {
    mock.subscribe(val => console.log(val));
    setTimeout(() => {
      done();
    }, 1000);
  });
});
