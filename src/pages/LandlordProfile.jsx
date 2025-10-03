import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function LandlordProfile() {
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
              <h2 className="text-2xl font-bold text-gray-800">Jane Smith</h2>
              <p className="text-gray-600">janesmith@email.com</p>
            </div>
          </div>
        </Card>

        {/* My Posted Apartments */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">My Posted Apartments</h3>
            <Button>+ New Listing</Button>
          </div>

          <div className="space-y-4">
            <div className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">3-Bedroom Duplex</p>
                <p className="text-gray-600">$2,500/mo • Abuja</p>
              </div>
              <div className="flex space-x-2">
                <Button>View</Button>
                <Button variant="secondary">Edit</Button>
              </div>
            </div>
            <div className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">1-Bedroom Flat</p>
                <p className="text-gray-600">$900/mo • Lagos</p>
              </div>
              <div className="flex space-x-2">
                <Button>View</Button>
                <Button variant="secondary">Edit</Button>
              </div>
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