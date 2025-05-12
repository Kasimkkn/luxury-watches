
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { CreditCard, Wallet, Plus, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { Watch } from "@/types";
import { Address } from "@/types/checkout";

// Mock cart items (in real-world, this would come from your cart state/context)
const mockCartItems: (Watch & { quantity: number })[] = [
  {
    id: "1",
    brand: "Rolex",
    model: "Submariner",
    price: 1250000,
    quantity: 1,
    images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080"],
    description: "Iconic diving watch with unidirectional rotatable bezel",
    specifications: {
      case: "Stainless Steel",
      movement: "Automatic",
      bracelet: "Oyster",
      dial: "Black",
      box: true,
      papers: true,
      diameter: "41mm"
    },
    inStock: true,
    condition: "New"
  }
];

// Mock saved addresses
const savedAddresses: Address[] = [
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
];

// Form schema for credit card
const cardSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be at least 16 digits").max(19, "Card number must be at most 19 digits"),
  cardName: z.string().min(2, "Name must be at least 2 characters"),
  expiryMonth: z.string().min(2, "Please enter a valid month").max(2, "Please enter a valid month"),
  expiryYear: z.string().min(2, "Please enter a valid year").max(2, "Please enter a valid year"),
  cvv: z.string().min(3, "CVV must be at least 3 digits").max(4, "CVV must be at most 4 digits"),
});

