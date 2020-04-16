import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenerateRowIndexesPipe} from './generate-row-indexes.pipe';
import {NotificationService} from './notification.service';
import {MessageComponent} from './message.component';
import {ErrorHandlerService} from './error-handler.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    GenerateRowIndexesPipe,
    MessageComponent
  ],
  exports: [
    GenerateRowIndexesPipe,
    MessageComponent
  ],
  providers: [
    NotificationService,
    ErrorHandlerService
  ],
})
export class HelpersModule {
}
