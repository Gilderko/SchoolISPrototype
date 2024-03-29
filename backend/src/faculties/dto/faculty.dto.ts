import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FacultyDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNumber()
  @Expose()
  id: number;
}
