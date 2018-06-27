import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    EnduserService,
    EnduserPopupService,
    EnduserComponent,
    EnduserDetailComponent,
    EnduserDialogComponent,
    EnduserPopupComponent,
    EnduserDeletePopupComponent,
    EnduserDeleteDialogComponent,
    enduserRoute,
    enduserPopupRoute,
    EnduserResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...enduserRoute,
    ...enduserPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EnduserComponent,
        EnduserDetailComponent,
        EnduserDialogComponent,
        EnduserDeleteDialogComponent,
        EnduserPopupComponent,
        EnduserDeletePopupComponent,
    ],
    entryComponents: [
        EnduserComponent,
        EnduserDialogComponent,
        EnduserPopupComponent,
        EnduserDeleteDialogComponent,
        EnduserDeletePopupComponent,
    ],
    providers: [
        EnduserService,
        EnduserPopupService,
        EnduserResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEnduserModule {}
