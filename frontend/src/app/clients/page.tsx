'use client';

import React from 'react'
import ClientCard from '../(components)/Client';
import Link from 'next/link';



const ClientLink = ({href, clientName, clientId, description}: {href: string, clientName: string, clientId: string, description: string}) => {
  return (
    <Link href={href}>
      <ClientCard clientName={clientName} clientId={clientId} description={description} />
    </Link>
  )
}

const ClientsPage = () => {
    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <ClientLink href="/categories" clientName="Nike" clientId="1" description="Nike is a multinational corporation that designs, manufactures, and markets footwear, apparel, equipment, accessories, and services." />
        <ClientLink href="/categories" clientName="Client 2" clientId="2" description="Client 2 is a multinational corporation specializing in innovative technology solutions. They design, develop, and market software products" />
    </div>
  )
}

export default ClientsPage;