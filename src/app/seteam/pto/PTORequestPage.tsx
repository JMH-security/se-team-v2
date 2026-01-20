"use client";

import { usePTO } from "@/contexts/PTOContext";
import PTORequestForm from "@/components/pto/PTORequestForm";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface PTORequestPageProps {
	userId: string;
	userEmail: string;
	userName: string;
}

const statusColors = {
	pending: "bg-yellow-100 text-yellow-800",
	approved: "bg-green-100 text-green-800",
	denied: "bg-red-100 text-red-800",
};

export default function PTORequestPage({
	userId,
	userEmail,
	userName,
}: PTORequestPageProps) {
	const { ptoRequests, isLoading, deletePTORequest } = usePTO();

	return (
		<div className="container mx-auto py-6 px-4 lg:max-w-[900px]">
			<h1 className="text-2xl font-bold mb-6">Request Paid Time Off</h1>

			{/* PTO Request Form */}
			<div className="mb-8">
				<PTORequestForm
					userId={userId}
					userEmail={userEmail}
					userName={userName}
				/>
			</div>

			{/* My PTO Requests */}
			<div className="border border-gray-300 rounded-lg p-4">
				<h2 className="text-xl font-medium text-secondary mb-4">
					My PTO Requests
				</h2>

				{isLoading ? (
					<p className="text-muted-foreground">Loading...</p>
				) : ptoRequests.length === 0 ? (
					<p className="text-muted-foreground">
						You have no PTO requests yet.
					</p>
				) : (
					<div className="space-y-4">
						{ptoRequests.map((request) => (
							<div
								key={request._id}
								className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
							>
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${
												statusColors[request.status]
											}`}
										>
											{request.status.charAt(0).toUpperCase() +
												request.status.slice(1)}
										</span>
										<span className="text-sm text-muted-foreground">
											{request.totalHours} hours
										</span>
									</div>
									<p className="font-medium">
										{format(new Date(request.startDate), "MMM d, yyyy")} -{" "}
										{format(new Date(request.endDate), "MMM d, yyyy")}
									</p>
									{request.reason && (
										<p className="text-sm text-muted-foreground mt-1">
											{request.reason}
										</p>
									)}
									{request.reviewNotes && (
										<p className="text-sm text-muted-foreground mt-1">
											<span className="font-medium">Review Notes:</span>{" "}
											{request.reviewNotes}
										</p>
									)}
									{request.reviewedByName && (
										<p className="text-xs text-muted-foreground mt-1">
											Reviewed by: {request.reviewedByName}
										</p>
									)}
								</div>
								{request.status === "pending" && (
									<div>
										<Button
											variant="destructive"
											size="sm"
											onClick={() => request._id && deletePTORequest(request._id)}
										>
											Cancel
										</Button>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
