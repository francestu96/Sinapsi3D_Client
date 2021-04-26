import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Locale {
	lang: string;
	data: Object;
}

@Injectable({
	providedIn: 'root'
})
export class TranslationLoaderService {
	private loadedTransation: string[] = [];
    /**
     * Constructor
     *
     * @param {TranslateService} _translateService
     */
	constructor(
		private _translateService: TranslateService,
		private http: HttpClient
	) {
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	loadTranslations(fileName: string): void {
		if (!this.loadedTransation.some(t => t === fileName)) {
			this._translateService.getLangs().forEach((locale) => {
				this.http.get(`/i18n/${fileName}/${locale}.json`).pipe(
					map((res: any) => <Locale>res)).subscribe(data => {
						this._translateService.setTranslation(data.lang, data.data, true);
					});
			});

			this.loadedTransation.push(fileName);
		}
	}
}
