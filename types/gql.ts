/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql';

type Resolver<Result, Args = any> = (
  parent: any,
  args: Args,
  context: any,
  info: GraphQLResolveInfo,
) => Promise<Result> | Result;

/** The UUID scalar type represents a version 4 (random) UUID. Any binary not conforming to this format will be flagged. */
export type UUID = any;

/** The `Naive DateTime` scalar type represents a naive date and time withouttimezone. The DateTime appears in a JSON response as an ISO8601 formattedstring. */
export type NaiveDateTime = any;

export interface RootQueryType {
  basket: Basket | null /** Get a basket by its identifier */;
  cards: Card[] /** Get the saved cards for the current user */;
  categories: Category[] /** Get all categories */;
  category: Category | null /** Get a single category by id or slug */;
  product: Product | null /** Get a single product by id or slug */;
  productList: PagedProducts | null /** Get a paginated list of products */;
  userAddresses: Address[];
}

export interface Basket {
  createdAt: NaiveDateTime;
  id: UUID;
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
  addProductToBasket: Basket | null /** Add a product to the basket using an existing basket identifier */;
  createAddress: CreateAddressResponse;
  createBasket: Basket /** Create a new basket with a unique ID */;
  createProduct: CreateProductResponse | null;
  login: Session | null /** Obtain a JWT */;
  placeOrder: PlaceOrderResponse;
  register: RegisterResponse | null /** Register a new user and login */;
  removeProductFromBasket: Basket | null /** Remove a product from a basket */;
  saveCard: Card[];
  updateProduct: UpdateProductResponse | null /** Update an existing product */;
}

export interface CreateAddressResponse {
  entity: Address | null;
  validation: (Validation | null)[] | null;
}
/** A validation error */
export interface Validation {
  key: string;
  reason: string;
}

export interface CreateProductResponse {
  entity: Product | null;
  validation: (Validation | null)[] | null;
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
  validation: (Validation | null)[] | null;
}

export interface UpdateProductResponse {
  entity: Product | null;
  validation: (Validation | null)[] | null;
}
export interface BasketRootQueryTypeArgs {
  basketId: UUID | null;
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
}
export interface AddProductToBasketRootMutationTypeArgs {
  basketId: UUID;
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
  basketId: UUID;
  cardId: string;
  shippingAddressId: UUID;
}
export interface RegisterRootMutationTypeArgs {
  email: string;
  name: string;
  password: string;
}
export interface RemoveProductFromBasketRootMutationTypeArgs {
  basketId: UUID;
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

export namespace RootQueryTypeResolvers {
  export interface Resolvers {
    basket?: BasketResolver /** Get a basket by its identifier */;
    cards?: CardsResolver /** Get the saved cards for the current user */;
    categories?: CategoriesResolver /** Get all categories */;
    category?: CategoryResolver /** Get a single category by id or slug */;
    product?: ProductResolver /** Get a single product by id or slug */;
    productList?: ProductListResolver /** Get a paginated list of products */;
    userAddresses?: UserAddressesResolver;
  }

  export type BasketResolver = Resolver<Basket | null, BasketArgs>;
  export interface BasketArgs {
    basketId: UUID | null;
  }

  export type CardsResolver = Resolver<Card[]>;
  export type CategoriesResolver = Resolver<Category[]>;
  export type CategoryResolver = Resolver<Category | null, CategoryArgs>;
  export interface CategoryArgs {
    id: string | null;
    slug: string | null;
  }

  export type ProductResolver = Resolver<Product | null, ProductArgs>;
  export interface ProductArgs {
    id: string | null;
    slug: string | null;
  }

  export type ProductListResolver = Resolver<
    PagedProducts | null,
    ProductListArgs
  >;
  export interface ProductListArgs {
    page: number | null;
  }

  export type UserAddressesResolver = Resolver<Address[]>;
}
export namespace BasketResolvers {
  export interface Resolvers {
    createdAt?: CreatedAtResolver;
    id?: IdResolver;
    items?: ItemsResolver;
    updatedAt?: UpdatedAtResolver;
  }

  export type CreatedAtResolver = Resolver<NaiveDateTime>;
  export type IdResolver = Resolver<UUID>;
  export type ItemsResolver = Resolver<BasketItem[]>;
  export type UpdatedAtResolver = Resolver<NaiveDateTime>;
}
export namespace BasketItemResolvers {
  export interface Resolvers {
    id?: IdResolver;
    product?: ProductResolver;
    quantity?: QuantityResolver;
  }

  export type IdResolver = Resolver<string>;
  export type ProductResolver = Resolver<Product>;
  export type QuantityResolver = Resolver<number>;
}
export namespace ProductResolvers {
  export interface Resolvers {
    categories?: CategoriesResolver;
    createdAt?: CreatedAtResolver;
    description?: DescriptionResolver;
    featured?: FeaturedResolver;
    id?: IdResolver;
    images?: ImagesResolver;
    listed?: ListedResolver;
    name?: NameResolver;
    price?: PriceResolver;
    salePrice?: SalePriceResolver;
    sku?: SkuResolver;
    slug?: SlugResolver;
    stockQty?: StockQtyResolver;
    thumbnail?: ThumbnailResolver;
  }

