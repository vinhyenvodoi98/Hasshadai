import { connectToDatabase } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const { db } = await connectToDatabase();

    try {
      const data = await req.json()
      // TODO validate data
      const projectsCollection = db.collection('projects');
      const result = await projectsCollection.insertOne({
        creator: data.creator,
        avatarId: data.avatarId,
        bgId: data.bgId,
        name: data.name,
        description: data.description,
        ownerAddress: data.ownerAddress,
        tokenAddress: data.tokenAddress,
        contacts: data.contacts,
        learnTier: data.learnTier,
        startAt: new Date(data.startAt),
        endAt: new Date(data.endAt),
      });
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
    const id = searchParams.get('id');
    const status = searchParams.get('status');

    try {
      const projectsCollection = db.collection('projects');

      if (id) {
        const result = await projectsCollection.findOne({ _id : new ObjectId(id)});
        return NextResponse.json({ message: 'Get projects successfully', project: result }, { status: 201 })
      } else if (creator) {
        // Get all projects by creator
        const result = await projectsCollection.find({creator}).toArray();
        return NextResponse.json({ message: 'Get projects successfully', projects: result }, { status: 201 })
      } else if (status) {
        // Get all projects with status
        var result
        if (status === "upcomming") {
          result = await projectsCollection.find({endAt: { $gt: new Date() }}).toArray();
          return NextResponse.json({ message: 'Get projects successfully', projects: result }, { status: 201 })
        } else if (status === "finished" ) {
          result = await projectsCollection.find({endAt: { $lt: new Date() }}).toArray();
          return NextResponse.json({ message: 'Get projects successfully', projects: result }, { status: 201 })
        } else {
          return NextResponse.json({ message: 'Invalid status parameters' }, { status: 400 })
        }
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

const PUT = async (req: NextRequest) => {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');
    const projectsCollection = db.collection('projects');
    const data = await req.json()
    try {
      if (id) {
        const result = await projectsCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: {
          creator: data.creator,
          avatarId: data.avatarId,
          bgId: data.bgId,
          name: data.name,
          description: data.description,
          ownerAddress: data.ownerAddress,
          tokenAddress: data.tokenAddress,
          contacts: data.contacts,
          learnTier: data.learnTier,
          startAt: new Date(data.startAt),
          endAt: new Date(data.endAt),
        }});
        if (result && result.matchedCount === 0) {
          return NextResponse.json({ error: 'No document found with the provided ID' }, { status: 404 })
        } else {
            return NextResponse.json({ message: 'Document updated successfully' }, { status: 200 })
        }
      } else {
        return NextResponse.json({ message: 'Invalid query parameters' }, { status: 400 })
      }
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    }
  } catch (err:any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
export { POST, GET, PUT }