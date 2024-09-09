import { Expose } from 'class-transformer';
import { SelectQueryBuilder } from 'typeorm';

export interface PaginateOptions {
  page?: number;
  limit?: number;
}

export class MetaData {
  constructor(partial: Partial<MetaData>) {
    Object.assign(this, partial);
  }

  @Expose()
  first: number;

  @Expose()
  last: number;

  @Expose()
  currentPage: number;

  @Expose()
  maxPages: number;

  @Expose()
  limit: number;

  @Expose()
  count: number;

  @Expose()
  total?: number;
}

export class PaginationResult<T> {
  constructor(partial: Partial<PaginationResult<T>>) {
    Object.assign(this, partial);
  }

  @Expose()
  meta: MetaData;

  @Expose()
  data: T[];
}

export async function paginate<T>(
  data: T[],
  count: number,
  options?: PaginateOptions,
): Promise<PaginationResult<T>> {
  const currentPage = options.page ?? 1;
  const limit = options.limit ?? 10;
  const offset = (currentPage - 1) * limit;
  const countAll = count;
  const maxPages = Math.ceil(countAll / limit);

  const result: PaginationResult<T> = new PaginationResult({
    data,
    meta: new MetaData({
      first: offset + 1,
      last: offset + data.length,
      currentPage: currentPage,
      maxPages,
      limit,
      count: data.length,
      total: countAll,
    }),
  });

  return result;
}

export async function paginateQb<T>(
  qb: SelectQueryBuilder<T>,
  options?: PaginateOptions,
): Promise<PaginationResult<T>> {
  const currentPage = options.page ?? 1;
  const limit = options.limit ?? 10;
  const offset = (currentPage - 1) * limit;
  const data = await qb.limit(limit).offset(offset).getMany();
  const countAll = await qb.getCount();
  const maxPages = Math.ceil(countAll / limit);

  const result: PaginationResult<T> = new PaginationResult({
    data,
    meta: new MetaData({
      first: offset + 1,
      last: offset + data.length,
      currentPage: currentPage,
      maxPages,
      limit,
      count: data.length,
      total: countAll,
    }),
  });

  return result;
}

export async function paginateQbRaw<T>(
  qb: SelectQueryBuilder<T>,
  options?: PaginateOptions,
): Promise<PaginationResult<T>> {
  const currentPage = options.page ?? 1;
  const limit = options.limit ?? 10;
  const offset = (currentPage - 1) * limit;
  const data = await qb.limit(limit).offset(offset).getRawMany();
  const countAll = await qb.getCount();
  const maxPages = Math.ceil(countAll / limit);

  const result: PaginationResult<T> = new PaginationResult({
    data,
    meta: new MetaData({
      first: offset + 1,
      last: offset + data.length,
      currentPage: currentPage,
      maxPages,
      limit,
      count: data.length,
      total: countAll,
    }),
  });

  return result;
}
