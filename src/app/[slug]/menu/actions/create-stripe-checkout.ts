"use server";

import { ConsumptionMethod } from "@prisma/client";
import { headers } from "next/headers";
import Stripe from "stripe";

import { removeCpfPunctuation } from "@/helpers/cpf";
import { db } from "@/lib/prisma";

import { CartProduct } from "../contexts/cart";

export const createStripeCheckout = async ({
  orderId,
  slug,
  consumptionMethod,
  products,
  cpf,
}: {
  orderId: number;
  slug: string;
  consumptionMethod: ConsumptionMethod;
  cpf: string;
  products: CartProduct[];
}) => {
  const origin = (await headers()).get("origin") || "";
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: products.map((product) => product.id),
      },
    },
  });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });

  const searchParams = new URLSearchParams();
  searchParams.set("cpf", removeCpfPunctuation(cpf));
  searchParams.set("consumptionMethod", consumptionMethod);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "boleto"],
    mode: "payment",
    success_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
    cancel_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
    metadata: {
      orderId,
    },
    line_items: products.map((product) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: product.name,
          images: [product.imageUrl],
        },
        unit_amount:
          productsWithPrices.find((p) => p.id === product.id)!.price * 100,
      },
      quantity: product.quantity,
    })),
  });
  return { sessionId: session.id };
};
