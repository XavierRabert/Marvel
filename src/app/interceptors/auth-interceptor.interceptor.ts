import { HttpInterceptorFn, HttpParams } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('assets/')) {
    return next(req);
  }

  const apiURL = 'https://gateway.marvel.com:443/v1/';

  const apiKey = [
    { key: 'apikey', value: 'fabb6414db4eabbe1ccf8eeed6560c38' },
    { key: 'ts', value: '1' },
    { key: 'hash', value: '289116acea265bb743726b5514d589e3' },
  ];

  let newParams = new HttpParams({ fromString: req.params.toString() });

  apiKey.map((param) => {
    newParams = newParams.append(param.key, param.value);
  });

  const authReq = req.clone({ url: apiURL + req.url, params: newParams });

  return next(authReq);
};
