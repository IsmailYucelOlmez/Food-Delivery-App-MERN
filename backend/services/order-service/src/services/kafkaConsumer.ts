import { consumer, TOPICS } from '../config/kafka';

export const startKafkaConsumers = async () => {
    try {
        // Subscribe to user events
        await consumer.subscribe({ topic: TOPICS.USER_CREATED, fromBeginning: true });
        await consumer.subscribe({ topic: TOPICS.USER_UPDATED, fromBeginning: true });
        await consumer.subscribe({ topic: TOPICS.USER_DELETED, fromBeginning: true });

        // Subscribe to restaurant events
        await consumer.subscribe({ topic: TOPICS.RESTAURANT_CREATED, fromBeginning: true });
        await consumer.subscribe({ topic: TOPICS.RESTAURANT_UPDATED, fromBeginning: true });

        // Subscribe to driver events
        await consumer.subscribe({ topic: TOPICS.DRIVER_ASSIGNED, fromBeginning: true });
        await consumer.subscribe({ topic: TOPICS.DRIVER_LOCATION_UPDATED, fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }: { topic: string, partition: number, message: any }) => {
                try {
                    const value = message.value?.toString();
                    if (!value) return;

                    const event = JSON.parse(value);
                    console.log(`Received event from topic ${topic}:`, event);

                    switch (topic) {
                        case TOPICS.USER_CREATED:
                            await handleUserCreated(event);
                            break;
                        case TOPICS.USER_UPDATED:
                            await handleUserUpdated(event);
                            break;
                        case TOPICS.USER_DELETED:
                            await handleUserDeleted(event);
                            break;
                        case TOPICS.RESTAURANT_CREATED:
                            await handleRestaurantCreated(event);
                            break;
                        case TOPICS.RESTAURANT_UPDATED:
                            await handleRestaurantUpdated(event);
                            break;
                        case TOPICS.DRIVER_ASSIGNED:
                            await handleDriverAssigned(event);
                            break;
                        case TOPICS.DRIVER_LOCATION_UPDATED:
                            await handleDriverLocationUpdated(event);
                            break;
                        default:
                            console.log(`Unknown topic: ${topic}`);
                    }
                } catch (error) {
                    console.error(`Error processing message from topic ${topic}:`, error);
                }
            },
        });

        console.log('Kafka consumers started successfully');
    } catch (error) {
        console.error('Failed to start Kafka consumers:', error);
    }
};

// Event handlers
const handleUserCreated = async (event: any) => {
    console.log('Handling user created event:', event);
    // Here you can add logic to handle user creation
    // For example, create a user profile in order service if needed
};

const handleUserUpdated = async (event: any) => {
    console.log('Handling user updated event:', event);
    // Update user information in order service if needed
};

const handleUserDeleted = async (event: any) => {
    console.log('Handling user deleted event:', event);
    // Handle user deletion in order service
};

const handleRestaurantCreated = async (event: any) => {
    console.log('Handling restaurant created event:', event);
    // Handle restaurant creation in order service
};

const handleRestaurantUpdated = async (event: any) => {
    console.log('Handling restaurant updated event:', event);
    // Handle restaurant updates in order service
};

const handleDriverAssigned = async (event: any) => {
    console.log('Handling driver assigned event:', event);
    // Update order with driver information
};

const handleDriverLocationUpdated = async (event: any) => {
    console.log('Handling driver location updated event:', event);
    // Update driver location for order tracking
};
