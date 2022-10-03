import { IsString, IsOptional } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  name: string

  //TODO: change to a file type after creating a file upload middleware
  @IsString()
  @IsOptional()
  image: string
}
