import { Client } from '@elastic/elasticsearch';

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const ELASTICSEARCH_USERNAME = process.env.ELASTICSEARCH_USERNAME;
const ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD;

const clientConfig: any = {
  node: ELASTICSEARCH_URL,
};

// Add authentication if credentials are provided
if (ELASTICSEARCH_USERNAME && ELASTICSEARCH_PASSWORD) {
  clientConfig.auth = {
    username: ELASTICSEARCH_USERNAME,
    password: ELASTICSEARCH_PASSWORD,
  };
}

export const elasticsearchClient = new Client(clientConfig);

export const RESTAURANT_INDEX = 'restaurants';

// Initialize Elasticsearch index with mapping
export const initializeElasticsearchIndex = async () => {
  try {
    const indexExists = await elasticsearchClient.indices.exists({
      index: RESTAURANT_INDEX,
    });

    if (!indexExists) {
      await elasticsearchClient.indices.create({
        index: RESTAURANT_INDEX,
        body: {
          mappings: {
            properties: {
              restaurantId: { type: 'keyword' },
              userId: { type: 'keyword' },
              restaurantName: {
                type: 'text',
                analyzer: 'standard',
                fields: {
                  keyword: { type: 'keyword' },
                },
              },
              city: {
                type: 'text',
                analyzer: 'standard',
                fields: {
                  keyword: { type: 'keyword' },
                },
              },
              country: {
                type: 'text',
                analyzer: 'standard',
                fields: {
                  keyword: { type: 'keyword' },
                },
              },
              cuisines: {
                type: 'text',
                analyzer: 'standard',
                fields: {
                  keyword: { type: 'keyword' },
                },
              },
              deliveryPrice: { type: 'float' },
              estimatedDeliveryTime: { type: 'integer' },
              imageUrl: { type: 'keyword' },
              lastUpdated: { type: 'date' },
              menuItems: {
                type: 'nested',
                properties: {
                  _id: { type: 'keyword' },
                  name: {
                    type: 'text',
                    analyzer: 'standard',
                  },
                  price: { type: 'float' },
                },
              },
            },
          },
          settings: {
            analysis: {
              analyzer: {
                custom_analyzer: {
                  type: 'standard',
                  stopwords: '_turkish_',
                },
              },
            },
          },
        },
      });
      console.log(`Elasticsearch index "${RESTAURANT_INDEX}" created successfully`);
    } else {
      console.log(`Elasticsearch index "${RESTAURANT_INDEX}" already exists`);
    }
  } catch (error) {
    console.error('Failed to initialize Elasticsearch index:', error);
    throw error;
  }
};

// Test Elasticsearch connection
export const testElasticsearchConnection = async () => {
  try {
    const health = await elasticsearchClient.cluster.health();
    console.log('Elasticsearch connection successful:', health);
    return true;
  } catch (error) {
    console.error('Elasticsearch connection failed:', error);
    return false;
  }
};

