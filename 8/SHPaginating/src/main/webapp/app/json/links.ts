import {First} from './first';
import {Prev} from './prev';
import {Self} from './self';
import {Next} from './next';
import {Last} from './last';
import {Profile} from './profile';
import {Search} from './search';

export interface Links {
 first: First;
 prev: Prev;
 next: Next;
 self: Self;
 last: Last;
 profile: Profile;
 search: Search;
}