/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { EnduserDetailComponent } from '../../../../../../main/webapp/app/entities/enduser/enduser-detail.component';
import { EnduserService } from '../../../../../../main/webapp/app/entities/enduser/enduser.service';
import { Enduser } from '../../../../../../main/webapp/app/entities/enduser/enduser.model';

describe('Component Tests', () => {

    describe('Enduser Management Detail Component', () => {
        let comp: EnduserDetailComponent;
        let fixture: ComponentFixture<EnduserDetailComponent>;
        let service: EnduserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EnduserDetailComponent],
                providers: [
                    EnduserService
                ]
            })
            .overrideTemplate(EnduserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnduserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnduserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Enduser(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.enduser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