  export type CategoriesResolver = Resolver<Category[]>;
  export type CreatedAtResolver = Resolver<NaiveDateTime>;
  export type DescriptionResolver = Resolver<string>;
  export type FeaturedResolver = Resolver<boolean>;
  export type IdResolver = Resolver<string>;
  export type ImagesResolver = Resolver<ProductImage[]>;
  export type ListedResolver = Resolver<boolean>;
  export type NameResolver = Resolver<string>;
  export type PriceResolver = Resolver<number>;
  export type SalePriceResolver = Resolver<number | null>;
  export type SkuResolver = Resolver<string>;
  export type SlugResolver = Resolver<string>;
  export type StockQtyResolver = Resolver<number | null>;
  export type ThumbnailResolver = Resolver<ProductImage | null>;
}
export namespace CategoryResolvers {
  export interface Resolvers {
    id?: IdResolver;
    order?: OrderResolver;
    products?: ProductsResolver;
    slug?: SlugResolver;
    term?: TermResolver;
  }

  export type IdResolver = Resolver<string>;
  export type OrderResolver = Resolver<number>;
  export type ProductsResolver = Resolver<Product[]>;
  export type SlugResolver = Resolver<string>;
  export type TermResolver = Resolver<string>;
}
export namespace ProductImageResolvers {
  export interface Resolvers {
    id?: IdResolver;
    url?: UrlResolver;
  }

  export type IdResolver = Resolver<string>;
  export type UrlResolver = Resolver<string>;
}
export namespace CardResolvers {
  export interface Resolvers {
    brand?: BrandResolver;
    expMonth?: ExpMonthResolver;
    expYear?: ExpYearResolver;
    funding?: FundingResolver;
    id?: IdResolver;
    lastFour?: LastFourResolver;
  }

  export type BrandResolver = Resolver<string>;
  export type ExpMonthResolver = Resolver<number>;
  export type ExpYearResolver = Resolver<number>;
  export type FundingResolver = Resolver<string>;
  export type IdResolver = Resolver<string>;
  export type LastFourResolver = Resolver<string>;
}
export namespace PagedProductsResolvers {
  export interface Resolvers {
    pagination?: PaginationResolver;
    products?: ProductsResolver;
  }

  export type PaginationResolver = Resolver<Pagination>;
  export type ProductsResolver = Resolver<Product[]>;
} /** Pagination information for a paged query */
export namespace PaginationResolvers {
  export interface Resolvers {
    pageNumber?: PageNumberResolver;
    pageSize?: PageSizeResolver;
    totalEntries?: TotalEntriesResolver;
    totalPages?: TotalPagesResolver;
  }

  export type PageNumberResolver = Resolver<number>;
  export type PageSizeResolver = Resolver<number>;
  export type TotalEntriesResolver = Resolver<number>;
  export type TotalPagesResolver = Resolver<number>;
}
export namespace AddressResolvers {
  export interface Resolvers {
    city?: CityResolver;
    country?: CountryResolver;
    id?: IdResolver;
    line1?: Line1Resolver;
    line2?: Line2Resolver;
    line3?: Line3Resolver;
    name?: NameResolver;
    phone?: PhoneResolver;
    postcode?: PostcodeResolver;
  }

  export type CityResolver = Resolver<string>;
  export type CountryResolver = Resolver<string>;
  export type IdResolver = Resolver<string>;
  export type Line1Resolver = Resolver<string | null>;
  export type Line2Resolver = Resolver<string | null>;
  export type Line3Resolver = Resolver<string | null>;
  export type NameResolver = Resolver<string | null>;
  export type PhoneResolver = Resolver<string | null>;
  export type PostcodeResolver = Resolver<string>;
}
export namespace RootMutationTypeResolvers {
  export interface Resolvers {
    addProductToBasket?: AddProductToBasketResolver /** Add a product to the basket using an existing basket identifier */;
    createAddress?: CreateAddressResolver;
    createBasket?: CreateBasketResolver /** Create a new basket with a unique ID */;
    createProduct?: CreateProductResolver;
    login?: LoginResolver /** Obtain a JWT */;
    placeOrder?: PlaceOrderResolver;
    register?: RegisterResolver /** Register a new user and login */;
    removeProductFromBasket?: RemoveProductFromBasketResolver /** Remove a product from a basket */;
    saveCard?: SaveCardResolver;
    updateProduct?: UpdateProductResolver /** Update an existing product */;
  }

  export type AddProductToBasketResolver = Resolver<
    Basket | null,
    AddProductToBasketArgs
  >;
  export interface AddProductToBasketArgs {
    basketId: UUID;
    productId: number;
    quantity: number;
  }

