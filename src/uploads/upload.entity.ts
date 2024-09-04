import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { FileTypes } from './enums/file-types.enum';

/**
 * Upload entity
 */
@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  path: string;

  @Column({
    type: 'enum',
    enum: FileTypes,
    default: FileTypes.IMAGE,
    nullable: false,
  })
  type: FileTypes;

  @Column({ type: 'varchar', length: 128, nullable: false })
  mime: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  size: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
