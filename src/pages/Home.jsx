import axios from "axios";
import { useState, useEffect } from "react";
import UserListComp from "../components/UserListComp/UserListComp";
import PaginationComp from "../components/PaginationComp/PaginationComp";

const Home = () => {
	const [userList, setUserList] = useState([]);
	const [pagination, setPagination] = useState({ currPage: 1 });

	// Fetch Users List
	const getUserList = async () => {
		try {
			const res = await axios.get(
				`https://reqres.in/api/users?page=${pagination?.currPage}`
			);
			setUserList(res?.data.data);
			const pageRes = {
				currPage: res.data.page,
				perPage: res.data.per_page,
				prevPage: res.data.page - 1,
				total: res.data.total,
				totalPages: res.data.total_pages,
			};
			setPagination(pageRes);
		} catch (err) {
			console.log(err);
			alert("Failed to load users.");
		}
	};

	// Handle User Deletion
	const handleDelete = async (userId) => {
		try {
			// 1. Send DELETE request to the API
			await axios.delete(`https://reqres.in/api/users/${userId}`);
	
			// 2. Update the UI by removing the deleted user
			setUserList(userList.filter(user => user.id !== userId));
	
			// 3. Show success message
			alert("User deleted successfully!");
		} catch (error) {
			console.error("Failed to delete user:", error);
			alert("Failed to delete user. Please try again.");
		}
	};


	// Handle Pagination
	const handleNext = () => {
		setPagination({
			...pagination,
			currPage: pagination?.currPage + 1,
			prevPage: pagination?.prevPage + 1,
		});
	};

	const handlePrev = () => {
		setPagination({
			...pagination,
			currPage: pagination?.currPage - 1,
			prevPage: pagination.prevPage - 1,
		});
	};

	// Fetch data on component mount and when pagination changes
	useEffect(() => {
		getUserList();
	}, []);

	useEffect(() => {
		getUserList();
	}, [pagination?.currPage]);

	return (
		<section className="flex flex-col items-center justify-center h-screen bg-rose-50">
			<div className="p-10 bg-white w-fit rounded-xl h-fit space-y-7 md:w-auto">
				<UserListComp userList={userList} handleDelete={handleDelete} />
				<PaginationComp
					handleNext={handleNext}
					handlePrev={handlePrev}
					pagination={pagination}
				/>
			</div>
		</section>
	);
};

export default Home;
