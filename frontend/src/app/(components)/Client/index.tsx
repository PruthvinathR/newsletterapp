import { Building2 } from 'lucide-react'
import React from 'react'

type Props = {}

const ClientCard = (props: Props) => {
  return (
    <div>
        <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
            <div className="flex justify-center mb-4">
                <Building2
                    className="w-16 h-16 object-contain"
                />
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">Client Name</h2>
            <p className="text-gray-600 text-sm text-center">
                A brief description of the client and their business. This can include their industry,
                key products or services, or any other relevant information.
            </p>
        </div>
    </div>
  )
}

export default ClientCard