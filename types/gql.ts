/* tslint:disable */

/** The `Naive DateTime` scalar type represents a naive date and time withouttimezone. The DateTime appears in a JSON response as an ISO8601 formattedstring. */
export type NaiveDateTime = any;

export interface RootQueryType {
  categories: Category[] /** Get all categories */;
  category?: Category | null /** Get a single category by id or slug */;
  product?: Product | null /** Get a single product by id or slug */;
  products?: PagedProducts | null /** Get a paginated list of products */;
}

export interface Category {
  id: string;
  order: number;
  products: Product[];
  slug: string;
  term: string;
}

export interface Product {
  categories: Category[];
  createdAt: NaiveDateTime;
  description: string;
  featured: boolean;
  id: string;
  listed: boolean;
  name: string;
  price: number;
  salePrice?: number | null;
  sku: string;
  slug: string;
  stockQty?: number | null;
}

export interface PagedProducts {
  items: Product[];
  pagination: Pagination;
}
/** Pagination information for a paged query */
export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalEntries: number;
  totalPages: number;
}

export interface RootMutationType {
  createProduct?: CreateProductResponse | null;
}

export interface CreateProductResponse {
  errors?: (Error | null)[] | null;
  product?: Product | null;
}
/** A validation error */
export interface Error {
  key: string;
  reason: string;
}
export interface CategoryRootQueryTypeArgs {
  id?: string | null;
  slug?: string | null;
}
export interface ProductRootQueryTypeArgs {
  id?: string | null;
  slug?: string | null;
}
export interface ProductsRootQueryTypeArgs {
  page?: number | null;
}
export interface CreateProductRootMutationTypeArgs {
  description: string;
  featured?: boolean | null;
  listed?: boolean | null;
  name: string;
  price: number;
  salePrice?: number | null;
  sku: string;
  slug: string;
  stockQty?: number | null;
}
