import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import { elasticsearchClient, RESTAURANT_INDEX } from "../config/elasticsearch";

export const searchRestaurant = async (req: Request, res: Response) => {
    try {
        const city = (req.params.city as string) || "";
        const searchQuery = (req.query.searchQuery as string) || "";
        const selectedCuisines = (req.query.selectedCuisines as string) || "";
        const sortOption = (req.query.sortOption as string) || "lastUpdated";
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = 10;
        const from = (page - 1) * pageSize;

        // Build Elasticsearch query
        const mustClauses: any[] = [];
        const shouldClauses: any[] = [];

        // City filter
        if (city) {
            mustClauses.push({
                match: {
                    city: {
                        query: city,
                        operator: "and",
                    },
                },
            });
        }

        // Search query (restaurant name or cuisines)
        if (searchQuery) {
            shouldClauses.push(
                {
                    match: {
                        restaurantName: {
                            query: searchQuery,
                            boost: 2.0, // Boost restaurant name matches
                        },
                    },
                },
                {
                    match: {
                        cuisines: {
                            query: searchQuery,
                        },
                    },
                },
                {
                    nested: {
                        path: "menuItems",
                        query: {
                            match: {
                                "menuItems.name": {
                                    query: searchQuery,
                                },
                            },
                        },
                    },
                }
            );
        }

        // Cuisines filter
        if (selectedCuisines) {
            const cuisinesArray = selectedCuisines.split(",").map((c) => c.trim());
            mustClauses.push({
                terms: {
                    cuisines: cuisinesArray,
                },
            });
        }

        // Build the query
        const esQuery: any = {
            bool: {},
        };

        if (mustClauses.length > 0) {
            esQuery.bool.must = mustClauses;
        }

        if (shouldClauses.length > 0) {
            esQuery.bool.should = shouldClauses;
            esQuery.bool.minimum_should_match = 1;
        }

        // Sort options
        let sort: any[] = [];
        switch (sortOption) {
            case "restaurantName":
                sort.push({ "restaurantName.keyword": { order: "asc" } });
                break;
            case "deliveryPrice":
                sort.push({ deliveryPrice: { order: "asc" } });
                break;
            case "estimatedDeliveryTime":
                sort.push({ estimatedDeliveryTime: { order: "asc" } });
                break;
            case "lastUpdated":
            default:
                sort.push({ lastUpdated: { order: "desc" } });
                break;
        }

        // If there's a search query, add relevance score sorting
        if (searchQuery && shouldClauses.length > 0) {
            sort.unshift({ _score: { order: "desc" } });
        }

        // Execute Elasticsearch query
        const searchResponse = await elasticsearchClient.search({
            index: RESTAURANT_INDEX,
            body: {
                query: esQuery,
                sort: sort,
                from: from,
                size: pageSize,
            },
        });

        // Extract restaurant IDs from Elasticsearch results
        const restaurantIds = searchResponse.hits.hits.map((hit: any) => hit._source.restaurantId);

        // Fetch full restaurant documents from MongoDB
        const restaurants = await Restaurant.find({
            _id: { $in: restaurantIds },
        }).lean();

        // Maintain the order from Elasticsearch results
        const restaurantMap = new Map(
            restaurants.map((r: any) => [r._id.toString(), r])
        );
        const orderedRestaurants = restaurantIds
            .map((id: string) => restaurantMap.get(id))
            .filter((r: any) => r !== undefined);

        const total = searchResponse.hits.total;
        const totalCount = typeof total === "number" ? total : total?.value || 0;

        const response = {
            data: orderedRestaurants,
            pagination: {
                total: totalCount,
                page,
                pages: Math.ceil(totalCount / pageSize),
            },
        };

        res.json(response);
    } catch (error) {
        console.error("Elasticsearch search error:", error);
        // Fallback to MongoDB search if Elasticsearch fails
        try {
            const city = (req.params.city as string) || "";
            const searchQuery = (req.query.searchQuery as string) || "";
            const selectedCuisines = (req.query.selectedCuisines as string) || "";
            const sortOption = (req.query.sortOption as string) || "lastUpdated";
            const page = parseInt(req.query.page as string) || 1;

            let query: any = {};

            query["city"] = new RegExp(city, "i");

            if (selectedCuisines) {
                const cuisinesArray = selectedCuisines
                    .split(",")
                    .map((cuisine) => new RegExp(cuisine.trim(), "i"));
                query["cuisines"] = { $all: cuisinesArray };
            }

            if (searchQuery) {
                const searchTerms = searchQuery.split(",").map((item) => item.trim());
                query["$or"] = [
                    { restaurantName: { $in: searchTerms.map((term) => new RegExp(term, "i")) } },
                    { cuisines: { $in: searchTerms.map((term) => new RegExp(term, "i")) } },
                ];
            }

            const pageSize = 10;
            const skip = (page - 1) * pageSize;

            const restaurants = await Restaurant.find(query)
                .sort({ [sortOption]: 1 })
                .skip(skip)
                .limit(pageSize)
                .lean();

            const total = await Restaurant.countDocuments(query);

            const response = {
                data: restaurants,
                pagination: {
                    total,
                    page,
                    pages: Math.ceil(total / pageSize),
                },
            };

            res.json(response);
        } catch (fallbackError) {
            console.error("MongoDB fallback search error:", fallbackError);
            res.status(500).json({ message: "Error Occurred" });
        }
    }
}

export const getRestaurantById=async(req:Request, res:Response)=>{

    try{     
        
        const restaurant = await Restaurant.findById(req.params.restaurantId)

        if(!restaurant){

            return res.status(404).json({message:"Restaurant not found"})
        }

        res.json(restaurant);

    }catch(error){

        console.log(error);
        res.status(500).json({message:"Error Occured"})
    }
}

export default { searchRestaurant, getRestaurantById }
