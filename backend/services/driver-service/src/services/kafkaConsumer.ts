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
        await consumer.subscribe({ topic: TOPICS.ORDER_READY, fromBeginning: true });

        // Subscribe to restaurant events
        await consumer.subscribe({ topic: TOPICS.RESTAURANT_CREATED, fromBeginning: true });
        await consumer.subscribe({ topic: TOPICS.RESTAURANT_UPDATED, fromBeginning: true });

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
                        case TOPICS.ORDER_READY:
                            await handleOrderReady(event);
                            break;
                        case TOPICS.RESTAURANT_CREATED:
                            await handleRestaurantCreated(event);
                            break;
                        case TOPICS.RESTAURANT_UPDATED:
                            await handleRestaurantUpdated(event);
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
    // Handle user creation in driver service if needed
};

const handleUserUpdated = async (event: any) => {
    console.log('Handling user updated event:', event);
    // Handle user updates in driver service if needed
};

const handleUserDeleted = async (event: any) => {
    console.log('Handling user deleted event:', event);
    // Handle user deletion in driver service if needed
};

const handleOrderCreated = async (event: any) => {
    console.log('Handling order created event:', event);
    // Notify available drivers about new order
    // Add to order queue for driver assignment
};

const handleOrderUpdated = async (event: any) => {
    console.log('Handling order updated event:', event);
    // Handle order updates in driver service
};

const handleOrderCancelled = async (event: any) => {
    console.log('Handling order cancelled event:', event);
    // Handle order cancellation in driver service
    // Release assigned driver if any
};

const handleOrderPaid = async (event: any) => {
    console.log('Handling order paid event:', event);
    // Start looking for available drivers
    // Assign driver to order
};

const handleOrderReady = async (event: any) => {
    console.log('Handling order ready event:', event);
    // Notify assigned driver that order is ready for pickup
    // Update driver status
};

const handleRestaurantCreated = async (event: any) => {
    console.log('Handling restaurant created event:', event);
    // Handle restaurant creation in driver service if needed
};

const handleRestaurantUpdated = async (event: any) => {
    console.log('Handling restaurant updated event:', event);
    // Handle restaurant updates in driver service if needed
};
