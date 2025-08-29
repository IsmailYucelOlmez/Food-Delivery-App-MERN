import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  retry: {
    initialRetryTime: 100,
    retries: 8
  }
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'auth-service-group' });

export const TOPICS = {
  USER_CREATED: 'user-created',
  USER_UPDATED: 'user-updated',
  USER_DELETED: 'user-deleted',
  AUTH_LOGIN: 'auth-login',
  AUTH_LOGOUT: 'auth-logout',
  AUTH_TOKEN_REFRESH: 'auth-token-refresh'
} as const;

export default kafka;
