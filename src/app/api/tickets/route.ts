import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // SOLUCIÓN BUG 4: Se agrega el filtro where para que el usuario solo vea los tickets de su propia empresa
    // y no los de otras (evitando la fuga de datos).
    const tickets = await prisma.ticket.findMany({
      where: { companyId: 'TechCorp' }, // User session simulated as 'TechCorp'
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json({ error: 'Error fetching tickets' }, { status: 500 })
  }
}
