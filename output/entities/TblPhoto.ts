import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbl_photo", { schema: "kim_test" })
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id" })
  photoId: number;

  @Column("varchar", { name: "file_name", length: 45 })
  fileName: string;

  @Column("datetime", {
    name: "reg_dt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  regDt: Date;

  @Column("datetime", {
    name: "mod_dt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  modDt: Date;
}
