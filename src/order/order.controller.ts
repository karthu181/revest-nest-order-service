import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Get('products')
  async getAllOrdersWithProducts() {
    console.log('Fetching all orders with products');
    return await this.orderService.getAllOrdersWithProducts();
  }

  @Get(':id')
 async getOrderById(@Param('id') id: string) {
    return await this.orderService.getOrderById(id);
 }

  @Post()
  async placeOrder(@Body('productId') productId: number | string  ) {
    //order with multiple products not implemented
    return await this.orderService.createOrder(productId);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() orderData: any) {
        return await this.orderService.updateOrder(id, orderData);
    }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return  await this.orderService.deleteOrder(id);
  }

  


}

