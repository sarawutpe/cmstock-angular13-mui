import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal'
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { ThemePalette } from '@angular/material/core'
import { ProgressSpinnerMode } from '@angular/material/progress-spinner'
import { LoadingService } from '../services/loading.service'

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit, AfterViewInit {
  overlayRef: any

  @ViewChild('templatePortalContent') templatePortalContent!: TemplateRef<any>

  @Input() color: ThemePalette = 'primary'
  @Input() strokeWidth: number = 0
  @Input() diameter: number = 100
  @Input() mode: ProgressSpinnerMode = 'determinate'
  @Input() value: number = 50

  constructor(private loadingService: LoadingService, private _viewContainerRef: ViewContainerRef) {
    loadingService.indeterminate.subscribe({
      next: () => {
        this.mode = 'indeterminate'
      },
    })
    loadingService.determinate.subscribe({
      next: (value: number) => {
        this.mode = 'determinate'
        this.value = value
      },
    })
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadingService.attach(this.templatePortalContent, this._viewContainerRef)
  }
}
