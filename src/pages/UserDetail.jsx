import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const UserDetail = () => {
    const param = useParams();
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch user details from API
    const getUserDetail = async () => {
        try {
            const res = await axios.get(`https://reqres.in/api/users/${param.id}`);
            setUser(res.data.data);
            setFormData(res.data.data); // Prefill form data
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUserDetail();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission (Update user details via API)
    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.patch(`https://reqres.in/api/users/${user.id}`, formData);
            setUser(res.data); // Update UI with API response
            toast.success("User details updated successfully!"); // Show success toast
            setIsEditing(false); // Close edit form
        } catch (err) {
            setError("Failed to update user details.");
            toast.error("Error updating user details."); // Show error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="grid h-screen bg-rose-50">
            <div className="flex flex-col items-center justify-center text-gray-900 h-3/4">
                {/* Profile Image */}
                <img
                    src={user.avatar}
                    alt={`Picture of ${user.first_name} ${user.last_name}`}
                    className="block object-cover object-center w-auto h-full rounded-lg shadow-md"
                />

                <div className="w-full -mt-10 md:w-3/4 lg:w-1/3">
                    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg md:justify-start md:items-start">
                        {/* User ID */}
                        <div className="flex items-baseline">
                            <span className="inline-block px-2 text-xs font-semibold tracking-wide text-teal-800 uppercase bg-teal-200 rounded-full">
                                id
                            </span>
                            <div className="ml-2 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                {user.id}
                            </div>
                        </div>

                        {/* User Name */}
                        <h4 className="my-2 text-xl font-extrabold leading-tight uppercase truncate">
                            {`${user.first_name} ${user.last_name}`}
                        </h4>

                        {/* Show User Details or Edit Form */}
                        {!isEditing ? (
                            <>
                                {/* Email */}
                                <div className="flex justify-start gap-x-2 lg:gap-x-14">
                                    <div>E-mail :</div>
                                    <div className="font-semibold text-teal-600 text-md">
                                        {user.email}
                                    </div>
                                </div>

                                {/* First Name */}
                                <div className="flex justify-start gap-x-2 lg:gap-x-6">
                                    <div>First Name :</div>
                                    <div className="font-semibold text-teal-600 text-md">
                                        {user.first_name}
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="flex justify-start gap-x-2 lg:gap-x-6">
                                    <div>Last Name :</div>
                                    <div className="font-semibold text-teal-600 text-md">
                                        {user.last_name}
                                    </div>
                                </div>

                                {/* Edit Button */}
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Edit Form */}
                                <div className="w-full mt-4">
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name || ""}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />

                                    <label className="block mt-2 text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name || ""}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />

                                    <label className="block mt-2 text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />

                                    {/* Save & Cancel Buttons */}
                                    <div className="flex gap-4 mt-4">
                                        {loading ? (
                                            <div className="flex justify-center items-center">
                                                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleSave}
                                                    className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                                                >
                                                    Save Changes
                                                </button>
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserDetail;

