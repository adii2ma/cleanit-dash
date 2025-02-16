import CleaningDashboard from './components/cleaningdash';
import dbConnect from './lib/dbConnect';
import User from './models/User';
import { UserType } from './types/User'; // Import the interface
export default async function Home() {
  try {
    await dbConnect();
    console.log('Database connected successfully');

    const users = await User.find({ requestType: "Maintenance" }).lean<UserType[]>();



    const cleaningRecords = users.map(user => ({
      id: user._id.toString(), // Use `_id` for MongoDB
      name: user.name,
      time: user.updatedAt.toLocaleTimeString(),
      roomNo: user.roomno,
      email: user.email,
      completed: false  
    }));

    return <CleaningDashboard initialRecords={cleaningRecords} />;
  } catch (error) {
    console.error('Database connection failed:', error);
    return <div>Database connection failed. Please try again later.</div>;
  }
}
