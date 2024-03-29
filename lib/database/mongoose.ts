import mongoose, {Mongoose} from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}
// every time we try and access the data base,

export const connectToDatabase = async () => {
    // first we check if we already have a cached connection, exit immediatly to save performance
    if (cached.conn) return cached.conn;
    // if not then check if the mongoDb is not null
    if (!MONGODB_URL) throw new Error('Missing Mongo URL');
    // and then try to make a new connection to mongo DB
    cached.promise = 
        cached.promise || 
        mongoose.connect(MONGODB_URL, {
            dbName: "visualizxr", 
            bufferCommands: false
        });

    cached.conn = await cached.promise;

    return cached.conn;
}