import { Project } from "@/interfaces/project";
import { connectToDatabase } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const { db } = await connectToDatabase();

    try {
      const data = await req.json()
      // TODO validate data
      const projectsCollection = db.collection('projects');
      const result = await projectsCollection.insertOne(data);
      return NextResponse.json({ message: 'Project added successfully', projectId: result.insertedId }, { status: 201 })
    } catch (error) {
      console.error('Error adding project:', error);
      return NextResponse.json({ error: 'Failed to add project' }, { status: 500 })
    }
  } catch (err:any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

const GET = async (req: NextRequest) => {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const creator = searchParams.get('creator');
    try {
      const projectsCollection = db.collection('projects');
      const result = await projectsCollection.find({creator}).toArray();
      return NextResponse.json({ message: 'Get projects successfully', projects: result }, { status: 201 })
    } catch (error) {
      console.error('Error getting project:', error);
      return NextResponse.json({ error: 'Failed to get project' }, { status: 500 })
    }
  } catch (err:any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export { POST, GET }