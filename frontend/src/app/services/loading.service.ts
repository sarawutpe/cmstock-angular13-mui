import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private overlayRef: OverlayRef = this.createOverlay()
  private templatePortal: TemplatePortal<any> | undefined

  indeterminate: Subject<boolean> = new Subject()
  determinate: Subject<number> = new Subject()

  constructor(private overlay: Overlay) {
    this.indeterminate.subscribe({
      next: (show: boolean) => {
        if (show && !this.overlayRef.hasAttached()) {
          this.showSpiner()
        } else if (!show && this.overlayRef.hasAttached()) {
          this.hideSpiner()
        }
      },
    })
    this.determinate.subscribe({
      next: (number: number) => {
        if (number <= 100 && !this.overlayRef.hasAttached()) {
          this.showSpiner()
        } else if (number >= 100 && this.overlayRef.hasAttached()) {
          this.hideSpiner()
        }
      },
    })
  }

  createOverlay(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally(),
    })
  }

  private showSpiner() {
    this.overlayRef.attach(this.templatePortal)
  }

  private hideSpiner() {
    this.overlayRef.detach()
  }

  attach(templatePortalContent: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    this.templatePortal = new TemplatePortal(templatePortalContent, viewContainerRef)
  }
}
