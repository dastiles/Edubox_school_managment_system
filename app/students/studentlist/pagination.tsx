import React  from 'react';
import  Link  from 'next/link';

export function itemRender(current:any, type:any, originalElement:any) {
    if (type === "prev") {
      return <Link href="#">Previous</Link>;
    }
    if (type === "next") {
      return <Link href="#">Next</Link>;
    }
    return originalElement;
  }
  
  export function onShowSizeChange(current:any, pageSize:any) {
     console.log(current, pageSize);
  }