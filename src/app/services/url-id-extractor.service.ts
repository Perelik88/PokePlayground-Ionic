import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlIdExtractorService {

  getIdFromUrl(url: string, type: string): number {
    const pattern = new RegExp(`/${type}/(\\d+)/`);
    const match = url.match(pattern);
    return match ? Number(match[1]) : -1;
  }
}
