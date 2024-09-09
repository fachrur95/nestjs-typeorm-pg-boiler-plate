import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

abstract class ExtendedEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Expose()
  createdAt: string;

  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 100,
  })
  @Expose()
  createdBy: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Expose()
  updatedAt: string;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Expose()
  updatedBy: string;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  @Expose()
  deletedAt: string;

  @Column({
    name: 'deleted_by',
    nullable: true,
    default: null,
  })
  @Expose()
  deletedBy: string;
}

export abstract class AbstractAutoIncrementEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;
}

export abstract class AbstractEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;
}

export abstract class AbstractPrivateEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
