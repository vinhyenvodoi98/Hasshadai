import { connectToDatabase } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');

    try {
      const projectsCollection = db.collection('projects');

      if (id) {
        const result = await projectsCollection.findOne({ _id : new ObjectId(id)},{ projection: { avatarId: 1, name: 1, learnTier: 1, }});
        return NextResponse.json({ message: 'Get quests successfully', quests: result }, { status: 201 })
      } else {
        return NextResponse.json({ message: 'Invalid query parameters' }, { status: 400 })
      }
    } catch (error) {
      console.error('Error getting project:', error);
      return NextResponse.json({ error: 'Failed to get project' }, { status: 500 })
    }
  } catch (err:any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export { GET }