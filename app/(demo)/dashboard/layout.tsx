
import { ReactNode } from 'react';
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ContentLayout title="Dashboard">
      <div className="flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card className="h-full w-full rounded-lg border-none mt-6 overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            {children}
          </div>
        </CardContent>
      </Card>
    </ContentLayout>
  )
}