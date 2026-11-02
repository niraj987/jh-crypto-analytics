import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      balances: [
        { currency: 'INR', name: 'Indian Rupee', main_balance: '0.30', current_value: '0.30' },
        { currency: 'FLOKI', name: 'Floki Inu', main_balance: '1704.71', current_value: '3.92' },
        { currency: 'PEPE', name: 'Pepe Coin', main_balance: '2544.89', current_value: '1.29' },
      ],
      totalINRValue: 5.51,
    },
  });
}
