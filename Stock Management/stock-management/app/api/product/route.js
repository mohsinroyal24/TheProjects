import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(request){
   
// Replace the uri string with your connection string.
const uri = "mongodb+srv://mohsin1:oSh7hv3SC8mkDk5U@cluster0.mo9gerh.mongodb.net/";
const client = new MongoClient(uri);
  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    const query = {}
    const allProducts = await inventory.find(query).toArray();
    return NextResponse.json({allProducts})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
 
export async function POST(request){

    let body = await request.json()
    console.log(body) 
   
    // Replace the uri string with your connection string.
    const uri = "mongodb+srv://mohsin1:oSh7hv3SC8mkDk5U@cluster0.mo9gerh.mongodb.net/";
    const client = new MongoClient(uri);
      try {
        const database = client.db('stock');
        const inventory = database.collection('inventory');
        const product = await inventory.insertOne(body);
        return NextResponse.json({product, ok:true})
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
      }
    