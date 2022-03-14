import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProductBrandsModel } from '../shared/models/product-brands.model';
import { IProductTypeModel } from '../shared/models/product-type.model';
import { IProduct } from '../shared/models/product.model';
import { ShopParams } from '../shared/models/shop.params';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(private shopService: ShopService) {}
  @ViewChild('search', { static: true }) searchTerm!: ElementRef;
  products: IProduct[] = [];
  brands: IProductBrandsModel[] = [];
  types: IProductTypeModel[] = [];
  shopParams = new ShopParams();
  totalCount!: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (res) => {
        this.products = res!.data;
        this.shopParams.pageNumber = res!.pageIndex;
        this.shopParams.pageSize = res!.pageSize;
        this.totalCount = res!.count;
      },
      error: (err) => console.log(err),
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (res) => (this.brands = [{ id: 0, name: 'All' }, ...res]),
      error: (err) => console.log(err),
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (res) => (this.types = [{ id: 0, name: 'All' }, ...res]),
      error: (err) => console.log(err),
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: Event) {
    this.shopParams.sort = (event.target as HTMLInputElement).value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }

  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
