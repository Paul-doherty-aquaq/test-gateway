import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Enduser } from './enduser.model';
import { EnduserService } from './enduser.service';

@Component({
    selector: 'jhi-enduser-detail',
    templateUrl: './enduser-detail.component.html'
})
export class EnduserDetailComponent implements OnInit, OnDestroy {

    enduser: Enduser;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private enduserService: EnduserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEndusers();
    }

    load(id) {
        this.enduserService.find(id)
            .subscribe((enduserResponse: HttpResponse<Enduser>) => {
                this.enduser = enduserResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEndusers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'enduserListModification',
            (response) => this.load(this.enduser.id)
        );
    }
}
