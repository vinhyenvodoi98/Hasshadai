import { Project } from "@/interfaces/project";
import { connectToDatabase } from "@/lib/mongo";
import { NextResponse } from "next/server";

const POST = async (req: Request) => {
  try {
    const { db } = await connectToDatabase();

    try {
      const { name, description }  = await req.json()
      if (!name || !description) {
        return NextResponse.json({ error: 'Missing required fields: name, description' }, { status: 400 })
      }
      const projectsCollection = db.collection('projects');
      const result = await projectsCollection.insertOne({ name, description } as Project);
      return NextResponse.json({ message: 'Project added successfully', projectId: result.insertedId }, { status: 201 })
    } catch (error) {
      console.error('Error adding project:', error);
      return NextResponse.json({ error: 'Failed to add project' }, { status: 500 })
    }
  } catch (err:any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export { POST }