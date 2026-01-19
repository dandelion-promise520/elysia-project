export const SEARCHABLE_FIELDS = [
  "barcode",
  "product_name",
  "location",
  "category",
  "unit",
] as const;

export const QUERY_LIMITS = {
  DEFAULT: 10,
  MAX: 100,
} as const;

export const API_CONFIG = {
  PORT: 3000,
  DOCS_PATH: "/docs",
} as const;
