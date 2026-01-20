"use client";

import { useEffect, useState } from "react";
import { usePTO } from "@/contexts/PTOContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";

const statusColors = {
	pending: "bg-yellow-100 text-yellow-800",
	approved: "bg-green-100 text-green-800",
	denied: "bg-red-100 text-red-800",
};

const statusFilters = [
	{ value: "", label: "All" },
	{ value: "pending", label: "Pending" },
	{ value: "approved", label: "Approved" },
	{ value: "denied", label: "Denied" },
];

export default function PTOApprovalPage() {
	const { ptoRequests, isLoading, fetchPTORequests, approvePTORequest } =
		usePTO();
	const [statusFilter, setStatusFilter] = useState("pending");
	const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
	const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

	useEffect(() => {
		fetchPTORequests({
			all: true,
			status: statusFilter || undefined,
		});
	}, [statusFilter]);

	const handleApprove = async (id: string) => {
		setProcessingIds((prev) => new Set(prev).add(id));
		try {
			await approvePTORequest(id, {
				status: "approved",
				reviewNotes: reviewNotes[id] || undefined,
			});
			toast.success("PTO request approved!");
			setReviewNotes((prev) => {
				const next = { ...prev };
				delete next[id];
				return next;
			});
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to approve request"
			);
		} finally {
			setProcessingIds((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
		}
	};

	const handleDeny = async (id: string) => {
		setProcessingIds((prev) => new Set(prev).add(id));
		try {
			await approvePTORequest(id, {
				status: "denied",
				reviewNotes: reviewNotes[id] || undefined,
			});
			toast.success("PTO request denied.");
			setReviewNotes((prev) => {
				const next = { ...prev };
				delete next[id];
				return next;
			});
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to deny request"
			);
		} finally {
			setProcessingIds((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
		}
	};

	return (
		<div className="container mx-auto py-6 px-4 lg:max-w-[1000px]">
			<div className="mb-4">
				<Link href="/seteam/admin">
					<Button variant="outline">Back to Admin</Button>
				</Link>
			</div>

			<h1 className="text-2xl font-bold mb-6">PTO Request Approvals</h1>

			{/* Status Filter */}
			<div className="mb-6 flex gap-2 flex-wrap">
				{statusFilters.map((filter) => (
					<Button
						key={filter.value}
						variant={statusFilter === filter.value ? "default" : "outline"}
						size="sm"
						onClick={() => setStatusFilter(filter.value)}
					>
						{filter.label}
					</Button>
				))}
			</div>

			{/* PTO Requests List */}
			<div className="border border-gray-300 rounded-lg p-4">
				{isLoading ? (
					<p className="text-muted-foreground">Loading...</p>
				) : ptoRequests.length === 0 ? (
					<p className="text-muted-foreground">
						No PTO requests found with the selected filter.
					</p>
				) : (
					<div className="space-y-4">
						{ptoRequests.map((request) => (
							<div
								key={request._id}
								className="border rounded-lg p-4 space-y-4"
							>
								<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<span className="font-semibold">{request.userName}</span>
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${
													statusColors[request.status]
												}`}
											>
												{request.status.charAt(0).toUpperCase() +
													request.status.slice(1)}
											</span>
										</div>
										<p className="text-sm text-muted-foreground">
											{request.userEmail}
										</p>
										<p className="font-medium mt-2">
											{format(new Date(request.startDate), "MMM d, yyyy")} -{" "}
											{format(new Date(request.endDate), "MMM d, yyyy")}
										</p>
										<p className="text-sm">
											<span className="font-medium">{request.totalHours}</span>{" "}
											hours requested
										</p>
										{request.reason && (
											<p className="text-sm text-muted-foreground mt-2">
												<span className="font-medium">Reason:</span>{" "}
												{request.reason}
											</p>
										)}
										{request.createdAt && (
											<p className="text-xs text-muted-foreground mt-2">
												Submitted:{" "}
												{format(
													new Date(request.createdAt),
													"MMM d, yyyy h:mm a"
												)}
											</p>
										)}
									</div>

									{request.status === "pending" && request._id && (
										<div className="flex flex-col gap-2 min-w-[200px]">
											<Textarea
												placeholder="Review notes (optional)"
												value={reviewNotes[request._id] || ""}
												onChange={(e) =>
													setReviewNotes((prev) => ({
														...prev,
														[request._id!]: e.target.value,
													}))
												}
												className="resize-none text-sm"
												rows={2}
											/>
											<div className="flex gap-2">
												<Button
													variant="default"
													size="sm"
													className="flex-1 bg-green-600 hover:bg-green-700"
													onClick={() => handleApprove(request._id!)}
													disabled={processingIds.has(request._id)}
												>
													{processingIds.has(request._id)
														? "..."
														: "Approve"}
												</Button>
												<Button
													variant="destructive"
													size="sm"
													className="flex-1"
													onClick={() => handleDeny(request._id!)}
													disabled={processingIds.has(request._id)}
												>
													{processingIds.has(request._id) ? "..." : "Deny"}
												</Button>
											</div>
										</div>
									)}

									{request.status !== "pending" && (
										<div className="text-sm text-muted-foreground">
											{request.reviewedByName && (
												<p>Reviewed by: {request.reviewedByName}</p>
											)}
											{request.reviewedAt && (
												<p>
													{format(
														new Date(request.reviewedAt),
														"MMM d, yyyy h:mm a"
													)}
												</p>
											)}
											{request.reviewNotes && (
												<p className="mt-1">
													<span className="font-medium">Notes:</span>{" "}
													{request.reviewNotes}
												</p>
											)}
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
