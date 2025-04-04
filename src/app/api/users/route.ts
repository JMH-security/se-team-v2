import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        //get all registered users in DB
        const users = await User.find({}).select('-password');  
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { userIds, role } = await request.json();

        await connectDB();
        await User.updateMany(
            { _id: { $in: userIds } },
            { $set: { role: role } }
        );
        const updatedUsers = await User.find({}).select('-password');
        return NextResponse.json(updatedUsers);
    } catch (error) {
        console.error('Error assigning role:', error);
        return NextResponse.json(
            { error: 'Failed to assign role' },
            { status: 500 }
        );
    }
} 