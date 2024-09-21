'use client';

import React from 'react'
import CategoryCard from '../(components)/Category'
import Link from 'next/link';

type Props = {}

const ChatboxLink = ({ name }: { name: string }) => {
  return (
    <Link href="/chatbox">
      <CategoryCard name={name} />
    </Link>
  )
}

const CategoriesPage = (props: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <ChatboxLink name="Suppliers" />
      <ChatboxLink name="Vendors" />
      <ChatboxLink name="Operations" />
      <ChatboxLink name="Customers" />
      <ChatboxLink name="IT" />
      <ChatboxLink name="Competitors" />
    </div>
  )
}

export default CategoriesPage