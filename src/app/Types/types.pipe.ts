import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'types'
})
export class TypesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
