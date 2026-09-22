import { Redis } from '@upstash/redis';
import { createClient } from 'redis';

const STATE_KEY = 'rmkv:live-design';
const allowed = {
  colour: new Set(['red', 'maroon', 'blue', 'emerald', 'midnight', 'rose']),
  motif: new Set(['manga', 'dot', 'lotus']),
  border: new Set(['elephant', 'mayil', 'temple']),
};

let nativeRedisPromise;

function getRedisStore() {
  const restUrl =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const restToken =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

  if (restUrl && restToken) {
    return { type: 'rest', client: new Redis({ url: restUrl, token: restToken }) };
  }

  const nativeUrl =
    process.env.UPSTASH_REDIS_REST_REDIS_URL ||
    process.env.REDIS_URL;

  if (!nativeUrl) return null;
  return { type: 'native', url: nativeUrl };
}

async function getNativeRedis(url) {
  if (!nativeRedisPromise) {
    const client = createClient({ url });
    client.on('error', (error) => console.error('Redis connection error:', error.message));
    nativeRedisPromise = client.connect().then(() => client).catch((error) => {
      nativeRedisPromise = undefined;
      throw error;
    });
  }
  return nativeRedisPromise;
}

async function readState(store) {
  if (store.type === 'rest') return store.client.get(STATE_KEY);

  const client = await getNativeRedis(store.url);
  const value = await client.get(STATE_KEY);
  return value ? JSON.parse(value) : null;
}

async function writeState(store, state) {
  if (store.type === 'rest') return store.client.set(STATE_KEY, state);

  const client = await getNativeRedis(store.url);
  return client.set(STATE_KEY, JSON.stringify(state));
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  const redis = getRedisStore();

  if (!redis) {
    return response.status(503).json({ error: 'Remote synchronization is not configured.' });
  }

  if (request.method === 'GET') {
    const state = await readState(redis);
    return response.status(200).json(state || { updatedAt: 0 });
  }

  if (request.method === 'POST') {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    if (!body || !allowed.colour.has(body.colour) || !allowed.motif.has(body.motif) || !allowed.border.has(body.border)) {
      return response.status(400).json({ error: 'Invalid saree state.' });
    }

    const state = {
      colour: body.colour,
      motif: body.motif,
      border: body.border,
      updatedAt: Number(body.updatedAt) || Date.now(),
    };
    await writeState(redis, state);
    return response.status(200).json(state);
  }

  response.setHeader('Allow', 'GET, POST');
  return response.status(405).json({ error: 'Method not allowed.' });
}
