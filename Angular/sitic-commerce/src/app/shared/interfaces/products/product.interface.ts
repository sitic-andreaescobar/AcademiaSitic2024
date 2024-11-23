export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    currentStock: number;
    maxStock: number;
    minStock: number;
    stockStatusId: number;
    imagePath?: string;
    createdAt: Date;
    updatedAt?: Date;
}