import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'driver-service',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'driver-service-group' });

// Kafka topic names
export const TOPICS = {
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_CANCELLED: 'order.cancelled',
  ORDER_PAID: 'order.paid',
  ORDER_READY: 'order.ready',
  DRIVER_ASSIGNED: 'driver.assigned',
  DRIVER_LOCATION_UPDATED: 'driver.location.updated',
  DRIVER_STATUS_UPDATED: 'driver.status.updated',
  RESTAURANT_CREATED: 'restaurant.created',
  RESTAURANT_UPDATED: 'restaurant.updated',
};

export const initializeKafka = async () => {
  try {
    await producer.connect();
    await consumer.connect();
    console.log('Kafka connected successfully');
  } catch (error) {
    console.error('Failed to connect to Kafka:', error);
  }
};

export const disconnectKafka = async () => {
  try {
    await producer.disconnect();
    await consumer.disconnect();
    console.log('Kafka disconnected successfully');
  } catch (error) {
    console.error('Failed to disconnect from Kafka:', error);
  }
};
