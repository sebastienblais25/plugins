import { User } from './user';
export declare class FileMana {
    _breadcrumbs: string;
    _lastFolder: string;
    _liveFolder: string;
    _nextFolder: string;
    _value: any;
    _list: any[];
    constructor(nextFolder?: string);
    obtainArbo(log: User): void;
    setNavigation(): string;
    buildFolderList(): any[];
    buildFileList(): any[];
    buildUI(): string;
    buildClickablebreadcrumbs(): string;
    setbreacrumbsForNav(rank: string): void;
    setNextFolder(next: string): void;
}
