import React from 'react'
import { Building2, DollarSign, Briefcase, Users, Laptop, Crosshair } from 'lucide-react';

type CategoryProps = {
    name: string;
}

const CategoryCard = ({name}: CategoryProps) => {

  const categoryIcons: Record<string, typeof Building2> = {
    'Suppliers': Building2,
    'Vendors': DollarSign,
    'Operations': Briefcase,
    'Customers': Users,
    'IT': Laptop,
    'Competitors': Crosshair,
  };

  const Icon = categoryIcons[name] || Building2;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
        <div className="flex justify-center mb-4">
            <Icon
                className="w-16 h-16 object-contain"
            />
        </div>
        <h2 className="text-xl font-semibold text-center mb-2">{name}</h2>
        <p className="text-gray-600 text-sm text-center">
            A brief description of the {name} category. This can include key responsibilities,
            main focus areas, or any other relevant information.
        </p>
    </div>
  )
}

export default CategoryCard;