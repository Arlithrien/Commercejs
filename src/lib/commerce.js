import Commerce from '@chec/commerce.js';



//this is the file we import to access the commerce.js API
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);

