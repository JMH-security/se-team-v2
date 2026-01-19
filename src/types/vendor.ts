export interface TVendorContact {
	DisplayName?: string;
	FirstName?: string;
	LastName?: string;
	Email?: string;
	BusinessPhone?: number;
	RoleId?: number;
	TypeId?: number;
}

export interface TVendorAddress {
	Address1?: string;
	Address2?: string;
	City?: string;
	State?: string;
	Zip?: string;
}

export interface TVendorCustomField {
	fieldNumber?: number;
	value?: string;
}

export interface TVendor {
	_id?: string;
	VendorNumber?: number;
	VendorName: string;
	VendorTypeId?: number;
	VendorStatus: boolean;
	Address?: TVendorAddress;
	Phone?: string;
	Fax?: string;
	ParentVendorNumber?: number;
	AccountNumber?: string;
	TaxID?: string;
	ContactsInformation?: TVendorContact[];
	CustomFields?: TVendorCustomField[];
	wtSynced?: boolean;
	wtSyncedAt?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

// Payload for external WinTeam API
export interface TWinTeamVendorPayload {
	VendorNumber?: number;
	VendorName: string;
	VendorTypeId?: number;
	VendorStatus: boolean;
	Address?: TVendorAddress;
	Phone?: string;
	Fax?: string;
	ParentVendorNumber?: number;
	AccountNumber?: string;
	TaxID?: string;
	ContactsInformation?: TVendorContact[];
	CustomFields?: TVendorCustomField[];
}
