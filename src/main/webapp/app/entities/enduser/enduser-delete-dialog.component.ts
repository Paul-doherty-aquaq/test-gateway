import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Enduser } from './enduser.model';
import { EnduserPopupService } from './enduser-popup.service';
import { EnduserService } from './enduser.service';

@Component({
    selector: 'jhi-enduser-delete-dialog',
    templateUrl: './enduser-delete-dialog.component.html'
})
export class EnduserDeleteDialogComponent {

    enduser: Enduser;

    constructor(
        private enduserService: EnduserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enduserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'enduserListModification',
                content: 'Deleted an enduser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enduser-delete-popup',
    template: ''
})
export class EnduserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enduserPopupService: EnduserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.enduserPopupService
                .open(EnduserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
