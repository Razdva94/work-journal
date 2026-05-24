import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateJournalEntryDto {
  @IsDateString()
  performedAt!: string;

  @IsString()
  @IsNotEmpty()
  workTypeId!: string;

  @IsNumber()
  @IsPositive()
  volume!: number;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  unit?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  workerName!: string;
}
