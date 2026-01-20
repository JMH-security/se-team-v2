import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Vendor from "@/models/Vendor";
import { vendorSchema } from "@/lib/schemas/vendorSchema";
import { TWinTeamVendorPayload } from "@/types/vendor";

const WINTEAM_VENDOR_API_URL =
	"http://apim.myteamsoftware.com/wtnextgen/vendors/v1/api/vendors/";

// Helper function to send vendor to WinTeam API
async function syncVendorToWinTeam(
	vendorData: TWinTeamVendorPayload
): Promise<{ success: boolean; response?: unknown; error?: string }> {
	try {
		const response = await fetch(WINTEAM_VENDOR_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(vendorData),
		});

		if (!response.ok) {
			const errorText = await response.text();
			return {
				success: false,
				error: `WinTeam API error: ${response.status} - ${errorText}`,
			};
		}

		const responseData = await response.json();
		return { success: true, response: responseData };
	} catch (error) {
		return {
			success: false,
			error: `Failed to sync with WinTeam: ${error instanceof Error ? error.message : "Unknown error"}`,
		};
	}
}

// GET all vendors
export async function GET() {
	try {
		await dbConnect();
		const vendors = await Vendor.find({}).sort({ createdAt: -1 });
		return NextResponse.json(vendors);
	} catch (error) {
		console.error("Error fetching vendors:", error);
		return NextResponse.json(
			{ error: "Failed to fetch vendors" },
			{ status: 500 }
		);
	}
}

// POST create new vendor
export async function POST(request: Request) {
	try {
		await dbConnect();
		const data = await request.json();

		// Validate the data
		const validationResult = vendorSchema.safeParse(data);
		if (!validationResult.success) {
			return NextResponse.json(
				{ error: "Validation failed", details: validationResult.error.errors },
				{ status: 400 }
			);
		}

		// Remove empty _id to let MongoDB generate one
		const { _id, ...vendorData } = validationResult.data;
		const dataToCreate = _id ? validationResult.data : vendorData;

		// Create vendor in MongoDB
		const vendor = await Vendor.create(dataToCreate);

		// Prepare payload for WinTeam API
		const winTeamPayload: TWinTeamVendorPayload = {
			VendorNumber: vendor.VendorNumber,
			VendorName: vendor.VendorName,
			VendorTypeId: vendor.VendorTypeId,
			VendorStatus: vendor.VendorStatus,
			Address: vendor.Address,
			Phone: vendor.Phone,
			Fax: vendor.Fax,
			ParentVendorNumber: vendor.ParentVendorNumber,
			AccountNumber: vendor.AccountNumber,
			TaxID: vendor.TaxID,
			ContactsInformation: vendor.ContactsInformation,
			CustomFields: vendor.CustomFields,
		};

		// Sync to WinTeam API
		const syncResult = await syncVendorToWinTeam(winTeamPayload);

		if (syncResult.success) {
			// Update vendor with sync status
			await Vendor.findByIdAndUpdate(vendor._id, {
				wtSynced: true,
				wtSyncedAt: new Date(),
			});

			return NextResponse.json(
				{
					vendor,
					wtSync: { success: true, response: syncResult.response },
				},
				{ status: 201 }
			);
		} else {
			// Vendor created but sync failed
			return NextResponse.json(
				{
					vendor,
					wtSync: { success: false, error: syncResult.error },
					message: "Vendor created but failed to sync with WinTeam",
				},
				{ status: 201 }
			);
		}
	} catch (error) {
		console.error("Error creating vendor:", error);
		return NextResponse.json(
			{ error: "Failed to create vendor" },
			{ status: 500 }
		);
	}
}
