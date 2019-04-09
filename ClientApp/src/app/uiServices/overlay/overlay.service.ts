import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  _overlayRef: OverlayRef;

  constructor(private overlay: Overlay) { }

  open(config: AppOverlayConfig, component: any): OverlayRef {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    config['positionStrategy'] = positionStrategy;
    config['hasBackdrop'] = true;

    const overlayRef = this.overlay.create(config);
    this._overlayRef = overlayRef;
    const componentPortal = new ComponentPortal(component);
    overlayRef.attach(componentPortal);
    return overlayRef;
    
  }

  close() {
    this._overlayRef.detach();
  }
}

export interface AppOverlayConfig extends OverlayConfig { }
