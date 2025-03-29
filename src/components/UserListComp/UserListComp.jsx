import { Link } from "react-router-dom";
const UserListComp = (props) => {
	const { userList,handleDelete } = props;

	return (
		<div className="space-y-4">
		<h2 className="text-2xl font-bold text-rose-700">User List</h2>
		<div className="grid grid-cols-1 gap-4">
			{userList.map((user) => (
				<div key={user.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
					<div className="flex items-center space-x-4">
						<img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.first_name} />
						<div>
							<p className="font-medium text-gray-900">
								{user.first_name} {user.last_name}
							</p>
							<p className="text-sm text-gray-500">{user.email}</p>
						</div>
					</div>
					<div className="flex space-x-2">
						<Link to={`user/${user.id}`}>
						<button
							
							className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center transition-colors duration-200"
						>
							Details
						</button>
						</Link>
						
						<button
							onClick={() => handleDelete(user.id)}
							className="text-white bg-rose-600 hover:bg-rose-700 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center transition-colors duration-200"
						>
							Delete
						</button>
						
					</div>
				</div>
			))}
		</div>
	</div>
	);
};

export default UserListComp;