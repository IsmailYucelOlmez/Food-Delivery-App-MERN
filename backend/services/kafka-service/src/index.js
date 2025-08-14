const { Kafka } = require('kafkajs');

// Kafka configuration
const kafka = new Kafka({
  clientId: 'kafka-topic-manager',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
});

const admin = kafka.admin();

// Define all topics that need to be created
const TOPICS = [
  {
    topic: 'user.created',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'user.updated',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'user.deleted',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'order.created',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'order.updated',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'order.cancelled',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'order.paid',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'order.ready',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'driver.assigned',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'driver.location.updated',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'driver.status.updated',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'restaurant.created',
    numPartitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'restaurant.updated',
    numPartitions: 1,
    replicationFactor: 1,
  },
];

// Wait for Kafka to be ready
const waitForKafka = async () => {
  console.log('Waiting for Kafka to be ready...');
  
  while (true) {
    try {
      await admin.connect();
      console.log('Kafka is ready!');
      break;
    } catch (error) {
      console.log('Kafka is not ready yet. Waiting...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Create topics
const createTopics = async () => {
  try {
    console.log('Creating topics...');
    
    // Get existing topics
    const existingTopics = await admin.listTopics();
    console.log('Existing topics:', existingTopics);
    
    // Filter out topics that already exist
    const topicsToCreate = TOPICS.filter(topic => !existingTopics.includes(topic.topic));
    
    if (topicsToCreate.length === 0) {
      console.log('All topics already exist!');
      return;
    }
    
    console.log('Topics to create:', topicsToCreate.map(t => t.topic));
    
    // Create topics
    await admin.createTopics({
      topics: topicsToCreate,
      waitForLeaders: true,
    });
    
    console.log('All topics created successfully!');
    
    // List all topics
    const allTopics = await admin.listTopics();
    console.log('Current topics:', allTopics);
    
  } catch (error) {
    console.error('Error creating topics:', error);
    throw error;
  }
};

// Main function
const main = async () => {
  try {
    await waitForKafka();
    await createTopics();
    
    console.log('Kafka service is ready!');
    
    // Keep the service running
    process.on('SIGINT', async () => {
      console.log('Shutting down...');
      await admin.disconnect();
      process.exit(0);
    });
    
    // Health check endpoint (optional)
    const http = require('http');
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'healthy', service: 'kafka-topic-manager' }));
    });
    
    server.listen(3005, () => {
      console.log('Health check server running on port 3005');
    });
    
  } catch (error) {
    console.error('Failed to start Kafka service:', error);
    process.exit(1);
  }
};

main();
