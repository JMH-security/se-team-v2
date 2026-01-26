"use client";

import { useEffect, useState } from "react";
import { UserDocument } from "@/models/User";

export default function UserManagementClient() {
	const [users, setUsers] = useState<UserDocument[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [selectedRole, setSelectedRole] = useState<string>("user");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch users
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch("/api/users");
				if (!response.ok) {
					if (response.status === 403) {
						setError("You are not authorized to view this page.");
						return;
					}
					throw new Error("Failed to fetch users");
				}
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.error("Error fetching users:", error);
				setError("Failed to load users");
			} finally {
				setLoading(false);
			}
		};
		fetchUsers();
	}, []);

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

	if (error) {
		return <div className="p-6 text-red-500">{error}</div>;
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">User Management</h1>

			<div className="mb-4 flex justify-between items-center">
				<select
					value={selectedRole}
					onChange={(e) => setSelectedRole(e.target.value)}
					className="px-4 py-2 border rounded bg-blue-500"
				>
					<option value="user">User</option>
					<option value="admin">Admin</option>
					<option value="super-admin">Super Admin</option>
					<option value="approver">Approver</option>
					<option value="unauthorized">Unauthorized</option>
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
						onClick={() => assignRole("super-admin")}
						disabled={selectedUsers.length === 0}
						className={`px-4 py-2 rounded ${
							selectedUsers.length === 0
								? "bg-gray-300 cursor-not-allowed"
								: "bg-purple-500 hover:bg-purple-600"
						} text-white`}
					>
						Assign Super Admin
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
						<th className="border p-2">Last Login</th>
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
							<td className="border p-2">
								{user.lastLogin
									? new Date(user.lastLogin).toLocaleDateString()
									: "Never"}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{filteredUsers.length === 0 && (
				<p className="text-center py-4 text-gray-500">
					No users found with role: {selectedRole}
				</p>
			)}
		</div>
	);
}
