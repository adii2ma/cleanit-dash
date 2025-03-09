import CleaningDashboard from './components/cleaningdash';
import dbConnect from './lib/dbConnect';
import User from './models/User';
import { UserType } from './types/User'; // Import the interface
export default async function Home() {
  try {
    await dbConnect();
    console.log('Database connected successfully');

    // Fetch both cleaning and maintenance requests
    const cleaningUsers = await User.find({ requestType: "Cleaning" }).lean<UserType[]>();
    const maintenanceUsers = await User.find({ requestType: "Maintenance" }).lean<UserType[]>();

    const cleaningRecords = cleaningUsers.map(user => ({
      id: user._id.toString(),
      name: user.name,
      time: user.updatedAt.toLocaleTimeString(),
      roomNo: user.roomno,
      email: user.email,
      completed: false,
      requestType: "Cleaning" as const
    }));
    
    const maintenanceRecords = maintenanceUsers.map(user => ({
      id: user._id.toString(),
      name: user.name,
      time: user.updatedAt.toLocaleTimeString(),
      roomNo: user.roomno,
      email: user.email,
      completed: false,
      requestType: "Maintenance" as const
    }));

    return <CleaningDashboard 
      initialCleaningRecords={cleaningRecords} 
      initialMaintenanceRecords={maintenanceRecords} 
    />;
  } catch (error) {
    console.error('Database connection failed:', error);
    return <div>Database connection failed. Please try again later.</div>;
  }
}
