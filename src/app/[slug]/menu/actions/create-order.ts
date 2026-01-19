"use server";
import { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { removeCpfPunctuation } from "@/helpers/cpf";
import { db } from "@/lib/prisma";

// Deve ser o primeiro import do arquivo

interface CreateOrderProps {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

// Rota de API para criar o pedido
export const createOrder = async (input: CreateOrderProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug: input.slug },
  });
  if (!restaurant) {
    throw new Error("Restaurante não encontrado");
  }
  const productWithPrices = await db.product.findMany({
    where: {
      // in -> ache os produtos cujo id está na lista de ids fornecida
      id: { in: input.products.map((product) => product.id) },
    },
  });

  // Mapeia os produtos do pedido com seus preços e quantidades
  const productsWithPriceAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productWithPrices.find((p) => p.id === product.id)!.price, // ! -> garante que o valor não é nulo
  }));

  // Cria o pedido no banco de dados
  await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPriceAndQuantities,
        },
      },
      total: productsWithPriceAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });
    
  redirect(`/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`); // Redireciona para a página de pedidos do restaurante
};
