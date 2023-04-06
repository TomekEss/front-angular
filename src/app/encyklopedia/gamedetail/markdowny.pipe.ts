import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({name: 'markdowny'})
export class MarkdownyPipe implements PipeTransform {
  transform(content: string): string {
    return marked(content, { sanitize: true });
  }
}
