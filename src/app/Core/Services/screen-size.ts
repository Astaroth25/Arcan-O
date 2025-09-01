import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private resize$!: Observable<string>;
  private _screenSizeSubject = new BehaviorSubject<string>('desktop');
  public screenSize$: Observable<string> = this._screenSizeSubject.asObservable();

  constructor() {
    const initialSize: string = this.getScreenSize();
    this._screenSizeSubject.next(initialSize);

    this.resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(100),
      map(() => this.getScreenSize())
    );

    this.resize$.subscribe(size => {
      this._screenSizeSubject.next(size);
    })

  }

  private getScreenSize(): string {
    const width: number = window.innerWidth;
    if (width <= 640) return 'mobile';
    else if (width >= 768) return 'desktop';
    else return 'tablet';
  }
}
