"use client";

import { useEffect, useState } from "react";
import { UserDocument } from "@/models/User";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function AdminUser() {
	const [users, setUsers] = useState<UserDocument[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [selectedRole, setSelectedRole] = useState<string>("user");
	const [isAuthorized, setIsAuthorized] = useState(true);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { data: session } = useSession();

	// Check if admin
	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (!session?.user?.email) {
					setLoading(false);
					router.push("/seteam");
					return;
				}

				// Retrieve current user from database
				const usersResponse = await fetch("/api/users");
				if (!usersResponse.ok) {
					if (usersResponse.status === 403) {
						setLoading(false);
						router.push("/seteam");
						return;
					}
				}
				const users = await usersResponse.json();
				const currentUser = users.find(
					(user: UserDocument) => user.email === session.user.email
				);

				// Check if user is an admin and redirect if not
				if (
					!currentUser ||
					!["admin", "ADMIN", "Admin", "super-admin"].includes(currentUser.role)
				) {
					setLoading(false);
					router.push("/seteam");
					return;
				}

				setIsAuthorized(true);
				setLoading(false);
			} catch (error) {
				console.error("Error checking authorization:", error);
				setLoading(false);
				router.push("/seteam");
			}
		};
		if (session !== undefined) {
			checkAuth();
		}
	}, [router, session]);

	// Fetch users
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch("/api/users");
				if (!response.ok) {
					throw new Error("Failed to fetch users");
				}
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};
		if (isAuthorized && !loading) {
			fetchUsers();
		}
	}, [isAuthorized, loading]);

	// Handle checkbox
	const handleSelect = (userId: string) => {
		setSelectedUsers((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId]
		);
	};

	// Handle role assign
	const assignRole = async (role: string) => {
		if (selectedUsers.length === 0) return;

		try {
			const response = await fetch("/api/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userIds: selectedUsers, role }),
			});

			if (response.ok) {
				const updatedUsers = await response.json();
				setUsers(updatedUsers);
				setSelectedUsers([]);
			}
		} catch (error) {
			console.error("Error assigning role:", error);
		}
	};

	const filteredUsers = users.filter(
		(user) => user.role.toLowerCase() === selectedRole.toLowerCase()
	);

	const handleSelectAll = () => {
		if (selectedUsers.length === filteredUsers.length) {
			setSelectedUsers([]);
		} else {
			setSelectedUsers(filteredUsers.map((user) => user._id));
		}
	};

	if (loading) {
		return <div className="p-6">Loading...</div>;
	}

	if (!isAuthorized) {
		return <div className="p-6">You are not authorized to view this page.</div>;
	}

	return (
		<>
			<div className="p-6">
				<div className="mb-4 flex justify-between items-center">
					<select
						value={selectedRole}
						onChange={(e) => setSelectedRole(e.target.value)}
						className="px-4 py-2 border rounded bg-blue-500"
					>
						<option value="unauthorized">Unauthorized</option>
						<option value="user">User</option>
						<option value="approver">Approver</option>
						<option value="admin">Admin</option>
					</select>

					<div className="flex gap-2">
						<button
							onClick={() => assignRole("user")}
							disabled={selectedUsers.length === 0}
							className={`px-4 py-2 rounded ${
								selectedUsers.length === 0
									? "bg-gray-300 cursor-not-allowed"
									: "bg-blue-500 hover:bg-blue-600"
							} text-white`}
						>
							Assign User Role
						</button>
						<button
							onClick={() => assignRole("approver")}
							disabled={selectedUsers.length === 0}
							className={`px-4 py-2 rounded ${
								selectedUsers.length === 0
									? "bg-gray-300 cursor-not-allowed"
									: "bg-green-500 hover:bg-green-600"
							} text-white`}
						>
							Assign Approver Role
						</button>
						<button
							onClick={() => assignRole("admin")}
							disabled={selectedUsers.length === 0}
							className={`px-4 py-2 rounded ${
								selectedUsers.length === 0
									? "bg-gray-300 cursor-not-allowed"
									: "bg-yellow-500 hover:bg-yellow-600"
							} text-white`}
						>
							Assign Admin Role
						</button>
						<button
							onClick={() => assignRole("unauthorized")}
							disabled={selectedUsers.length === 0}
							className={`px-4 py-2 rounded ${
								selectedUsers.length === 0
									? "bg-gray-300 cursor-not-allowed"
									: "bg-red-500 hover:bg-red-600"
							} text-white`}
						>
							Remove User
						</button>
					</div>
				</div>

				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-gray-500">
							<th className="border p-2 w-16">
								<input
									type="checkbox"
									checked={
										selectedUsers.length === filteredUsers.length &&
										filteredUsers.length > 0
									}
									onChange={handleSelectAll}
									className="w-5 h-5 cursor-pointer accent-blue-500"
								/>
							</th>
							<th className="border p-2">Name</th>
							<th className="border p-2">Email</th>
							<th className="border p-2">Role</th>
						</tr>
					</thead>
					<tbody className="bg-slate-500">
						{filteredUsers.map((user) => (
							<tr key={user._id}>
								<td className="border p-2 text-center">
									<input
										type="checkbox"
										checked={selectedUsers.includes(user._id)}
										onChange={() => handleSelect(user._id)}
										className="w-5 h-5 cursor-pointer accent-blue-500"
									/>
								</td>
								<td className="border p-2">{user.name}</td>
								<td className="border p-2">{user.email}</td>
								<td className="border p-2">{user.role}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
