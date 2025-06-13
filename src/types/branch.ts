export interface Branch {
    id: number;
    name: string;
    contact: string;
}

export interface BranchResponse {
    success: boolean;
    message: string;
    data: Branch
    errors?: {
        [K in keyof Branch]?: string[];
    };
}