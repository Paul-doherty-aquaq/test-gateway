import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EnduserComponent } from './enduser.component';
import { EnduserDetailComponent } from './enduser-detail.component';
import { EnduserPopupComponent } from './enduser-dialog.component';
import { EnduserDeletePopupComponent } from './enduser-delete-dialog.component';

@Injectable()
export class EnduserResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const enduserRoute: Routes = [
    {
        path: 'enduser',
        component: EnduserComponent,
        resolve: {
            'pagingParams': EnduserResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Endusers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'enduser/:id',
        component: EnduserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Endusers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enduserPopupRoute: Routes = [
    {
        path: 'enduser-new',
        component: EnduserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Endusers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enduser/:id/edit',
        component: EnduserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Endusers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enduser/:id/delete',
        component: EnduserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Endusers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
