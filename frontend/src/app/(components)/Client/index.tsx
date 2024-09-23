import { Building2 } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

type ClientCardProps = {
    clientName: string;
    description: string;
    clientId: string;
}

const ClientCard = ({clientName, description, clientId}: ClientCardProps) => {
  return (
    <div>
        <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
            <div className="flex justify-center mb-4">
                {clientName.toLowerCase() === 'nike' ? (
                    <Image
                        src="/images/nike.png"
                        alt="Nike Logo"
                        width={64}
                        height={64}
                    />
                ) : (
                <Building2
                    className="w-16 h-16 object-contain"
                />
                )}
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">{clientName}</h2>
            <p className="text-gray-600 text-sm text-center">
                {description}
            </p>
        </div>
    </div>
  )
}

export default ClientCard