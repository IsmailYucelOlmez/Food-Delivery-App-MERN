import { consumer, TOPICS } from '../config/kafka';

export const startKafkaConsumers = async () => {
    try {
        // Subscribe to user events
        await consumer.subscribe({ topic: TOPICS.USER_CREATED, fromBeginning: true });
        await consumer.subscribe({ topic: TOPICS.USER_UPDATED, fromBeginning: true });
        await consumer.subscribe({ topic: TOPICS.USER_DELETED, fromBeginning: true });

        // Subscribe to order events
        await consumer.subscribe({ topic: TOPICS.ORDER_CREATED, fromBeginning: true });
        await consumer.subscribe({ topic: TOPICS.ORDER_UPDATED, fromBeginning: true });
        await consumer.subscribe({ topic: TOPICS.ORDER_CANCELLED, fromBeginning: true });
        await consumer.subscribe({ topic: TOPICS.ORDER_PAID, fromBeginning: true });

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
                        case TOPICS.ORDER_CREATED:
                            await handleOrderCreated(event);
                            break;
                        case TOPICS.ORDER_UPDATED:
                            await handleOrderUpdated(event);
                            break;
                        case TOPICS.ORDER_CANCELLED:
                            await handleOrderCancelled(event);
                            break;
                        case TOPICS.ORDER_PAID:
                            await handleOrderPaid(event);
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
    // Handle user creation in restaurant service if needed
};

const handleUserUpdated = async (event: any) => {
    console.log('Handling user updated event:', event);
    // Handle user updates in restaurant service if needed
};

const handleUserDeleted = async (event: any) => {
    console.log('Handling user deleted event:', event);
    // Handle user deletion in restaurant service if needed
};

const handleOrderCreated = async (event: any) => {
    console.log('Handling order created event:', event);
    // Notify restaurant about new order
    // Update restaurant order queue
};

const handleOrderUpdated = async (event: any) => {
    console.log('Handling order updated event:', event);
    // Handle order updates in restaurant service
};

const handleOrderCancelled = async (event: any) => {
    console.log('Handling order cancelled event:', event);
    // Handle order cancellation in restaurant service
};

const handleOrderPaid = async (event: any) => {
    console.log('Handling order paid event:', event);
    // Start preparing the order
    // Update restaurant order status
};

const handleDriverAssigned = async (event: any) => {
    console.log('Handling driver assigned event:', event);
    // Update order with driver information
};

const handleDriverLocationUpdated = async (event: any) => {
    console.log('Handling driver location updated event:', event);
    // Track driver location for order delivery
};
