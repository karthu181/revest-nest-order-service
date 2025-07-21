import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class StripUndefinedValidationPipe implements PipeTransform {

    //pipe used to transform the data + valdiate the data
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    // If no metatype is provided, return the value as is
    // This is useful for primitive types or when no validation is needed
    // if no metatype is provided, we assume no validation is needed


    // value: { description: 'This is laptop2' }

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Transform plain object to class instance
    //class-validator works on class instances, so we need to convert the plain object to an instance of the class
    const object = plainToInstance(metatype, value, {
        exposeUnsetFields: false,
    });

    console.log('Transformed object:', object);
//   Transformed object: UpdateProductDto {
//   name: undefined,
//   description: 'This is laptop2',     
//   price: undefined,
//   stock: undefined }





    // Validate the object
    const errors = await validate(object, {
      whitelist: true,              // remove properties not in the DTO
      forbidNonWhitelisted: true,  // throw if extra properties are passed
      skipUndefinedProperties: true, // don't validate undefined fields
    });

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    // Remove undefined fields
    const filtered = Object.fromEntries(
      Object.entries(object).filter(([_, val]) => val !== undefined)
    );

    return filtered;
  }

  //checks if the metatype is a class or not
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
