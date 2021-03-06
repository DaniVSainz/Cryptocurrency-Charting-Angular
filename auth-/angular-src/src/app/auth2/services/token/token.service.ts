import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of as observableOf } from 'rxjs/observable/of';
import { filter } from 'rxjs/operators/filter';
import { share } from 'rxjs/operators/share';

import { NbTokenStorage } from './token-storage';
import { NbAuthToken } from './token';


/**
 * Service that allows you to manage authentication token - get, set, clear and also listen to token changes over time.
 */
@Injectable()
export class NbTokenService {

  protected token$: BehaviorSubject<NbAuthToken> = new BehaviorSubject(null);

  constructor(protected tokenStorage: NbTokenStorage) {
    this.publishStoredToken();
  }

  /**
   * Publishes token when it changes.
   * @returns {Observable<NbAuthToken>}
   */
  tokenChange(): Observable<NbAuthToken> {
    return this.token$
      .pipe(
        filter(value => !!value),
        share(),
      );
  }

  /**
   * Sets a token into the storage. This method is used by the NbAuthService automatically.
   *
   * @param {NbAuthToken} token
   * @returns {Observable<any>}
   */
  set(token: NbAuthToken): Observable<null> {
    this.tokenStorage.set(token);
    this.publishStoredToken();
    return observableOf(null);
  }

  /**
   * Sets a raw token into the storage. This method is used by the NbAuthService automatically.
   *
   * @param {string} token
   * @returns {Observable<any>}
   */
  setRaw(token: string): Observable<null> {
    this.tokenStorage.setRaw(token);
    this.publishStoredToken();
    return observableOf(null);
  }

  /**
   * Returns observable of current token
   * @returns {Observable<NbAuthToken>}
   */
  get(): Observable<NbAuthToken> {
    const token = this.tokenStorage.get();
    return observableOf(token);
  }

  /**
   * Removes the token and published token value
   *
   * @returns {Observable<any>}
   */
  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.publishStoredToken();
    return observableOf(null);
  }

  protected publishStoredToken() {
    this.token$.next(this.tokenStorage.get());
  }
}
