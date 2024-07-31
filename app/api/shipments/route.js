import { NextResponse } from 'next/server';
import { supabase } from '../../../utils/supabase.js';

export async function GET() {
  const { data, error } = await supabase.from('shipments').select('*');
  
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  
  return NextResponse.json(data);
}

export async function POST(request) {
  const { tracking_number, customer_name, invoice_number, customer_number } = await request.json();

  const { data, error } = await supabase.from('shipments').insert([
    { tracking_number, customer_name, invoice_number, customer_number }
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data[0]);
}

export async function PUT(request) {
    const { id, tracking_number, customer_name, invoice_number, customer_number } = await request.json();
  
    const { error } = await supabase
      .from('shipments')
      .update({ tracking_number, customer_name, invoice_number, customer_number })
      .eq('id', id);
  
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  
    return NextResponse.json({ message: 'Shipment updated successfully' });
  }