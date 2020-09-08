/**
 * The base model.
 */
export interface Base {
    id: number;
    created_at: Date;
    updated_at: Date;
    message: string;
}

export interface Example extends Base { };
