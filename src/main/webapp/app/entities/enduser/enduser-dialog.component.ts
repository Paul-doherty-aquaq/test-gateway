import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Enduser } from './enduser.model';
import { EnduserPopupService } from './enduser-popup.service';
import { EnduserService } from './enduser.service';

@Component({
    selector: 'jhi-enduser-dialog',
    templateUrl: './enduser-dialog.component.html'
})
export class EnduserDialogComponent implements OnInit {

    enduser: Enduser;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private enduserService: EnduserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.enduser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.enduserService.update(this.enduser));
        } else {
            this.subscribeToSaveResponse(
                this.enduserService.create(this.enduser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Enduser>>) {
        result.subscribe((res: HttpResponse<Enduser>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Enduser) {
        this.eventManager.broadcast({ name: 'enduserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-enduser-popup',
    template: ''
})
export class EnduserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enduserPopupService: EnduserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enduserPopupService
                    .open(EnduserDialogComponent as Component, params['id']);
            } else {
                this.enduserPopupService
                    .open(EnduserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
