import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(items: any[], search: string): any[] {
    if (!search) return items;
    search = search.toLowerCase();
    return items.filter(p => p.name.toLowerCase().includes(search));
  }

}
