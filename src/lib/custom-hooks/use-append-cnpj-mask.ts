import { useEffect } from "react";
import $ from 'jquery'

export const useApendCNPJMask = (id: string) => {
  useEffect(() => {
    // @ts-ignore
    import('jquery-mask-plugin').then(() => {
      $(`#${id}`).mask('00.000.000/0000-00')
    })
  }, [id])
};
