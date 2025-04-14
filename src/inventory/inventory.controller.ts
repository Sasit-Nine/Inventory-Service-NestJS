import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PipeRemoveCommaPipe } from 'src/pipe-remove-comma/pipe-remove-comma.pipe';
import { BadRequestException } from '@nestjs/common';
import { ForbiddenException } from 'src/Exception/forbidden.exception';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Body() createInventoryDto: CreateInventoryDto,
    @Body('test', ParseIntPipe) test: number,
    @Body('remove', PipeRemoveCommaPipe) remove: string,
  ) {
    console.log('123');
    console.log(123);
    console.log(test);
    console.log(remove);
    console.log(createInventoryDto);
    return this.inventoryService.create(createInventoryDto);
  }
  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('forbidden')
  findForbidden() {
    throw new ForbiddenException('This is a custom forbidden exception');
  }

  @Get('test')
  test() {
    return 'Test1';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!id.match(/^[0-9]+$/)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
  
}
