import { BaseEntity } from './../../shared';

export class Enduser implements BaseEntity {
    constructor(
        public id?: number,
        public forename?: string,
        public surname?: string,
        public email?: string,
    ) {
    }
}
