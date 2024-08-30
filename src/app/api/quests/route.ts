import { connectToDatabase } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/interfaces/OIDC";

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

const POST = async (req: NextRequest) => {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');
    const data = await req.json()
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    if(token){
      const decodedToken = jwtDecode<DecodedToken>(token);
      try {
        const projectsCollection = db.collection('projects');
        if (id) {
          const result = await projectsCollection.findOne({ _id : new ObjectId(id)},{ projection: { learnTier: 1, tiers: 1 }});

          let correctCount = 0;
          if(result){
            result.learnTier.questions.map((question:any, index:number) => {
              const userAnswers = data[index] || [];
              const correctAnswers = question.answers.filter((a: any) => a.isCorrect).map((a: any) => a.id);
              if (userAnswers.length === correctAnswers.length) {
                correctCount++;
              }
            })

            if(correctCount === result.learnTier.questions.length) {
              await projectsCollection.findOneAndUpdate(
                {_id: new ObjectId(id)},
                { $addToSet: { 'tiers.0.whiteList': decodedToken.eth_address } } // Add to the whitelist array if not already present
              );
              return NextResponse.json({ message: 'Congratulations you are on the write list' }, { status: 200 })
            } else{
              return NextResponse.json({ message: `Its a pity you only answered ${correctCount} questions correctly.` }, { status: 200 })
            }
          } else {
            return NextResponse.json({ message: 'Question not found' }, { status: 400 })
          }
          return NextResponse.json({ message: 'Get quests successfully', quests: result }, { status: 201 })
        } else {
          return NextResponse.json({ message: 'Invalid query parameters' }, { status: 400 })
        }
      } catch (error) {
        return NextResponse.json({ message: 'Invalid query parameters' }, { status: 400 })
      }
    } else {
      return NextResponse.json({ error: 'You need to input Authorization' }, { status: 500 })
    }
  } catch (err:any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export { GET, POST }