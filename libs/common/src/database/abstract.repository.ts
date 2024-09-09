import { Logger, NotFoundException } from '@nestjs/common';
import {
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export type DynamicObject = {
  [key: string]: any;
};

export abstract class AbstractRepository<T> {
  protected abstract readonly logger: Logger;
  protected abstract readonly entityName: string;

  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  public getRepositoryBaseQuery(alias?: string) {
    return this.entityRepository.createQueryBuilder(alias);
  }

  async create(entity: T, options?: SaveOptions): Promise<T> {
    return this.entityManager.save(entity, options);
  }

  async findOne(options: FindOneOptions<T>, isSkipNotFound: boolean = false) {
    const entity = await this.entityRepository.findOne(options);

    if (!entity) {
      this.logger.warn(
        `${this.entityName} not found with options: ${JSON.stringify(options)}`,
      );

      if (!isSkipNotFound) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
    }

    return entity;
  }

  async findOneRaw(
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    isSkipNotFound: boolean = false,
  ) {
    const entity = this.getRepositoryBaseQuery('entity').andWhere(where);

    if (!(await entity.getOne())) {
      this.logger.warn(
        `${this.entityName} not found with where: ${JSON.stringify(where)}`,
      );

      if (!isSkipNotFound) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
    }

    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updateResult = await this.entityRepository.update(
      where,
      partialEntity,
    );

    if (!updateResult.affected) {
      this.logger.warn(
        `${this.entityName} not found with where: ${JSON.stringify(where)}`,
      );

      throw new NotFoundException(`${this.entityName} not found`);
    }

    return await this.findOne(where);
  }

  async findAll(options?: FindManyOptions<T>) {
    return this.entityRepository.find(options);
  }

  async findAndCount(options?: FindManyOptions<T>) {
    return this.entityRepository.findAndCount(options);
  }

  async count(options?: FindManyOptions<T>) {
    return this.entityRepository.count(options);
  }

  async findOneAndDelete(
    where: FindOptionsWhere<T>,
    isSkipNotFound: boolean = false,
  ) {
    await this.findOne(where, isSkipNotFound);

    return this.entityRepository.delete(where);
  }
}
