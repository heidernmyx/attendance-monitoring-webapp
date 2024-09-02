'use client'
import React from "react";
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
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { SpeciesProps } from '@/lib/utils'; 
import axios from 'axios';


export default function PetSpecies() {

  const [ species, setSpecies ] = React.useState('');
  const [ speciesList, setSpeciesList ] = React.useState<SpeciesProps[]>([]);
  const { toast } = useToast()
  const speciesInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fetchSpecies();
  }, [])

  const fetchSpecies = async () => {
    const response = await axios.get<SpeciesProps[]>(`${process.env.NEXT_PUBLIC_URL}php/species.php`, {
      params: {
        operation: 'getSpecies'
      }
    });
    console.log(response.data)
    if (response.data.length > 0) {
      const List: SpeciesProps[] = Array.isArray(response.data) ? response.data.map((species: SpeciesProps) =>  ({
        SpeciesID: species.SpeciesID,
        SpeciesName: species.SpeciesName
      })): [];
  
      console.log(List)
      setSpeciesList(List);
    }
  }

  const submitSpecies = async (e: any) => {
    e?.preventDefault();

    const formData = new FormData();
    formData.append('operation', 'addSpecies');
    formData.append('json', JSON.stringify({ species }));
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}php/species.php`,
      method: 'POST',
      data: formData
    })
    console.log(response.data);
    if (response.data == 1) {
      toast({
        variant: "default",
        title: "Species added successfully.",
        // description: "There was a problem with your request.",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      speciesInputRef.current!.value = '';
    }
  }


  const errorToast = () => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }

  return (
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
                      Add Species
                    </span>
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={submitSpecies}>
                    <DialogHeader>
                      <DialogTitle>Add Species</DialogTitle>
                      <DialogDescription>
                        Fill in the species name below to add new species. Click submit when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Species
                        </Label>
                        <Input
                          ref={speciesInputRef}
                          onChange={(e) => setSpecies(e.target.value)}
                          id="name"
                          defaultValue=""
                          className="col-span-3"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={(e) => species == '' ? errorToast() : submitSpecies(e)}
                        type="submit">
                        Submit
                      </Button>
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
                        ID
                      </TableHead>
                      <TableHead>Species</TableHead>
                      <TableHead>
                        {/* Species */}
                      </TableHead>
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
                    { speciesList.map((value) => (  
                      <TableRow key={value.SpeciesID}>
                        <TableCell className="hidden sm:table-cell">
                          {value.SpeciesID}
                        </TableCell>
                        <TableCell className="font-medium">
                          {value.SpeciesName}
                        </TableCell>
                        <TableCell>
                          {/* <Badge variant="outline">Active</Badge> */}
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
  );
}
