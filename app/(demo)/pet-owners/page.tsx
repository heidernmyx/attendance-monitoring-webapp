'use client'
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios';
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { OwnerProps } from '@/lib/utils';
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";


interface OwnerFormField {
  owner: string,
  contact_details: string,
  address: string,
}

export default function PetOwnerPage() {

  const { register, handleSubmit} = useForm<OwnerFormField>();
  const { toast } = useToast();
  const [ ownerList, setOwnerList ] = React.useState<OwnerProps[]>([]);

  React.useEffect(() => {
    // fetchSpecies();
    fetchOwners();
  }, [])

  const fetchOwners = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}php/owners.php`;
    const response = await axios.get<OwnerProps[]>(`${url}`,{
      params: { operation: 'getOwner' }
    })

    console.log(response.data);
    
    const ownerList: OwnerProps[] = Array.isArray(response.data) ? response.data.map((owner) => ({
      OwnerID: owner.OwnerID,
      Name: owner.Name,
      ContactDetails: owner.ContactDetails,
      Address: owner.Address
    })) : [];
    setOwnerList(ownerList);
  }

  const submitOwner: SubmitHandler<OwnerFormField> = async (data) => {
    console.log(true)
    console.log(data)

    const ownerDetails: OwnerFormField = {
      address: data.address,
      contact_details: data.contact_details,
      owner: data.owner
    }
    const formData = new FormData();
    formData.append('operation', 'addOwner');
    formData.append('json', JSON.stringify(ownerDetails));
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}php/owners.php`,
      method: 'POST',
      data: formData
    })

    console.log(response.data);
    if (response.data == 1) {
      toast({
        variant: "default",
        title: "Success!",
        description: "Owner Added Successfully",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
        type: "foreground",
      })
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <div>
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild className="">
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Owner
                      </span>
                  </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit(submitOwner)}>
                      <DialogHeader>
                        <DialogTitle>Add Owner</DialogTitle>
                        <DialogDescription>
                          Fill in the details below to add new Owner. Click submit when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Owner Name
                          </Label>
                          <Input
                            { ...register('owner', {required: true})}
                            id="name"
                            defaultValue=""
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Contact Details
                          </Label>
                          <Input
                            { ...register('contact_details', {required: true})}
                            id="username"
                            placeholder="#"
                            className="col-span-3"
                          />
                          <Label htmlFor="username" className="text-right">
                            Address
                          </Label>
                          <Input
                            { ...register('address', {required: true})}
                            id="username"
                            placeholder="@"
                            className="col-span-3"
                          />
                          {/* <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select> */}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Submit</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Manage Owners</CardTitle>
                  <CardDescription>
                    {/* Manage . */}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">ID</span>
                          ID
                        </TableHead>
                        <TableHead>Owner Name</TableHead>
                        {/* <TableHead>Species</TableHead> */}
                        <TableHead className="hidden md:table-cell">
                          Contact Details
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          {/* Total Sales */}
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Address
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      { ownerList.map((owner) => 
                      <TableRow key={owner.OwnerID}>
                        <TableCell className="hidden sm:table-cell">
                          {owner.OwnerID}
                        </TableCell>
                        <TableCell className="font-medium">
                          {owner.Name}
                        </TableCell>
                        {/* <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell> */}
                        <TableCell className="hidden md:table-cell">
                          {/* $199.99 */}
                          { owner.ContactDetails}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {/* 30 */}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {owner.Address}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
