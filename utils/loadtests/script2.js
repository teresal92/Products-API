import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { Counter } from 'k6/metrics';

const myCounter = new Counter('http_req');
// export const options = {
//   vus: 100,
//   duration: '30s',
// };
export const options = {
  stages: [
    { duration: '30s', target: 1 },
    { duration: '30s', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 200 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default function () {
  const BASE_URL = 'http://localhost:3000/products-api';

  group('testing get /products/:productId endpoint', function() {
    const res = http.get(`${BASE_URL}/products/1`);
    sleep(1);
    // check(res, {
    //   'is status 200': r => r.status === 200,
    //   'transaction time < 2000ms': r => r.timings.duration < 2000,
    // });
  });
}