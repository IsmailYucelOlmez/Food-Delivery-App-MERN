import mongoose, { Connection } from "mongoose";

class Database {
    private static instance: Database | null = null;
    private mongoConnection: Connection | null = null;


    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async connect(connectionString: string): Promise<void> {
        try {
            console.log("DB Connecting...");

            const db = await mongoose.connect(connectionString);

            this.mongoConnection = db.connection;
            console.log("DB Connected.");
        } catch (err) {
            console.error("MongoDB Connection Error:", err);
            process.exit(1);
        }
    }

    getConnection(): Connection | null {
        return this.mongoConnection;
    }
}

export default Database;