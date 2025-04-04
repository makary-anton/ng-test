import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: 'user' | 'manager' = 'user';
  private isVisible = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateVisibility();
  }

  private updateVisibility() {
    if (this.authService.hasRole(this.appHasRole)) {
      if (!this.isVisible) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isVisible = true;
      }
    } else {
      this.viewContainerRef.clear();
      this.isVisible = false;
    }
  }
}