  export type CreateAddressResolver = Resolver<
    CreateAddressResponse,
    CreateAddressArgs
  >;
  export interface CreateAddressArgs {
    city: string;
    country: string;
    line1: string | null;
    line2: string | null;
    line3: string | null;
    name: string | null;
    phone: string | null;
    postcode: string;
  }

  export type CreateBasketResolver = Resolver<Basket>;
  export type CreateProductResolver = Resolver<
    CreateProductResponse | null,
    CreateProductArgs
  >;
  export interface CreateProductArgs {
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

  export type LoginResolver = Resolver<Session | null, LoginArgs>;
  export interface LoginArgs {
    email: string;
    password: string;
  }

  export type PlaceOrderResolver = Resolver<PlaceOrderResponse, PlaceOrderArgs>;
  export interface PlaceOrderArgs {
    basketId: UUID;
    cardId: string;
    shippingAddressId: UUID;
  }

  export type RegisterResolver = Resolver<
    RegisterResponse | null,
    RegisterArgs
  >;
  export interface RegisterArgs {
    email: string;
    name: string;
    password: string;
  }

  export type RemoveProductFromBasketResolver = Resolver<
    Basket | null,
    RemoveProductFromBasketArgs
  >;
  export interface RemoveProductFromBasketArgs {
    basketId: UUID;
    itemId: number;
  }

  export type SaveCardResolver = Resolver<Card[], SaveCardArgs>;
  export interface SaveCardArgs {
    token: string;
  }

  export type UpdateProductResolver = Resolver<
    UpdateProductResponse | null,
    UpdateProductArgs
  >;
  export interface UpdateProductArgs {
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
}
export namespace CreateAddressResponseResolvers {
  export interface Resolvers {
    entity?: EntityResolver;
    validation?: ValidationResolver;
  }

  export type EntityResolver = Resolver<Address | null>;
  export type ValidationResolver = Resolver<(Validation | null)[] | null>;
} /** A validation error */
export namespace ValidationResolvers {
  export interface Resolvers {
    key?: KeyResolver;
    reason?: ReasonResolver;
  }

  export type KeyResolver = Resolver<string>;
  export type ReasonResolver = Resolver<string>;
}
export namespace CreateProductResponseResolvers {
  export interface Resolvers {
    entity?: EntityResolver;
    validation?: ValidationResolver;
  }

  export type EntityResolver = Resolver<Product | null>;
  export type ValidationResolver = Resolver<(Validation | null)[] | null>;
}
export namespace SessionResolvers {
  export interface Resolvers {
    jwt?: JwtResolver;
    user?: UserResolver;
  }

  export type JwtResolver = Resolver<string>;
  export type UserResolver = Resolver<User>;
}
export namespace UserResolvers {
  export interface Resolvers {
    email?: EmailResolver;
    id?: IdResolver;
    name?: NameResolver;
  }

  export type EmailResolver = Resolver<string>;
  export type IdResolver = Resolver<string>;
  export type NameResolver = Resolver<string>;
}
export namespace PlaceOrderResponseResolvers {
  export interface Resolvers {
    order?: OrderResolver;
    status?: StatusResolver;
  }

  export type OrderResolver = Resolver<Order | null>;
  export type StatusResolver = Resolver<string | null>;
}
export namespace OrderResolvers {
  export interface Resolvers {
    createdAt?: CreatedAtResolver;
    id?: IdResolver;
    items?: ItemsResolver;
    note?: NoteResolver;
    shippingAddress?: ShippingAddressResolver;
    status?: StatusResolver;
    total?: TotalResolver;
    user?: UserResolver;
  }

  export type CreatedAtResolver = Resolver<NaiveDateTime>;
  export type IdResolver = Resolver<string>;
  export type ItemsResolver = Resolver<(OrderItem | null)[]>;
  export type NoteResolver = Resolver<string | null>;
  export type ShippingAddressResolver = Resolver<Address>;
  export type StatusResolver = Resolver<string>;
  export type TotalResolver = Resolver<number>;
  export type UserResolver = Resolver<User>;
}
export namespace OrderItemResolvers {
  export interface Resolvers {
    description?: DescriptionResolver;
    order?: OrderResolver;
    pricePaid?: PricePaidResolver;
    product?: ProductResolver;
  }

  export type DescriptionResolver = Resolver<string>;
  export type OrderResolver = Resolver<Order>;
  export type PricePaidResolver = Resolver<number>;
  export type ProductResolver = Resolver<Product | null>;
}
export namespace RegisterResponseResolvers {
  export interface Resolvers {
    entity?: EntityResolver;
    validation?: ValidationResolver;
  }

  export type EntityResolver = Resolver<Session | null>;
  export type ValidationResolver = Resolver<(Validation | null)[] | null>;
}
export namespace UpdateProductResponseResolvers {
  export interface Resolvers {
    entity?: EntityResolver;
    validation?: ValidationResolver;
  }

  export type EntityResolver = Resolver<Product | null>;
  export type ValidationResolver = Resolver<(Validation | null)[] | null>;
}
