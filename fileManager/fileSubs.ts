import { Subject } from 'rxjs';

export class FileSubs {
    private _filemanager = new Subject();

    // observable function

    subsDrawPoint(file) {
        this._filemanager.next(file);
    }
}