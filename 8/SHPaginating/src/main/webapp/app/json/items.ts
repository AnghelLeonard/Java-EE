import {Embedded} from './embedded';
import {Links} from './links';
import {Page} from './page';
import {ItemLinks} from './itemlinks';

export interface Items {
 name: string;
 code: string;
 _links: ItemLinks;
}