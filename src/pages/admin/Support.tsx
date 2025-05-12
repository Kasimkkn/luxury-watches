
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatMessage, CustomerInquiry } from "@/types/admin";
import { Calendar, Clock, MessageSquare, Phone, Search } from "lucide-react";
import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock customer inquiries
const mockInquiries: CustomerInquiry[] = [
  {
    id: "inq-1",
    userId: "2",
    userName: "John Doe",
    subject: "Order Status Inquiry",
    message: "I placed an order 3 days ago and haven't received any updates. Can you check the status please?",
    date: "2023-05-10T09:15:00.000Z",
    status: "open",
    priority: "medium"
  },
  {
    id: "inq-2",
    userId: "3",
    userName: "Emma Thompson",
    subject: "Return Request",
    message: "I received my watch but it's not what I expected. I'd like to initiate a return.",
    date: "2023-05-09T14:30:00.000Z",
    status: "in-progress",
    priority: "high",
    assignedTo: "Admin User"
  },
  {
    id: "inq-3",
    userId: "4",
    userName: "Michael Blake",
    subject: "Product Authenticity Question",
    message: "How can I verify that the Rolex I purchased from your site is authentic?",
    date: "2023-05-08T11:45:00.000Z",
    status: "resolved",
    priority: "medium",
    assignedTo: "Admin User"
  },
  {
    id: "inq-4",
    userId: "5",
    userName: "Sarah Johnson",
    subject: "International Shipping Question",
    message: "Do you ship to Australia and what are the additional costs?",
    date: "2023-05-07T16:20:00.000Z",
    status: "closed",
    priority: "low"
  },
  {
    id: "inq-5",
    userId: "7",
    userName: "Jennifer Wilson",
    subject: "Product Recommendation",
    message: "I'm looking for a ladies watch under $5,000. Can you recommend something elegant?",
    date: "2023-05-11T10:05:00.000Z",
    status: "open",
    priority: "low"
  },
];

