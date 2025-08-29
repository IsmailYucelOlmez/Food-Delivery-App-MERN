import { consumer, TOPICS } from '../config/kafka';
import User from '../models/user';

export const startKafkaConsumer = async () => {
  try {
    await consumer.connect();
    console.log('Auth Service Kafka consumer connected');

    // Subscribe to topics
    await consumer.subscribe({
      topics: [
        TOPICS.USER_CREATED,
        TOPICS.USER_UPDATED,
        TOPICS.USER_DELETED
      ],
      fromBeginning: false
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const value = JSON.parse(message.value?.toString() || '{}');
          console.log(`Received message from topic ${topic}:`, value);

          switch (topic) {
            case TOPICS.USER_CREATED:
              await handleUserCreated(value);
              break;
            case TOPICS.USER_UPDATED:
              await handleUserUpdated(value);
              break;
            case TOPICS.USER_DELETED:
              await handleUserDeleted(value);
              break;
            default:
              console.log(`Unknown topic: ${topic}`);
          }
        } catch (error) {
          console.error(`Error processing message from topic ${topic}:`, error);
        }
      }
    });

    console.log('Auth Service Kafka consumer started successfully');

  } catch (error) {
    console.error('Failed to start Kafka consumer:', error);
  }
};

const handleUserCreated = async (data: any) => {
  try {
    console.log('Handling user created event:', data);
    // Auth service might need to sync user data or perform additional operations
    // For now, just log the event
  } catch (error) {
    console.error('Error handling user created event:', error);
  }
};

const handleUserUpdated = async (data: any) => {
  try {
    console.log('Handling user updated event:', data);
    // Auth service might need to sync user data or perform additional operations
    // For now, just log the event
  } catch (error) {
    console.error('Error handling user updated event:', error);
  }
};

const handleUserDeleted = async (data: any) => {
  try {
    console.log('Handling user deleted event:', data);
    // Auth service might need to sync user data or perform additional operations
    // For now, just log the event
  } catch (error) {
    console.error('Error handling user deleted event:', error);
  }
};

export const stopKafkaConsumer = async () => {
  try {
    await consumer.disconnect();
    console.log('Auth Service Kafka consumer disconnected');
  } catch (error) {
    console.error('Error disconnecting Kafka consumer:', error);
  }
};
