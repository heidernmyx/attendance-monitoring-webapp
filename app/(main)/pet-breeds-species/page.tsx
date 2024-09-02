"use client"
import React from 'react';

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
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
import { useToast } from '@/components/ui/use-toast';



export default function PetPage() {



  return (
    <>
      <div className="flex flex-col">
        <div>
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                {/* <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger> */}
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <div className="col-span-3 relative w-full">
                            {/* Input field */}
                            <Input
                              // onBlur={() => setTimeout(() => {
                              //   setIsFocused(false);
                              // }, 100)}
                              id="name"
                              defaultValue=""
                              placeholder='Filter By Owner'
                              className="w-full" // Make sure the input spans the full width
                              required
                            />

                            {/* Suggestions dropdown */}
                            
                          </div>
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
                        Add Pet
                      </span>
                  </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form >
                      <DialogHeader>
                        <DialogTitle>Add Pet</DialogTitle>
                        <DialogDescription>
                          Fill in pet&apos;s details below to add new pet. Click Submit when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Pet Name
                          </Label>
                          <Input
                            id="name"
                            defaultValue=""
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Birthdate
                          </Label>
                          <Input
                            id="name"
                            type='date'
                            defaultValue=""
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Owner
                          </Label>
                          <div className="col-span-3 relative w-full">
                            {/* Input field */}
                            <Input
                              // onBlur={() => setTimeout(() => {
                              //   setIsFocused(false);
                              // }, 100)}
                              id="name"
                              defaultValue=""
                              className="w-full" // Make sure the input spans the full width
                              required
                            />

                            {/* Suggestions dropdown */}
                            
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Species
                          </Label>
                          {/* <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                          /> */}
                        
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Breed
                          </Label>
                          {/* <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                          /> */}
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
                  <CardTitle>Manage Species</CardTitle>
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
                          Pet ID
                        </TableHead>
                        {/* <TableHead></TableHead> */}
                        <TableHead>
                          Pet Name
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Species
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Breed
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Date of Birth
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Owner Name
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    
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
