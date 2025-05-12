
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { AdminUser } from "@/types/admin";
import { ArrowDown, ArrowUp, Edit, Filter, Search, Trash, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";

// Mock users data
const mockUsers: AdminUser[] = [
  {
    id: "1",
    email: "admin@luxurywatches.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    createdAt: "2023-01-10T00:00:00.000Z",
    lastLogin: "2023-05-11T08:30:00.000Z",
    status: "active",
    totalPurchases: 0,
    totalSpent: 0
  },
  {
    id: "2",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    createdAt: "2023-02-15T00:00:00.000Z",
    lastLogin: "2023-05-10T16:45:00.000Z",
    status: "active",
    totalPurchases: 5,
    totalSpent: 42500
  },
  {
    id: "3",
    email: "emma.thompson@example.com",
    firstName: "Emma",
    lastName: "Thompson",
    role: "user",
    createdAt: "2023-03-05T00:00:00.000Z",
    lastLogin: "2023-05-09T10:20:00.000Z",
    status: "active",
    totalPurchases: 3,
    totalSpent: 16800
  },
  {
    id: "4",
    phone: "+1234567890",
    firstName: "Michael",
    lastName: "Blake",
    role: "user",
    createdAt: "2023-03-10T00:00:00.000Z",
    lastLogin: "2023-05-08T14:15:00.000Z",
    status: "active",
    totalPurchases: 2,
    totalSpent: 8700
  },
  {
    id: "5",
    email: "sarah.johnson@example.com",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "user",
    createdAt: "2023-03-20T00:00:00.000Z",
    lastLogin: "2023-05-05T09:30:00.000Z",
    status: "active",
    totalPurchases: 1,
    totalSpent: 3200
  },
  {
    id: "6",
    email: "robert.smith@example.com",
    firstName: "Robert",
    lastName: "Smith",
    role: "user",
    createdAt: "2023-04-01T00:00:00.000Z",
    lastLogin: "2023-04-28T11:45:00.000Z",
    status: "inactive",
    totalPurchases: 0,
    totalSpent: 0
  },
  {
    id: "7",
    email: "jennifer.wilson@example.com",
    firstName: "Jennifer",
    lastName: "Wilson",
    role: "user",
    createdAt: "2023-04-12T00:00:00.000Z",
    status: "active",
    totalPurchases: 4,
    totalSpent: 24500
  },
  {
    id: "8",
    email: "david.brown@example.com",
    firstName: "David",
    lastName: "Brown",
    role: "user",
    createdAt: "2023-04-20T00:00:00.000Z",
    lastLogin: "2023-05-01T16:10:00.000Z",
    status: "suspended",
    totalPurchases: 2,
    totalSpent: 17300
  }
];

const Users = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState<"delete" | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<"totalSpent" | "firstName" | "createdAt" | "lastLogin" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "suspended">("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const usersPerPage = 5;

  // Handle sorting
  const handleSort = (field: "totalSpent" | "firstName" | "createdAt" | "lastLogin") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    // First apply the search filter
    let result = mockUsers.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Then apply the status filter
    if (statusFilter !== "all") {
      result = result.filter(user => user.status === statusFilter);
    }
    
    // Finally, sort the results
    if (sortField) {
      result = [...result].sort((a, b) => {
        if (sortField === "firstName") {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return sortDirection === "asc" 
            ? nameA.localeCompare(nameB) 
            : nameB.localeCompare(nameA);
        }
        
        if (sortField === "createdAt" || sortField === "lastLogin") {
          const dateA = a[sortField] ? new Date(a[sortField]).getTime() : 0;
          const dateB = b[sortField] ? new Date(b[sortField]).getTime() : 0;
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        }
        
        // Default case (totalSpent)
        return sortDirection === "asc" 
          ? a.totalSpent - b.totalSpent 
          : b.totalSpent - a.totalSpent;
      });
    }
    
    return result;
  }, [searchTerm, sortField, sortDirection, statusFilter]);

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredAndSortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getUserInitials = (user: AdminUser) => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-green-50";
      case "inactive":
        return "bg-gray-500 text-gray-50";
      case "suspended":
        return "bg-red-500 text-red-50";
      default:
        return "bg-gray-500 text-gray-50";
    }
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAllUsers = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map(user => user.id));
    }
  };

  const handleDelete = (user: AdminUser) => {
    setSelectedUser(user);
    setOpenDialog("delete");
  };

  const confirmDelete = () => {
    if (selectedUser) {
      toast({
        title: "User deleted",
        description: `${selectedUser.firstName} ${selectedUser.lastName}'s account has been deleted.`
      });
      setOpenDialog(null);
      setSelectedUser(null);
    }
  };

  const handleBulkDelete = () => {
    toast({
      title: "Users deleted",
      description: `${selectedUsers.length} users have been deleted.`
    });
    setSelectedUsers([]);
  };

  // Render sort indicator
  const renderSortIndicator = (field: "totalSpent" | "firstName" | "createdAt" | "lastLogin") => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-playfair">Users</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as "all" | "active" | "inactive" | "suspended")}
            >
              <SelectTrigger className="w-[180px] bg-transparent text-white border-gray-700">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            
            {selectedUsers.length > 0 && (
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash className="mr-2 h-4 w-4" /> Delete Selected
              </Button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-[#222]">
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={currentUsers.length > 0 && selectedUsers.length === currentUsers.length}
                    onCheckedChange={handleSelectAllUsers}
                  />
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("firstName")}
                >
                  <div className="flex items-center">
                    User {renderSortIndicator("firstName")}
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead 
                  className="hidden md:table-cell cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center">
                    Joined {renderSortIndicator("createdAt")}
                  </div>
                </TableHead>
                <TableHead 
                  className="hidden md:table-cell cursor-pointer"
                  onClick={() => handleSort("lastLogin")}
                >
                  <div className="flex items-center">
                    Last Login {renderSortIndicator("lastLogin")}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("totalSpent")}
                >
                  <div className="flex items-center">
                    Total Spent {renderSortIndicator("totalSpent")}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-[#222]">
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleSelectUser(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-white">
                          {getUserInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-400">{user.email || user.phone}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className={user.role === "admin" ? "bg-purple-500 text-purple-50" : "bg-blue-500 text-blue-50"}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-gray-400">{formatDate(user.createdAt)}</TableCell>
                  <TableCell className="hidden md:table-cell text-gray-400">{user.lastLogin ? formatDate(user.lastLogin) : "Never"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">${user.totalSpent.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(user)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 overflow-auto">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Delete Dialog */}
      <Dialog open={openDialog === "delete"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-400">
              Are you sure you want to delete the user{" "}
              <span className="font-medium text-white">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </span>
              ? This action cannot be undone and will remove all associated data.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
