/* tslint:disable */

// ====================================================
// START: Typescript template
// ====================================================

// ====================================================
// Scalars
// ====================================================

/** The UUID scalar type represents a version 4 (random) UUID. Any binary not conforming to this format will be flagged. */
export type Uuid = any;

/** The `Naive DateTime` scalar type represents a naive date and time withouttimezone. The DateTime appears in a JSON response as an ISO8601 formattedstring. */
export type NaiveDateTime = any;

// ====================================================
// Types
// ====================================================

export interface RootQueryType {
  /** Get a basket by its identifier */
  basket: Basket | null;
  /** Get the saved cards for the current user */
  cards: Card[];
  /** Get all categories */
  categories: Category[];
  /** Get a single category by id or slug */
  category: Category | null;
  /** Get a single product by id or slug */
  product: Product | null;
  /** Get a paginated list of products */
  productList: PagedProducts | null;

  userAddresses: Address[];
}

export interface Basket {
  createdAt: NaiveDateTime;

  id: Uuid;

  items: BasketItem[];

  updatedAt: NaiveDateTime;
}

export interface BasketItem {
  id: string;

  product: Product;

  quantity: number;
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

  salePrice: number | null;

  sku: string;

  slug: string;

  stockQty: number | null;

  thumbnail: ProductImage | null;
}

export interface Category {
  id: string;

  order: number;

  products: Product[];

  slug: string;

  term: string;
}

export interface ProductImage {
  id: string;

  url: string;
}

export interface Card {
  brand: string;

  expMonth: number;

  expYear: number;

  funding: string;

  id: string;

  lastFour: string;
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

export interface Address {
  city: string;

  country: string;

  id: string;

  line1: string | null;

  line2: string | null;

  line3: string | null;

  name: string | null;

  phone: string | null;

  postcode: string;
}

export interface RootMutationType {
  /** Add a product to the basket using an existing basket identifier */
  addProductToBasket: Basket | null;

  createAddress: CreateAddressResponse;
  /** Create a new basket with a unique ID */
  createBasket: Basket;

  createProduct: CreateProductResponse | null;
  /** Obtain a JWT */
  login: Session | null;

  placeOrder: PlaceOrderResponse;
  /** Register a new user and login */
  register: RegisterResponse | null;
  /** Remove a product from a basket */
  removeProductFromBasket: Basket | null;

  saveCard: SaveCardResponse | null;
  /** Update an existing product */
  updateProduct: UpdateProductResponse | null;
}

export interface CreateAddressResponse {
  entity: Address | null;

  validation: Validation[] | null;
}
/** A validation error */
export interface Validation {
  key: string;

  reason: string;
}

export interface CreateProductResponse {
  entity: Product | null;

  validation: Validation[] | null;
}

export interface Session {
  jwt: string;

  user: User;
}

export interface User {
  email: string;

  id: string;

  name: string;
}

export interface PlaceOrderResponse {
  order: Order | null;

  status: string | null;
}

export interface Order {
  createdAt: NaiveDateTime;

  id: string;

  items: (OrderItem | null)[];

  note: string | null;

  shippingAddress: Address;

  status: string;

  total: number;

  user: User;
}

export interface OrderItem {
  description: string;

  order: Order;

  pricePaid: number;

  product: Product | null;
}

export interface RegisterResponse {
  entity: Session | null;

  validation: Validation[] | null;
}

export interface SaveCardResponse {
  cards: Card[] | null;

  error: string | null;
}

export interface UpdateProductResponse {
  entity: Product | null;

  validation: Validation[] | null;
}

// ====================================================
// Arguments
// ====================================================

export interface BasketRootQueryTypeArgs {
  basketId: Uuid | null;
}
export interface CategoryRootQueryTypeArgs {
  id: string | null;

  slug: string | null;
}
export interface ProductRootQueryTypeArgs {
  id: string | null;

  slug: string | null;
}
export interface ProductListRootQueryTypeArgs {
  page: number | null;

  pageSize: number | null;
}
export interface AddProductToBasketRootMutationTypeArgs {
  basketId: Uuid;

  productId: number;

  quantity: number;
}
export interface CreateAddressRootMutationTypeArgs {
  city: string;

  country: string;

  line1: string | null;

  line2: string | null;

  line3: string | null;

  name: string | null;

  phone: string | null;

  postcode: string;
}
export interface CreateProductRootMutationTypeArgs {
  description: string;

  featured: boolean | null;

  listed: boolean | null;

  name: string;

  price: number;

  salePrice: number | null;

  sku: string;

  slug: string;

  stockQty: number | null;
}
export interface LoginRootMutationTypeArgs {
  email: string;

  password: string;
}
export interface PlaceOrderRootMutationTypeArgs {
  basketId: Uuid;

  cardId: string;

  shippingAddressId: Uuid;
}
export interface RegisterRootMutationTypeArgs {
  email: string;

  name: string;

  password: string;
}
export interface RemoveProductFromBasketRootMutationTypeArgs {
  basketId: Uuid;

  itemId: number;
}
export interface SaveCardRootMutationTypeArgs {
  token: string;
}
export interface UpdateProductRootMutationTypeArgs {
  description: string | null;

  featured: boolean | null;

  id: string;

  listed: boolean | null;

  name: string | null;

  price: number | null;

  salePrice: number | null;

  sku: string | null;

  slug: string | null;

  stockQty: number | null;
}

// ====================================================
// END: Typescript template
// ====================================================
