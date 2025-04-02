export interface Region {
    id: number;
    name: string;
    contact: string;
}

export interface RegionResponse {
    success: boolean;
    message: string;
    data: Region
    errors?: {
        [K in keyof Region]?: string[];
    };
}
