'use client';

import React from 'react'
import CategoryCard from '../(components)/Category'

type Props = {}

const CategoriesPage = (props: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <CategoryCard name="Suppliers" />
      <CategoryCard name="Vendors" />
      <CategoryCard name="Operations" />
      <CategoryCard name="Customers" />
      <CategoryCard name="IT" />
      <CategoryCard name="Competitors" />
    </div>
  )
}

export default CategoriesPage