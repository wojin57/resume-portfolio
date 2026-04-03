import type { CaseStudy } from './index';

export const redisCaching: CaseStudy = {
  slug: 'redis-caching',
  title: {
    ko: 'Redis 캐싱으로 DB 쿼리 최적화',
    en: 'Reducing DB Queries with Redis Caching',
  },
  summary: {
    ko: '게임 목록 조회 API에 Redis 캐시 레이어를 추가하여 DB 부하를 70% 줄이고 평균 응답 시간을 400ms에서 80ms로 단축했습니다.',
    en: 'Added a Redis cache layer to the game list API, cutting DB load by 70% and reducing average response time from 400ms to 80ms.',
  },
  tags: ['Redis', 'Caching', 'Performance', 'Backend'],
  techStack: ['Node.js', 'Redis', 'PostgreSQL', 'ioredis'],
  problem: {
    ko: '게임 목록 페이지가 매 요청마다 DB에서 전체 게임 데이터를 조회했습니다. 게임 데이터는 자주 변경되지 않음에도 N+1 쿼리 문제까지 겹쳐 피크 타임에 응답 시간이 400ms를 초과하는 경우가 빈번했습니다.',
    en: 'The game list page queried the full game dataset from the DB on every request. Despite game data being mostly static, N+1 query issues compounded the problem, causing response times to frequently exceed 400ms during peak hours.',
  },
  plan: {
    ko: '읽기가 잦고 변경이 드문 게임 목록 데이터에 cache-aside 패턴을 적용하기로 했습니다. Redis에 TTL 기반 캐시를 구현하고, 게임 데이터가 업데이트될 때 해당 캐시 키를 무효화하는 전략을 설계했습니다.',
    en: 'Decided to apply the cache-aside pattern to game list data. Designed a TTL-based Redis cache and a cache invalidation strategy that deletes the relevant key when game data is updated.',
  },
  solution: {
    ko: 'ioredis 클라이언트로 게임 목록 API 미들웨어에 캐시 레이어를 추가했습니다. 캐시 미스 시 DB 조회 후 Redis에 5분 TTL로 저장하고, 관리자가 게임 데이터를 수정할 때 해당 키를 명시적으로 삭제하는 캐시 무효화 로직을 구현했습니다.',
    en: 'Added a cache layer to the game list API middleware using the ioredis client. On cache miss, DB results are stored in Redis with a 5-minute TTL. Implemented explicit cache key deletion when an admin updates game data.',
  },
  result: {
    ko: 'DB 쿼리 수가 약 70% 감소했습니다. 평균 응답 시간이 400ms에서 80ms로 단축되어 사용자 체감 속도가 크게 향상되었고, 피크 타임에도 DB 서버 CPU 사용률이 안정적으로 유지되었습니다.',
    en: 'DB query count dropped by ~70%. Average response time fell from 400ms to 80ms, noticeably improving user experience. DB server CPU utilization remained stable even during peak hours.',
  },
};
