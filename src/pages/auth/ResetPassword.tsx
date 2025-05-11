
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  method: z.literal("email"),
});

const phoneSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number"),
  method: z.literal("phone"),
});

const resetSchema = z.discriminatedUnion("method", [emailSchema, phoneSchema]);

type ResetFormValues = z.infer<typeof emailSchema> | z.infer<typeof phoneSchema>;

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"email" | "phone">("email");

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      method: "email",
      email: "",
    },
  });

  async function onSubmit(data: ResetFormValues) {
    setIsLoading(true);
    const identifier = data.method === "email" ? data.email : data.phone;
    await resetPassword(identifier);
    setIsLoading(false);
  }

  const handleTabChange = (value: string) => {
    if (value === "email") {
      form.reset({ method: "email", email: "" });
      setActiveTab("email");
    } else {
      form.reset({ method: "phone", phone: "" });
      setActiveTab("phone");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container max-w-md mx-auto px-4">
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-800">
            <h1 className="text-3xl font-bold text-white font-playfair mb-2 text-center">Reset Password</h1>
            <p className="text-gray-400 text-center mb-6">
              Enter your email or phone number to receive a verification code
            </p>
            
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <TabsContent value="email">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input
                                placeholder="you@example.com"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="phone">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input
                                placeholder="+1234567890"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Reset Code"}
                  </Button>
                </form>
              </Form>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResetPassword;
