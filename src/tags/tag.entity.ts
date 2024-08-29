import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { ManyToMany } from 'typeorm';

import { Post } from 'src/posts/entities/post.entity';

/**
 * Tag Entity
 * @description Tag Entity
 * @property {number} id - Tag ID
 * @property {string} name - Tag name
 * @property {string} slug - Tag slug
 * @property {string} description - Tag description
 * @property {string} schema - Tag schema
 * @property {string} featuredImageURL - Tag featured image URL
 * @property {Post} post - Posts associated to tag
 * @property {Date} createDate - Tag create date
 * @property {Date} updateDate - Tag update date
 * @property {Date} deletedAt - Tag delete date
 */
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: false, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true, default: null })
  description?: string;

  @Column({ type: 'text', nullable: true, default: null })
  schema?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true, default: null })
  featuredImageURL?: string;

  @ManyToMany(() => Post, (post) => post.tags, { onDelete: 'CASCADE' })
  posts: Post[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  //   https://typeorm.io/decorator-reference
}