// Form schema for UPI
const upiSchema = z.object({
  upiId: z.string().min(5, "Please enter a valid UPI ID").includes("@", "UPI ID must contain @ symbol")
});

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentTab, setPaymentTab] = useState("card");
  const [selectedAddressId, setSelectedAddressId] = useState(savedAddresses[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const cartItems = mockCartItems; // In a real app, you'd get this from your cart state/store

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = 0; // Free shipping
  const total = subtotal + tax + shipping;

  // Setup card payment form
  const cardForm = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  // Setup UPI payment form
  const upiForm = useForm<z.infer<typeof upiSchema>>({
    resolver: zodResolver(upiSchema),
    defaultValues: {
      upiId: "",
    },
  });

  // Function to handle card payment
  const onCardSubmit = (data: z.infer<typeof cardSchema>) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful!");
      
      // In a real app, you would create an order and then redirect to order confirmation
      navigate("/payment-success");
    }, 1500);
  };

  // Function to handle UPI payment
  const onUpiSubmit = (data: z.infer<typeof upiSchema>) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful!");
      
      // In a real app, you would create an order and then redirect to order confirmation
      navigate("/payment-success");
    }, 1500);
  };

  // Function to handle wallet/COD payment
  const onWalletSubmit = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful!");
      
      // In a real app, you would create an order and then redirect to order confirmation
      navigate("/payment-success");
    }, 1500);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${(amount).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white font-playfair mb-8">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Address and Payment */}
            <div className="lg:w-2/3 space-y-6">
              {/* Shipping Address */}
              <Card className="bg-[#1a1a1a] border-gray-800 text-white">
                <CardHeader className="border-b border-gray-800 pb-4">
                  <h2 className="text-xl font-bold">Shipping Address</h2>
                </CardHeader>
                <CardContent className="pt-6">
                  <RadioGroup 
                    value={selectedAddressId} 
                    onValueChange={setSelectedAddressId}
                    className="space-y-4"
                  >
                    {savedAddresses.map((address) => (
                      <div 
                        key={address.id} 
                        className={`rounded-lg border p-4 relative ${
                          selectedAddressId === address.id 
                            ? "border-primary bg-[#232323]" 
                            : "border-gray-700"
                        }`}
                      >
                        <RadioGroupItem 
                          value={address.id}
                          id={`address-${address.id}`}
                          className="absolute top-4 right-4"
                        />
                        <Label 
                          htmlFor={`address-${address.id}`}
                          className="flex flex-col cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-white">{address.name}</p>
                              <p className="text-sm text-gray-400 mt-1">{address.phone}</p>
                            </div>
                            {address.isDefault && (
                              <span className="text-xs text-primary border border-primary rounded-full px-2 py-0.5 font-medium">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-300 text-sm mt-3">
                            {address.street}, {address.city}, {address.state} {address.zipCode}, {address.country}
                          </p>
                        </Label>
                      </div>
                    ))}
                    
                    {/* Add New Address */}
                    <div 
                      className="rounded-lg border border-dashed border-gray-700 p-4 flex items-center justify-center cursor-pointer hover:border-gray-500 transition-colors"
                      onClick={() => navigate('/addresses')}
                    >
                      <div className="flex flex-col items-center text-center text-gray-400">
                        <Plus size={24} className="mb-2" />
                        <span>Add New Address</span>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              {/* Payment Method */}
              <Card className="bg-[#1a1a1a] border-gray-800 text-white">
                <CardHeader className="border-b border-gray-800 pb-4">
                  <h2 className="text-xl font-bold">Payment Method</h2>
                </CardHeader>
                <CardContent className="pt-6">
                  <Tabs value={paymentTab} onValueChange={setPaymentTab}>
                    <TabsList className="grid grid-cols-2 sm:grid-cols-4 bg-[#232323]">
                      <TabsTrigger value="card" className="data-[state=active]:bg-[#333]">
                        <div className="flex items-center gap-2">
                          <CreditCard size={16} />
                          <span className="hidden sm:inline">Card</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger value="upi" className="data-[state=active]:bg-[#333]">
                        <div className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9L12 3L5 9V21H19V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 21V15H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="hidden sm:inline">UPI</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger value="wallet" className="data-[state=active]:bg-[#333]">
                        <div className="flex items-center gap-2">
                          <Wallet size={16} />
                          <span className="hidden sm:inline">Wallet</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger value="cod" className="data-[state=active]:bg-[#333]">
                        <div className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="hidden sm:inline">COD</span>
                        </div>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card">
                      <Form {...cardForm}>
                        <form onSubmit={cardForm.handleSubmit(onCardSubmit)} className="space-y-4 mt-4">
                          <FormField
                            control={cardForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Card Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="1234 5678 9012 3456"
                                    className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={cardForm.control}
                            name="cardName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Cardholder Name</FormLabel>
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
                          
                          <div className="grid grid-cols-3 gap-4">
                            <FormField
                              control={cardForm.control}
                              name="expiryMonth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Month</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="MM"
                                      className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={cardForm.control}
                              name="expiryYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Year</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="YY"
                                      className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={cardForm.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">CVV</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="123"
                                      className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                                      type="password"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-primary text-black font-bold hover:bg-primary/90 mt-4"
                            disabled={isProcessing}
                          >
                            {isProcessing ? "Processing..." : `Pay ${formatCurrency(total)}`}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                    
                    <TabsContent value="upi">
                      <Form {...upiForm}>
                        <form onSubmit={upiForm.handleSubmit(onUpiSubmit)} className="space-y-4 mt-4">
                          <FormField
                            control={upiForm.control}
                            name="upiId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">UPI ID</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="username@upi"
                                    className="bg-[#232323] border-gray-700 text-white placeholder:text-gray-500"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                            <Check size={16} />
                            <span>Your payment is secure and encrypted</span>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-primary text-black font-bold hover:bg-primary/90 mt-4"
                            disabled={isProcessing}
                          >
                            {isProcessing ? "Processing..." : `Pay ${formatCurrency(total)} via UPI`}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                    
                    <TabsContent value="wallet">
                      <div className="mt-4 space-y-4">
                        <div className="bg-[#232323] p-4 rounded-lg">
                          <p className="text-gray-300 mb-2">Pay using your digital wallet</p>
                          <p className="text-sm text-gray-400">Choose from our supported wallet options below.</p>
                        </div>
                        
                        <RadioGroup defaultValue="paytm" className="grid grid-cols-2 gap-4">
                          <div className="bg-[#232323] p-3 rounded-lg border border-gray-700 flex items-center justify-between cursor-pointer">
                            <Label className="cursor-pointer" htmlFor="paytm">
                              <div className="flex items-center gap-2">
                                {/* PayTM logo placeholder */}
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">P</div>
                                <span className="text-white">PayTM</span>
                              </div>
                            </Label>
                            <RadioGroupItem value="paytm" id="paytm" />
                          </div>
                          
                          <div className="bg-[#232323] p-3 rounded-lg border border-gray-700 flex items-center justify-between cursor-pointer">
                            <Label className="cursor-pointer" htmlFor="phonepe">
                              <div className="flex items-center gap-2">
                                {/* PhonePe logo placeholder */}
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">P</div>
                                <span className="text-white">PhonePe</span>
                              </div>
                            </Label>
                            <RadioGroupItem value="phonepe" id="phonepe" />
                          </div>
                          
                          <div className="bg-[#232323] p-3 rounded-lg border border-gray-700 flex items-center justify-between cursor-pointer">
                            <Label className="cursor-pointer" htmlFor="amazonpay">
                              <div className="flex items-center gap-2">
                                {/* Amazon Pay logo placeholder */}
                                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
                                <span className="text-white">Amazon Pay</span>
                              </div>
                            </Label>
                            <RadioGroupItem value="amazonpay" id="amazonpay" />
                          </div>
                          
                          <div className="bg-[#232323] p-3 rounded-lg border border-gray-700 flex items-center justify-between cursor-pointer">
                            <Label className="cursor-pointer" htmlFor="gpay">
                              <div className="flex items-center gap-2">
                                {/* GPay logo placeholder */}
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">G</div>
                                <span className="text-white">Google Pay</span>
                              </div>
                            </Label>
                            <RadioGroupItem value="gpay" id="gpay" />
                          </div>
                        </RadioGroup>
                        
                        <Button 
                          onClick={onWalletSubmit} 
                          className="w-full bg-primary text-black font-bold hover:bg-primary/90 mt-4"
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : `Pay ${formatCurrency(total)}`}
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="cod">
                      <div className="mt-4 space-y-4">
                        <div className="bg-[#232323] p-4 rounded-lg">
                          <p className="text-gray-300 mb-2">Cash on Delivery</p>
                          <p className="text-sm text-gray-400">
                            Pay with cash when your order is delivered. Please note that a small convenience fee may be applied.
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-amber-400 text-sm mt-4">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>COD available only for orders below ₹500,000</span>
                        </div>
                        
                        <Button 
                          onClick={onWalletSubmit} 
                          className="w-full bg-primary text-black font-bold hover:bg-primary/90 mt-4"
                          disabled={isProcessing || total > 500000}
                        >
                          {isProcessing 
                            ? "Processing..." 
                            : total > 500000 
                              ? "COD not available for this order" 
                              : `Place Order - Pay ${formatCurrency(total)} on Delivery`}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Order Summary */}
            <div className="lg:w-1/3">
              <Card className="bg-[#1a1a1a] border-gray-800 text-white">
                <CardHeader className="border-b border-gray-800 pb-4">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-20 w-20 bg-[#232323] rounded-md flex items-center justify-center">
                          <img 
                            src={item.images[0]} 
                            alt={item.model} 
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="text-white">{item.brand} {item.model}</p>
                          <div className="text-sm text-gray-400 mt-1">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-right">
                          <p className="text-primary font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4 bg-gray-800" />
                  
                  {/* Pricing Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Subtotal</span>
                      <span className="text-white">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">GST (18%)</span>
                      <span className="text-white">{formatCurrency(tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Shipping</span>
                      <span className="text-green-500">Free</span>
                    </div>
                    
                    <Separator className="my-4 bg-gray-800" />
                    
                    <div className="flex justify-between text-base font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-primary">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
