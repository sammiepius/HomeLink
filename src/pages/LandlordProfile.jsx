import { useEffect, useState } from 'react';
import { Edit, Eye, PlusCircle, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LandlordDashboard() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [form, setForm] = useState({});


  // const [properties] = useState([
  //   {
  //     id: 1,
  //     title: '3-Bedroom Duplex',
  //     price: '₦2,500,000',
  //     location: 'Abuja',
  //     image:
  //       'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
  //   },
  //   {
  //     id: 2,
  //     title: '1-Bedroom Flat',
  //     price: '₦900,000',
  //     location: 'Lagos',
  //     image:
  //       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  //   },
  //   {
  //     id: 2,
  //     title: '1-Bedroom Flat',
  //     price: '₦900,000',
  //     location: 'Lagos',
  //     image:
  //       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  //   },
  //   {
  //     id: 2,
  //     title: '1-Bedroom Flat',
  //     price: '₦900,000',
  //     location: 'Lagos',
  //     image:
  //       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  //   },
  // ]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          profilePhoto: null,
        });

        if (data.profilePhoto) setAvatar(data.profilePhoto);
        console.log(data);
      } catch (err) {
        console.error('Fail to load user data', err);
      }
    };
    fetchUser();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          {avatar ? (
            <img
              src={avatar || '/default-avatar.png'}
              alt="avatar preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-md"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
              Avatar
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">{form.name}</h2>
            <p className="text-gray-600 mt-1">{form.email}</p>
            <p className="text-gray-600 mt-1">{form.phone}</p>
          </div>
          <div
            onClick={() => navigate('/landlordsettings')}
            className="flex px-5 py-3 text-gray-700 hover:text-teal-600 cursor-pointer">
            <Settings size={16} className="mr-2" />
          </div>
        </div>
        {/* Property List */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              My Posted Apartments
            </h3>
            <button
              onClick={() => navigate('/addproperties')}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition flex items-center gap-2">
              <PlusCircle size={18} />
              Add Listing
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* {properties.map((property) => ( */}
            <div
              // key={property.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                // src={property.image}
                // alt={property.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {/* {property.title} */}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {/* {property.location} */}
                </p>
                <p className="text-teal-600 font-bold mt-2">
                  {/* {property.price} */}
                </p>
                <div className="flex justify-between mt-4">
                  <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2 text-gray-700 text-sm">
                    <Eye size={16} />
                    View
                  </button>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2 text-sm">
                    <Edit size={16} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}
