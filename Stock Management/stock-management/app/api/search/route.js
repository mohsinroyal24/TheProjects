import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(request){
const query = request.nextUrl.searchParams.get("query")
// Replace the uri string with your connection string.
const uri = "mongodb+srv://mohsin1:oSh7hv3SC8mkDk5U@cluster0.mo9gerh.mongodb.net/";
const client = new MongoClient(uri);
  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    

    const products = await inventory.aggregate([
        {
          $match: {
            $or: [
              { slug: { $regex: query, $options: "i" } }
            ]
          }
        }
      ]).toArray()

    return NextResponse.json({sucess: true, products})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
 
    

  