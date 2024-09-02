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
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { SpeciesProps, BreedProps } from '@/lib/utils';

interface BreedFormProps {
  breed: string,
  species: number
}

export default function BreedPage() {

  const { toast } = useToast();

  const breedInputRef = React.useRef<HTMLInputElement>(null);

  const [speciesList, setSpeciesList] = React.useState<SpeciesProps[]>([]);
  const [ breedList, setBreedList ] = React.useState<BreedProps[]>([]);
  const [breed, setBreed] = React.useState('');
  const [species, setSpecies] = React.useState('');
  React.useEffect(() => {
    fetchSpecies();
    fetchBreeds();
  }, []);

  
  const fetchSpecies = async () => {
    const response = await axios.get<SpeciesProps[]>(`${process.env.NEXT_PUBLIC_URL}php/species.php`, {
      params: { operation: 'getSpecies' }
    });
    console.log(response.data)
    if (response.data.length > 0) {
      const List: SpeciesProps[] = Array.isArray(response.data) ? response.data.map((species: SpeciesProps) => ({
        SpeciesID: species.SpeciesID,
        SpeciesName: species.SpeciesName
      })) : [];
      console.log(List)
      setSpeciesList(List);
    }
  }

  const fetchBreeds = async () => {
    const response = await axios.get<BreedProps[]>(`${process.env.NEXT_PUBLIC_URL}php/breeds.php`, {
      params: { operation: 'getBreed' }
    })
    console.log(response.data);

    const List: BreedProps[] = Array.isArray(response.data) ? response.data.map((breed: BreedProps) => ({
      BreedID: breed.BreedID,
      BreedName: breed.BreedName,
      Species: breed.Species
    })) : [];

    setBreedList(List);
  }

  


  const addBreed = async () => {

    // Define the breedData object with the necessary properties
  const breedData: BreedFormProps = {
    breed: breedInputRef.current!.value,
    species: Number(species)
  };

  const formData = new FormData();

  formData.append('operation', 'addBreed');
  formData.append('json', JSON.stringify(breedData));


  // Send the data using axios
  const response = await axios({
    url: `${process.env.NEXT_PUBLIC_URL}php/breeds.php`,
    method: 'POST',
    data: formData
  });

  // Log the response data
  console.log(response.data);

  }

  const errorToast = () => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Please fill out all fields.",
      // action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }

  return (
    <>
      {/* <div className="flex flex-1 flex-col gap-4 md:gap-8 ">
      
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        </div>
      </div>
      
      <div>
        asd
      </div> */}
      <div className="flex flex-col">
        {/* <div className="flex">
          Manage Breeds
        </div> */}
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
                        Add Breed
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Breed</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to add new breed. Click submit when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Breed
                        </Label>
                        <Input
                          ref={breedInputRef}
                          onChange={(e) => setBreed(e.target.value)}
                          id="name"
                          defaultValue=""
                          className="col-span-3"
                          required
                        />
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
                        <Select onValueChange={(e) => setSpecies(e)}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            { speciesList.map((species: SpeciesProps) => (
                              <SelectItem
                                key={species.SpeciesID}
                                value={species.SpeciesID.toString()}
                              >
                                {species.SpeciesName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => { breed == '' || species == '' ? errorToast() : addBreed()}} type="submit">Submit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Manage Breeds</CardTitle>
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
                        <TableHead>Breed Name</TableHead>
                        <TableHead>Species</TableHead>
                        <TableHead className="hidden md:table-cell">
                          {/* Price */}
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          {/* Total Sales */}
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      { breedList.map((breed: BreedProps) => (
                        <TableRow key={breed.BreedID}>
                        <TableCell className="hidden sm:table-cell">
                        {breed.BreedID}
                        </TableCell>
                        <TableCell className="font-medium">
                          {breed.BreedName}
                        </TableCell>
                        <TableCell>
                          {/* <Badge variant="outline">Active</Badge> */}
                          {breed.Species}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {/* $199.99 */}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {/* 30 */}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2024-02-14 02:14 PM
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
                      </TableRow>
                      ))}
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
