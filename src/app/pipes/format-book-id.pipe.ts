import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBookId'
})
export class FormatBookIdPipe implements PipeTransform {

  transform(value: number): string {
    let ref: string;
    ref = `Ref-${value}`
    return ref;
  }

}
