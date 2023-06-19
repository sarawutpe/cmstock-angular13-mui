import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

interface Test {
  a: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  destroyed = new Subject<void>()
  breakpointXSmall: boolean = false

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ])

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.breakpointXSmall = true
        } else {
          this.breakpointXSmall = false
        }
      })
  }
  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }
}
