import { MeModule } from './me.module';

describe('MeModule', () => {
  let meModule: MeModule;

  beforeEach(() => {
    meModule = new MeModule();
  });

  it('should create an instance', () => {
    expect(meModule).toBeTruthy();
  });
});
