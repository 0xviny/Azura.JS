import { type NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGO_URL = process.env.MONGO_URL || "";
const COLLECTION_NAME = "demo_items";

let client: MongoClient | null = null;

async function getMongoClient() {
  if (!client) {
    client = new MongoClient(MONGO_URL);
    await client.connect();
  }
  return client;
}

export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);

    const items = await collection.find({}).toArray();

    return NextResponse.json({ items });
  } catch (error) {
    console.error("MongoDB GET error:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.value) {
      return NextResponse.json({ error: "Name and value are required" }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.insertOne({
      name: body.name,
      value: body.value,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("MongoDB POST error:", error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const client = await getMongoClient();
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.deleteMany({});

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("MongoDB DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete items" }, { status: 500 });
  }
}
