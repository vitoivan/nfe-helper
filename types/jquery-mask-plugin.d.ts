// types/jquery-mask-plugin.d.ts
import 'jquery'

declare global {
  interface JQuery {
    mask(mask: string, options?: any): JQuery;
    unmask(): JQuery;
  }
}
