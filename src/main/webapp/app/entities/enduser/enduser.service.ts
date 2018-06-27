import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Enduser } from './enduser.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Enduser>;

@Injectable()
export class EnduserService {

    private resourceUrl =  SERVER_API_URL + 'microservice/api/endusers';

    constructor(private http: HttpClient) { }

    create(enduser: Enduser): Observable<EntityResponseType> {
        const copy = this.convert(enduser);
        return this.http.post<Enduser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(enduser: Enduser): Observable<EntityResponseType> {
        const copy = this.convert(enduser);
        return this.http.put<Enduser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Enduser>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Enduser[]>> {
        const options = createRequestOption(req);
        return this.http.get<Enduser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Enduser[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Enduser = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Enduser[]>): HttpResponse<Enduser[]> {
        const jsonResponse: Enduser[] = res.body;
        const body: Enduser[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Enduser.
     */
    private convertItemFromServer(enduser: Enduser): Enduser {
        const copy: Enduser = Object.assign({}, enduser);
        return copy;
    }

    /**
     * Convert a Enduser to a JSON which can be sent to the server.
     */
    private convert(enduser: Enduser): Enduser {
        const copy: Enduser = Object.assign({}, enduser);
        return copy;
    }
}
