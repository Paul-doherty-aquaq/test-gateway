/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { EnduserComponent } from '../../../../../../main/webapp/app/entities/enduser/enduser.component';
import { EnduserService } from '../../../../../../main/webapp/app/entities/enduser/enduser.service';
import { Enduser } from '../../../../../../main/webapp/app/entities/enduser/enduser.model';

describe('Component Tests', () => {

    describe('Enduser Management Component', () => {
        let comp: EnduserComponent;
        let fixture: ComponentFixture<EnduserComponent>;
        let service: EnduserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EnduserComponent],
                providers: [
                    EnduserService
                ]
            })
            .overrideTemplate(EnduserComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnduserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnduserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Enduser(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.endusers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
