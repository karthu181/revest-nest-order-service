
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Order } from './order.model'; 
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  private orders:Order[] = [];

  constructor(private httpService: HttpService,
   @InjectRepository(Order)
    private readonly productRepository: Repository<Order>,

   ) {}

   async getAllOrders() {
      //using database
      const orders = await this.productRepository.query(`SELECT * FROM orders`);
      return orders;

      //using memory
        // return this.orders;
    }

    async getAllOrdersWithProducts() {

        //using database
        // const ordersWithProducts = await this.productRepository.query(`
        //     SELECT o.*, p.* FROM orders o
        //     LEFT JOIN products p ON o."productId" = p.id
        // `);

        //organized way
        const ordersWithProducts = await this.productRepository.query(`
        SELECT 
          o.id AS order_id,
          o."productId" AS order_product_id,
          o.quantity AS order_quantity,
          o."totalPrice" AS order_total_price,
          o.status AS order_status,
          p.id AS product_id,
          p.name AS product_name,
          p.description AS product_description,
          p.price AS product_price,
          p.stock AS product_stock
        FROM orders o
        LEFT JOIN products p ON o."productId" = p.id
      `);

        const structured = ordersWithProducts.map(row => ({
        id: row.order_id,
        productId: row.order_product_id,
        quantity: row.order_quantity,
        totalPrice: row.order_total_price,
        status: row.order_status,
        product: {
          id: row.product_id,
          name: row.product_name,
          description: row.product_description,
          price: row.product_price,
          stock: row.product_stock,
        },
      }));
        console.log('Fetching all orders with products:', structured);
        return structured;

        //using memory
        // const productIds = this.orders.map(order => order.productId)

        // console.log('Fetching products for order IDs:', productIds);
        // const { data: products } = await firstValueFrom(
        //     this.httpService.post('http://localhost:3000/products/bulk', {
        //     ids:productIds,
        //     })
        // );

        // const ordersWithProducts = this.orders.map(order => {
        //     const product = products.find(p => p.id === order.productId);
        //     return {
        //         ...order,
        //         product: product || null, 
        //     };
        // });

        // console.log('products of orders:', products);
        // return ordersWithProducts;

    }

    async getOrderById(id: string) {
        //using database
        const order = await this.productRepository.query(`SELECT * FROM orders WHERE id = $1`, [id]);
        return order;

        //using memory
        // return this.orders.find(order => order.id === id);
        
    }

    async updateOrder(id: string, updateOrderData: Partial<Order>) {
      //using database
    try{ 
      const columnsWithPlaceholders:string[] = [];
      const values:any[] = [];
      let index = 1;
      console.log('Updating Order with ID:', id, 'Data:', updateOrderData);

      Object.entries(updateOrderData).forEach(([key, value]) => {
        if (value !== undefined) {
          columnsWithPlaceholders.push(`${key} = $${index}`);
          values.push(value);
          index++;
        }
      }
    )

      if (columnsWithPlaceholders.length === 0) {
        throw new Error('No valid fields provided for update.');
      }

      values.push(id);
      const idParamIndex = index;

      const query = `
        UPDATE orders
        SET ${columnsWithPlaceholders.join(', ')}
        WHERE id = $${idParamIndex}
        RETURNING *`;
    
      const updatedProduct = await this.productRepository.query(query, values);
      console.log('Updating product:', updatedProduct);
      return updatedProduct[0]; 
    }
      catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
     }

      //using memory
        // const order = this.orders.find(o => o.id === id);
        // if (order) {
        //     Object.assign(order, orderData);
        //     return order;
        // }
        // return null;
    }

  async createOrder(productId: number | string, quantity: number = 1) {
    //order with multiple products not implemented
    //using database
    try {
       const existingProduct = await this.productRepository.query(`SELECT * FROM products WHERE id = $1`, [productId]);
       console.log('Existing product:', existingProduct);
      if (!existingProduct || existingProduct.length === 0) {
        throw new Error('Product not found');
      }
    const totalPrice = existingProduct[0].price * quantity;

 
    const createdOrder = await this.productRepository.query(
      `INSERT INTO orders ("productId", quantity, "totalPrice", status) VALUES ($1, $2, $3, $4) RETURNING *`,
      [productId, quantity, totalPrice, "confirmed"]
    );

    return createdOrder[0];
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
   


    //using memory
  //   const { data: product } = await firstValueFrom(
  //     this.httpService.get(`http://localhost:3000/products/${productId}`)
  //   );

  //   console.log('Product data:', product);
  //    const totalPrice = product.price * quantity;
  //  const order ={
  //     id: Date.now(),
  //     productId,
  //     totalPrice,
  //     quantity,
  //     status: "confirmed" as "confirmed",
  //  }

  //  this.orders.push(order);
  //   return order;
  }

 async deleteOrder(id: string) {
  //using database
  try {
    const deletedOrder = await  this.productRepository.query(`DELETE FROM orders WHERE id = $1 RETURNING *`, [id]);
    if (deletedOrder.length === 0) {
      throw new Error('Order not found');
    }
    return deletedOrder[0];
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Failed to delete order');
  }


  //using memory
    // const index = this.orders.findIndex(order => order.id === id);          
    // if (index !== -1) {
    //   const deletedOrder = this.orders[index];
    //   this.orders.splice(index, 1);
    //   return deletedOrder;
    // }
    // return null;
    }


  async getProductDetails(productId: string) {
    const response$ = this.httpService.get(`http://localhost:3000/products/${productId}`);
    const response = await firstValueFrom(response$);
    return response.data;
  }
}

