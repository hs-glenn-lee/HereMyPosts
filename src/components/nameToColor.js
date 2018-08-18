export default function (seedString) {
  const charArray = seedString.split('');
  let sum = 0;
  for(var i = 0; i < seedString.length; i++) {
    sum += seedString.charCodeAt(i);
  }
  if(sum < 0) {
    sum *= -1;
  }

  let r = (172 - 32) + (sum * 5) % 83;
  let g = (172 - 32) + (sum * 7) % 83;
  let b = (172 - 32) + (sum * 11) % 83;
  let ret = r.toString(16) + g.toString(16) + b.toString(16);

  return ret;
}
