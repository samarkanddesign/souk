/* tslint:disable */

/** The `Naive DateTime` scalar type represents a naive date and time withouttimezone. The DateTime appears in a JSON response as an ISO8601 formattedstring. */
export type NaiveDateTime = any;

export interface RootQueryType {
  categories: Category[] /** Get all categories */;
  category?: Category | null /** Get a single category by id or slug */;
  product?: Product | null /** Get a single product by id or slug */;
  productList?: PagedProducts | null /** Get a paginated list of products */;
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
  images: ProductImage[];
  listed: boolean;
  name: string;
  price: number;
  salePrice?: number | null;
  sku: string;
  slug: string;
  stockQty?: number | null;
  thumbnail?: ProductImage | null;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface PagedProducts {
  pagination: Pagination;
  products: Product[];
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
  updateProduct?: UpdateProductResponse | null /** Update an existing product */;
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

export interface UpdateProductResponse {
  errors?: (Error | null)[] | null;
  product?: Product | null;
}
export interface CategoryRootQueryTypeArgs {
  id?: string | null;
  slug?: string | null;
}
export interface ProductRootQueryTypeArgs {
  id?: string | null;
  slug?: string | null;
}
export interface ProductListRootQueryTypeArgs {
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
export interface UpdateProductRootMutationTypeArgs {
  description?: string | null;
  featured?: boolean | null;
  id: string;
  listed?: boolean | null;
  name?: string | null;
  price?: number | null;
  salePrice?: number | null;
  sku?: string | null;
  slug?: string | null;
  stockQty?: number | null;
}
