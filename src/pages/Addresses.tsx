
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";
import { Address } from "@/types/checkout";

// Form schema for address
const addressSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  street: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  isDefault: z.boolean().default(false),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const Addresses = () => {
  // Mock addresses data (in a real app, this would come from your state/API)
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr1",
      name: "John Doe",
      phone: "+91 9876543210",
      street: "123 Main St, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India",
      isDefault: true
    },
    {
      id: "addr2",
      name: "John Doe",
      phone: "+91 9876543210",
      street: "456 Park Avenue",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      country: "India",
      isDefault: false
    }
  ]);

  // State for dialog control
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  // Setup form
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      isDefault: false
    }
  });

  // Function to add a new address
  const onAddSubmit = (data: AddressFormValues) => {
    const newAddress: Address = {
      ...data,
      id: "addr" + (addresses.length + 1)
    };
    
    // If this is set as default, update other addresses
    if (newAddress.isDefault) {
      setAddresses(addresses.map(addr => ({
        ...addr,
        isDefault: false
      })).concat(newAddress));
    } else {
      setAddresses([...addresses, newAddress]);
    }
    
    setIsAddDialogOpen(false);
    form.reset();
    toast.success("Address added successfully!");
  };

  // Function to edit an address
  const onEditSubmit = (data: AddressFormValues) => {
    if (!currentAddress) return;
    
    const updatedAddresses = addresses.map(addr => {
      if (addr.id === currentAddress.id) {
        return {
          ...data,
          id: addr.id
        };
      }
      
      // If this address is set as default, update other addresses
      if (data.isDefault) {
        return {
          ...addr,
          isDefault: addr.id === currentAddress.id
        };
      }
      
      return addr;
    });
    
    setAddresses(updatedAddresses);
    setIsEditDialogOpen(false);
    toast.success("Address updated successfully!");
  };

  // Function to delete an address
  const deleteAddress = () => {
    if (!currentAddress) return;
    
    setAddresses(addresses.filter(addr => addr.id !== currentAddress.id));
    setIsDeleteDialogOpen(false);
    toast.success("Address deleted successfully!");
  };

  // Function to open edit dialog with pre-filled data
  const openEditDialog = (address: Address) => {
    setCurrentAddress(address);
    form.reset({
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault
    });
    setIsEditDialogOpen(true);
  };

  // Function to open delete confirmation dialog
  const openDeleteDialog = (address: Address) => {
    setCurrentAddress(address);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white font-playfair">Your Addresses</h1>
            <Button 
              onClick={() => {
                form.reset({
                  name: "",
                  phone: "",
                  street: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "India",
                  isDefault: !addresses.some(addr => addr.isDefault)
                });
                setIsAddDialogOpen(true);
              }}
              className="bg-primary text-black hover:bg-primary/90"
            >
              <Plus size={18} className="mr-2" /> Add Address
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => (
              <Card key={address.id} className="bg-[#1a1a1a] border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <MapPin className="text-primary shrink-0 mr-3 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold text-white">{address.name}</h3>
                        <p className="text-gray-400 text-sm">{address.phone}</p>
                      </div>
                    </div>
                    
                    {address.isDefault && (
                      <span className="text-xs text-primary border border-primary rounded-full px-2 py-0.5 font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 text-gray-300 text-sm">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.country}</p>
                  </div>
                  
                  <Separator className="my-4 bg-gray-800" />
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 bg-transparent hover:bg-[#232323] text-gray-300"
                      onClick={() => openEditDialog(address)}
                    >
                      <Edit size={14} className="mr-2" /> Edit
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-800 bg-transparent hover:bg-red-900/20 text-red-500"
                      onClick={() => openDeleteDialog(address)}
                    >
                      <Trash2 size={14} className="mr-2" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {addresses.length === 0 && (
            <EmptyState
              title="No Addresses Found"
              description="You haven't added any addresses yet. Add an address to continue with checkout."
              action={{
                label: "Add Address",
                onClick: () => setIsAddDialogOpen(true)
              }}
              icon="📍"
            />
          )}
        </div>
      </main>
      
      {/* Add Address Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair">Add New Address</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details to add a new delivery address
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAddSubmit)} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe"
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+91 9876543210"
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Street Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123 Main St, Apartment 4B"
                        className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">City</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Mumbai"
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">State</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Maharashtra"
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">ZIP Code</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="400001"
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Country</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="India"
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-white">Set as default address</FormLabel>
                      <FormDescription className="text-gray-500 text-sm">
                        This will be used as your default shipping address
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="border-gray-700 bg-transparent hover:bg-[#232323] text-gray-300"
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary text-black hover:bg-primary/90"
                >
                  Save Address
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Address Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair">Edit Address</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update your delivery address details
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Street Address</FormLabel>
                    <FormControl>
                      <Input 
                        className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">City</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">State</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">ZIP Code</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Country</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-white">Set as default address</FormLabel>
                      <FormDescription className="text-gray-500 text-sm">
                        This will be used as your default shipping address
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                  className="border-gray-700 bg-transparent hover:bg-[#232323] text-gray-300"
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary text-black hover:bg-primary/90"
                >
                  Update Address
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Address Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1a1a1a] border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Address</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this address? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700 bg-transparent hover:bg-[#232323] text-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={deleteAddress}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default Addresses;

// Fix missing import and type
import { FormDescription } from "@/components/ui/form";
