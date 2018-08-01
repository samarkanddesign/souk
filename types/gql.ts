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
  categories: Category[] /** Get all categories */;
  category: Category | null /** Get a single category by id or slug */;
  product: Product | null /** Get a single product by id or slug */;
  productList: PagedProducts | null /** Get a paginated list of products */;
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
  addProductToBasket: Basket | null /** Add a product to the basket using an existing or new basket identifier */;
  createBasket: Basket /** Create a new basket with a unique ID */;
  createProduct: CreateProductResponse | null;
  login: Session | null /** Obtain a JWT */;
  register: RegisterResponse | null /** Register a new user and login */;
  removeProductFromBasket: Basket | null /** Remove a product from a basket */;
  updateProduct: UpdateProductResponse | null /** Update an existing product */;
}

export interface CreateProductResponse {
  entity: Product | null;
  validation: (Validation | null)[] | null;
}
/** A validation error */
export interface Validation {
  key: string;
  reason: string;
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
  basketId: UUID | null;
  productId: number;
  quantity: number;
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
export interface RegisterRootMutationTypeArgs {
  email: string;
  name: string;
  password: string;
}
export interface RemoveProductFromBasketRootMutationTypeArgs {
  basketId: UUID;
  itemId: number;
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
    categories?: CategoriesResolver /** Get all categories */;
    category?: CategoryResolver /** Get a single category by id or slug */;
    product?: ProductResolver /** Get a single product by id or slug */;
    productList?: ProductListResolver /** Get a paginated list of products */;
  }

  export type BasketResolver = Resolver<Basket | null, BasketArgs>;
  export interface BasketArgs {
    basketId: UUID | null;
  }

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
export namespace RootMutationTypeResolvers {
  export interface Resolvers {
    addProductToBasket?: AddProductToBasketResolver /** Add a product to the basket using an existing or new basket identifier */;
    createBasket?: CreateBasketResolver /** Create a new basket with a unique ID */;
    createProduct?: CreateProductResolver;
    login?: LoginResolver /** Obtain a JWT */;
    register?: RegisterResolver /** Register a new user and login */;
    removeProductFromBasket?: RemoveProductFromBasketResolver /** Remove a product from a basket */;
    updateProduct?: UpdateProductResolver /** Update an existing product */;
  }

  export type AddProductToBasketResolver = Resolver<
    Basket | null,
    AddProductToBasketArgs
  >;
  export interface AddProductToBasketArgs {
    basketId: UUID | null;
    productId: number;
    quantity: number;
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
export namespace CreateProductResponseResolvers {
  export interface Resolvers {
    entity?: EntityResolver;
    validation?: ValidationResolver;
  }

  export type EntityResolver = Resolver<Product | null>;
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
