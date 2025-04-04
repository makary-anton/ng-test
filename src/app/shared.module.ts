import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from './directives/has-role.directive';
import { TimeAgoPipe } from './pipes/time-ago';

@NgModule({
  declarations: [
  ],
  imports: [
    HasRoleDirective,
    TimeAgoPipe,
    CommonModule
  ],
  exports: [
    HasRoleDirective,
    TimeAgoPipe
  ]
})
export class SharedModule {}