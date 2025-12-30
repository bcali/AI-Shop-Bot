import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Mock product search tool
// In a real app, this would fetch from Shopee/Lazada/Amazon APIs
const mockSearch = async (query: string) => {
  console.log('Searching for:', query);
  
  // Return some realistic mock data based on the query
  if (query.toLowerCase().includes('phone') || query.toLowerCase().includes('iphone')) {
    return [
      {
        id: 's1',
        name: 'iPhone 15 Pro Max 256GB Natural Titanium',
        price: 1199.00,
        originalPrice: 1299.00,
        platform: 'shopee',
        rating: 4.9,
        reviews: 3421,
        image: 'https://images.unsplash.com/photo-1741061963569-9d0ef54d10d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlfGVufDF8fHx8MTc2NjUwOTIxOXww&ixlib=rb-4.1.0&q=80&w=1080',
        shipping: 'Free Shipping',
        inStock: true,
      },
      {
        id: 'a1',
        name: 'iPhone 15 Pro Max (256 GB) - Natural Titanium',
        price: 1185.00,
        originalPrice: 1199.00,
        platform: 'amazon',
        rating: 4.8,
        reviews: 1250,
        image: 'https://images.unsplash.com/photo-1741061963569-9d0ef54d10d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlfGVufDF8fHx8MTc2NjUwOTIxOXww&ixlib=rb-4.1.0&q=80&w=1080',
        shipping: 'Free Shipping',
        inStock: true,
      }
    ];
  }
  
  return [
    {
      id: 'h1',
      name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
      price: 348.00,
      originalPrice: 399.99,
      platform: 'amazon',
      rating: 4.8,
      reviews: 2341,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY2NTQzOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      shipping: 'Free Shipping',
      inStock: true,
    }
  ];
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: `You are an AI Shopping Concierge. 
    Your goal is to help users find the best products on Shopee, Lazada, and Amazon.
    Use the search tool to find products. 
    Always provide price comparisons when possible.
    Be helpful, professional, and concise.`,
    messages,
    tools: {
      searchProducts: tool({
        description: 'Search for products across Shopee, Lazada, and Amazon',
        parameters: z.object({
          query: z.string().description('The product search query'),
        }),
        execute: async ({ query }) => {
          const products = await mockSearch(query);
          return { products };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}

