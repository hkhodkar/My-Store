import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { IPagination } from '../shared/models/pagination.model';
import { IProductBrandsModel } from '../shared/models/product-brands.model';
import { IProductTypeModel } from '../shared/models/product-type.model';
import { ShopParams } from '../shared/models/shop.params';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl: string = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(map((res) => res.body));
  }

  getTypes() {
    return this.http.get<IProductTypeModel[]>(
      this.baseUrl + 'products/GetPrductTypes'
    );
  }

  getBrands() {
    return this.http.get<IProductBrandsModel[]>(
      this.baseUrl + 'products/GetPrductBrands'
    );
  }
}
