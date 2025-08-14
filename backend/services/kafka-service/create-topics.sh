#!/bin/bash

# Wait for Kafka to be ready
echo "Waiting for Kafka to be ready..."
until kafka-topics --bootstrap-server localhost:9092 --list > /dev/null 2>&1; do
    echo "Kafka is not ready yet. Waiting..."
    sleep 5
done

echo "Kafka is ready! Creating topics..."

# Define all topics that need to be created
TOPICS=(
    "user.created"
    "user.updated"
    "user.deleted"
    "order.created"
    "order.updated"
    "order.cancelled"
    "order.paid"
    "order.ready"
    "driver.assigned"
    "driver.location.updated"
    "driver.status.updated"
    "restaurant.created"
    "restaurant.updated"
)

# Create each topic if it doesn't exist
for topic in "${TOPICS[@]}"; do
    echo "Checking if topic '$topic' exists..."
    
    if kafka-topics --bootstrap-server localhost:9092 --topic "$topic" --describe > /dev/null 2>&1; then
        echo "Topic '$topic' already exists"
    else
        echo "Creating topic '$topic'..."
        kafka-topics --bootstrap-server localhost:9092 --create --topic "$topic" --partitions 1 --replication-factor 1
        echo "Topic '$topic' created successfully"
    fi
done

echo "All topics created successfully!"

# List all topics
echo "Current topics:"
kafka-topics --bootstrap-server localhost:9092 --list

# Keep the container running
echo "Kafka service is ready. Keeping container alive..."
tail -f /dev/null
