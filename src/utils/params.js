// 合拼n个对象为一个对象
export function _extend(des, src, override){
  if(src instanceof Array){
    for(let i = 0, len = src.length; i < len; i++)
      extend(des, src[i], override);
  }
  for( let i in src){
    if(override || !(i in des)){
      des[i] = src[i];
    }
  }
  return des;
}
