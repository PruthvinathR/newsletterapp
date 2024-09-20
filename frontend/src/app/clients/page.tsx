import React from 'react'
import ClientCard from '../(components)/Client';

type Props = {}

const ClientsPage = (props: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
    </div>
  )
}

export default ClientsPage;