// Mock chat messages for the first inquiry
const mockChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    inquiryId: "inq-1",
    sender: "customer",
    message: "I placed an order 3 days ago and haven't received any updates. Can you check the status please?",
    timestamp: "2023-05-10T09:15:00.000Z",
    read: true
  },
  {
    id: "msg-2",
    inquiryId: "inq-1",
    sender: "admin",
    message: "Hello John, thank you for reaching out. I can check that for you. Could you please provide your order number?",
    timestamp: "2023-05-10T09:30:00.000Z",
    read: true
  },
  {
    id: "msg-3",
    inquiryId: "inq-1",
    sender: "customer",
    message: "Sure, it's ORD-9385",
    timestamp: "2023-05-10T09:45:00.000Z",
    read: true
  },
  {
    id: "msg-4",
    inquiryId: "inq-1",
    sender: "admin",
    message: "Thank you. I can see that your order has been processed and is currently being prepared for shipping. You should receive a shipping confirmation email within the next 24 hours.",
    timestamp: "2023-05-10T10:00:00.000Z",
    read: true
  },
  {
    id: "msg-5",
    inquiryId: "inq-1",
    sender: "customer",
    message: "That's great to hear! Thank you for checking.",
    timestamp: "2023-05-10T10:15:00.000Z",
    read: true
  },
];

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(mockInquiries[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const isMobile = useIsMobile();

  // Filter inquiries based on search term and status
  const filteredInquiries = mockInquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? inquiry.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500 text-blue-50";
      case "in-progress":
        return "bg-amber-500 text-amber-50";
      case "resolved":
        return "bg-green-500 text-green-50";
      case "closed":
        return "bg-gray-500 text-gray-50";
      default:
        return "bg-gray-500 text-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-red-50";
      case "medium":
        return "bg-amber-500 text-amber-50";
      case "low":
        return "bg-green-500 text-green-50";
      default:
        return "bg-gray-500 text-gray-50";
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedInquiry) return;

    const newChatMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      inquiryId: selectedInquiry.id,
      sender: "admin",
      message: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, newChatMessage]);
    setNewMessage("");
  };

  const selectInquiry = (inquiry: CustomerInquiry) => {
    setSelectedInquiry(inquiry);
    // In a real app, you would fetch messages for this inquiry
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-playfair">Customer Support</h1>
      </div>

      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 h-[calc(100vh-240px)]">
        <Tabs defaultValue="chat" className="h-full flex flex-col">
          <div className="border-b border-gray-800 px-4 py-2 overflow-x-auto">
            <TabsList className="bg-[#232323]">
              <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <MessageSquare className="mr-2 h-4 w-4" /> Chat
              </TabsTrigger>
              <TabsTrigger value="calls" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Phone className="mr-2 h-4 w-4" /> Calls
              </TabsTrigger>
              <TabsTrigger value="scheduled" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Calendar className="mr-2 h-4 w-4" /> Scheduled
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Clock className="mr-2 h-4 w-4" /> History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 overflow-hidden p-0 flex h-full flex-col md:flex-row">
            {/* Inquiry list - conditionally show based on selected inquiry on mobile */}
            <div className={`${isMobile && selectedInquiry ? 'hidden' : 'block'} w-full md:w-1/3 border-r border-gray-800 h-full flex flex-col`}>
              <div className="p-4 border-b border-gray-800 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search inquiries..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex justify-between">
                  <Select onValueChange={(value) => setStatusFilter(value || undefined)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <ScrollArea className="flex-1">
                {filteredInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${selectedInquiry?.id === inquiry.id ? "bg-gray-800" : "hover:bg-gray-800/50"
                      }`}
                    onClick={() => selectInquiry(inquiry)}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-white">
                            {inquiry.userName.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{inquiry.userName}</div>
                          <div className="text-sm text-gray-400">{inquiry.subject}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(inquiry.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-300 line-clamp-1">
                      {inquiry.message}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge className={getStatusColor(inquiry.status)}>
                        {inquiry.status.replace("-", " ")}
                      </Badge>
                      <Badge className={getPriorityColor(inquiry.priority)}>
                        {inquiry.priority} priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            {/* Chat content - conditionally show based on selected inquiry on mobile */}
            <div className={`${isMobile && !selectedInquiry ? 'hidden' : 'block'} w-full md:w-2/3 flex flex-col h-full`}>
              {selectedInquiry ? (
                <>
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {isMobile && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedInquiry(null)}
                            className="mr-2"
                          >
                            Back
                          </Button>
                        )}
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-white">
                            {selectedInquiry.userName.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{selectedInquiry.userName}</div>
                          <div className="text-sm text-gray-400">{selectedInquiry.subject}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-wrap md:flex-nowrap gap-2">
                        <Select defaultValue={selectedInquiry.status}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue={selectedInquiry.priority}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Priority</SelectItem>
                            <SelectItem value="medium">Medium Priority</SelectItem>
                            <SelectItem value="high">High Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"
                            }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${message.sender === "admin"
                                ? "bg-primary text-white"
                                : "bg-[#2a2a2a] text-white"
                              }`}
                          >
                            <div className="text-sm">{message.message}</div>
                            <div className="text-xs mt-1 opacity-70">
                              {formatDate(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t border-gray-800">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        className="flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button type="submit" disabled={!newMessage.trim()}>
                        Send
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-xl font-medium text-white">No inquiry selected</h3>
                    <p className="text-gray-400 mt-2">Select an inquiry from the list to view details</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="calls" className="flex-1">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Phone className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-white">Call Management</h3>
                <p className="text-gray-400 mt-2">This feature is coming soon</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="flex-1">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-white">Scheduled Appointments</h3>
                <p className="text-gray-400 mt-2">This feature is coming soon</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="flex-1">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Clock className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-white">Support History</h3>
                <p className="text-gray-400 mt-2">This feature is coming soon</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Support;

