import React from 'react';

import Link from 'next/link';

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from '@/components/ui/card';


interface PetBreedsSpeciesProps {
  children: React.ReactNode
}
export default function PetOwners ({ children }: PetBreedsSpeciesProps) {
  return (
    <>
      <ContentLayout title="Pet Owners">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pet Owners</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="h-full w-full rounded-lg border-none mt-6 overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex flex-col min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            {children}
          </div>
        </CardContent>
      </Card>
      </ContentLayout>
    </>
  )


}