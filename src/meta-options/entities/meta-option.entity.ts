import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOne, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Post } from 'src/posts/entities/post.entity';

/**
 * Meta Option Entity
 * @description Meta Option Entity
 * @property {number} id - Meta Option ID
 * @property {string} metaValue - Meta Option value
 * @property {Date} createdDate - Meta Option create date
 * @property {Date} updatedDate - Meta Option update date
 */
@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', nullable: false })
  metaValue: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToOne(() => Post, (post) => post.metaOptions, { onDelete: 'CASCADE' })
  @JoinColumn() // For uni-directional relationship
  post: Post;
}
