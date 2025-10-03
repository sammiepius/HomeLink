import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function UserProfile() {
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Profile Info */}
        <Card>
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
              <p className="text-gray-600">johndoe@email.com</p>
            </div>
          </div>
        </Card>

        {/* Saved Listings */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Saved Listings</h3>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">2-Bedroom Apartment</p>
                <p className="text-gray-600">₦1,200/mo • Lagos</p>
              </div>
              <Button>View</Button>
            </div>
            <div className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Studio Flat</p>
                <p className="text-gray-600">₦600/mo • Abuja</p>
              </div>
              <Button>View</Button>
            </div>
          </div>
        </Card>

        {/* Manage Account */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
          <div className="space-y-3">
            <Button className="w-full">Edit Profile</Button>
            <Button className="w-full" variant="secondary">
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
