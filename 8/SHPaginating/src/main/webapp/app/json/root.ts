import {Embedded} from './embedded';
import {Links} from './links';
import {Page} from './page';

export interface Root {
 _embedded: Embedded;
 _links: Links;
 page: Page;
}