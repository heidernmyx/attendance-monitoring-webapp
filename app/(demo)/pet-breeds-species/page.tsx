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
import { useForm, SubmitHandler, set } from "react-hook-form";
import { SpeciesProps, BreedProps } from '@/lib/utils';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { spec } from 'node:test/reporters';

type PetDetails = {
  petname: string,
  birthdate: string,
  owner: number,
  species: number,
  breed: number
}


interface PetProps {
  PetID: number,
  PetName: string,
  SpeciesName: string,
  BreedName: string,
  DateOfBirth: string,
  OwnerName: string,
}

interface OwnerList {
  OwnerID: number,
  Name: string
}

export default function PetPage() {

  const { register, handleSubmit, setValue } = useForm<PetDetails>();
  const [speciesList, setSpeciesList] = React.useState<SpeciesProps[]>([]);
  const [ breedList, setBreedList ] = React.useState<BreedProps[]>([]);
  const [ ownerList, setOwnerList ] = React.useState<OwnerList[]>([]);
  const [ searchInput, setSearchInput ] = React.useState(''); 
  const [ suggestions, setSuggestions ] = React.useState<OwnerList[]>([]);
  const [isFocused, setIsFocused] = React.useState(false);
  const [ petList, setPetList ] = React.useState<PetProps[]>([]);
  const [ selectedOwner, setSelectedOwner ] = React.useState('');
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const searchInputFilterRef = React.useRef<HTMLInputElement>(null);


  const { toast } = useToast();
  React.useEffect(() => {
    fetchPets();
    fetchSpecies();
    // fetchBreeds();
    // fetchOwner();
    fetchOwner();
  }, [])
  
  React.useEffect(() => {
    setSuggestions([]);
    searchSuggestion();
    if (searchInput == '') {
      setSuggestions([])
    }
  }, [searchInput])

  const fetchPets = async () => {
    const response = await axios<PetProps>(`${process.env.NEXT_PUBLIC_URL}php/pets.php`,{
      params: { operation: 'getPets'}
    })


    console.log(response.data)
    const List: PetProps[] = Array.isArray(response.data) ? response.data.map((pet: PetProps) => ({
      PetID: pet.PetID,
      PetName: pet.PetName,
      SpeciesName: pet.SpeciesName,
      BreedName: pet.BreedName,
      DateOfBirth: pet.DateOfBirth,
      OwnerName: pet.OwnerName
    })) : [];
    setPetList(List);



  }

  const submitPet: SubmitHandler<PetDetails> = async (data) => {

    const petData: PetDetails = {
      birthdate: data.birthdate,
      breed: data.breed,
      owner: data.owner,
      petname: data.petname,
      species: data.species
    }

    const formData = new FormData();
    formData.append('operation', 'addPet');
    formData.append('json', JSON.stringify(petData));

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}php/pets.php`,
      method: "POST",
      data: formData,
    })

    if (response.data == 1) {
      // alert("Pet added successfully");
      toast({
        title: "Pet added successfully",
        description: "Pet has been added successfully",
      })
    }
  }


  const searchSuggestion = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}php/owners.php`,{
      params: { operation: 'searchOwner', json: JSON.stringify({ search: searchInput }) }
    })
    console.log(response.data)

    const List: OwnerList[] = Array.isArray(response.data) ? response.data.map((owner: OwnerList) => ({
      OwnerID: owner.OwnerID,
      Name: owner.Name
    })) : [];
    console.log("List", List)
    console.log("Suggestions", suggestions)
    setSuggestions(List);
  }

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

  const fetchOwner = async () => {
    const response = await axios.get<OwnerList>(`${process.env.NEXT_PUBLIC_URL}php/owners.php`, {
      params: { operation: 'getOwner', search: searchInput }
    });

    console.log(response.data)

    const List: OwnerList[] = Array.isArray(response.data) ? response.data.map((owner: OwnerList) => ({
      OwnerID: owner.OwnerID,
      Name: owner.Name
    })): [];
    console.log("owners:", List);
    console.log(ownerList)
    setOwnerList(List);

  }

  const fetchBreedByID = async (speciesID: string) => {

    // console.log(speciesID)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}php/breeds.php`, {
      params: { operation: 'getBreedBySpeciesID',
      json: JSON.stringify({ speciesID: speciesID}) }
    })
    console.log("nigga data",response.data)
  //   if (response.data.length > 0) {
  //     console.log(true)
  //     const List: SpeciesProps[] = Array.isArray(response.data) ? response.data.map((species: SpeciesProps) => ({
  //       SpeciesID: species.SpeciesID,
  //       SpeciesName: species.SpeciesName
  //     })) : [];
  //     console.log("nigga: ",List)
  //     setSpeciesList(List);
  // }

  const List: BreedProps[] = Array.isArray(response.data) ? response.data.map((breed: BreedProps) => ({
    BreedID: breed.BreedID,
    BreedName: breed.BreedName,
    Species: breed.Species
  })) : [];
  setBreedList(List);
}



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
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Owner
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    { ownerList.map((owner: OwnerList) => (
                      <DropdownMenuCheckboxItem 
                        onClick={() => {setSelectedOwner(owner.Name), console.log(selectedOwner)}}
                        key={owner.OwnerID}>
                        {owner.Name}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
                <div className="col-span-3 relative w-full">
                            {/* Input field */}
                            <Input
                              ref={searchInputFilterRef}
                              onChange={(e) => setSearchInput(e.target.value)}
                              onFocus={() => setIsFocused(true)}
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
                            { isFocused && suggestions.length > 0 && (
                              <div className="absolute w-full bg-background text-foreground border border-gray-300 shadow-lg mt-1 z-10">
                                {suggestions.map((owner) => (
                                  <div
                                    // { ...register('owner', { required: true }) }
                                    onClick={() => {
                                      setValue('owner', owner.OwnerID)
                                      if (searchInputFilterRef.current) {
                                        searchInputFilterRef.current.value = owner.Name;
                                      }
                                      console.log(owner.Name)
                                      setTimeout(() => {
                                        setIsFocused(false);
                                      }, 100)
                                    }}
                                    key={owner.OwnerID}
                                    className="p-2 hover:bg-muted cursor-pointer"
                                  >
                                    {owner.Name}
                                  </div>
                                ))}
                              </div>
                            )}
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
                    <form onSubmit={handleSubmit(submitPet)}>
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
                            { ...register('petname', { required: true , }) }
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
                            { ...register('birthdate', { required: true }) }
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Owner
                          </Label>
                          <div className="col-span-3 relative w-full">
                            {/* Input field */}
                            <Input
                              ref={searchInputRef}
                              onChange={(e) => setSearchInput(e.target.value)}
                              onFocus={() => setIsFocused(true)}
                              // onBlur={() => setTimeout(() => {
                              //   setIsFocused(false);
                              // }, 100)}
                              id="name"
                              defaultValue=""
                              className="w-full" // Make sure the input spans the full width
                              required
                            />

                            {/* Suggestions dropdown */}
                            { isFocused && suggestions.length > 0 && (
                              <div className="absolute w-full bg-background text-foreground border border-gray-300 shadow-lg mt-1 z-10">
                                {suggestions.map((owner) => (
                                  <div
                                    { ...register('owner', { required: true }) }
                                    onClick={(e) => {
                                      setValue('owner', owner.OwnerID)
                                      // setSearchInput(e.target.textContent)
                                      if (searchInputRef.current) {
                                        searchInputRef.current.value = owner.Name;
                                      }
                                      setTimeout(() => {
                                        setIsFocused(false);
                                      }, 100)
                                    }}
                                    key={owner.OwnerID}
                                    className="p-2 hover:bg-muted cursor-pointer"
                                  >
                                    {owner.Name}
                                  </div>
                                ))}
                              </div>
                            )}
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
                          <Select onValueChange={(value) => {setValue('species', Number(value)), fetchBreedByID(value)}}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue {...register("species", {required: "Required"})} placeholder="" />
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
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Breed
                          </Label>
                          {/* <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                          /> */}
                          <Select onValueChange={(value) => setValue('breed', Number(value))}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue {...register("breed", {required: "Required"})} placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                            { breedList.map((breeds: BreedProps) => (
                              <SelectItem
                                key={breeds.BreedID}
                                value={breeds.BreedID.toString()}
                              >
                                {breeds.BreedName}
                              </SelectItem>
                            ))}
                            </SelectContent>
                          </Select>
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
                      { petList.map((pets) => (
                        <TableRow key={pets.PetID}>
                        <TableCell className="hidden sm:table-cell">
                          {pets.PetID}
                        </TableCell>
                        <TableCell className="font-medium">
                          {pets.PetName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{pets.SpeciesName}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {pets.BreedName}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {pets.DateOfBirth}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {pets.OwnerName}
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
