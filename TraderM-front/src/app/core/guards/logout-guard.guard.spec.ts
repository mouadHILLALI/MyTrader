import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { logoutGuardGuard } from './logout-guard.guard';


describe('logoutGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logoutGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
