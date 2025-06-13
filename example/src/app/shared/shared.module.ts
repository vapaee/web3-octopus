// src/app/shared/shared.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    exports: [
        TranslateModule,
        CommonModule,
    ]
})
export class SharedModule {}
