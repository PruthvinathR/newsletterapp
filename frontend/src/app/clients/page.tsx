'use client';

import React from 'react'
import ClientCard from '../(components)/Client';
import { Building2, LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {}

const ClientLink = ({href, clientName, clientId}: {href: string, clientName: string, clientId: string}) => {
  return (
    <Link href={href}>
      <ClientCard clientName={clientName} clientId={clientId} />
    </Link>
  )
}

const ClientsPage = (props: Props) => {
    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <ClientLink href="/categories" clientName="Client 1" clientId="1" />
        <ClientLink href="/categories" clientName="Client 2" clientId="2" />
        <ClientLink href="/categories" clientName="Client 3" clientId="3" />
        <ClientLink href="/categories" clientName="Client 4" clientId="4" />
        <ClientLink href="/categories" clientName="Client 5" clientId="5" />
        <ClientLink href="/categories" clientName="Client 6" clientId="6" />
        <ClientLink href="/categories" clientName="Client 7" clientId="7" />
        <ClientLink href="/categories" clientName="Client 8" clientId="8" />
    </div>
  )
}

export default ClientsPage;