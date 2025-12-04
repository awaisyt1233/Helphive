import { useState } from 'react';
// import { Card, CardContent } from './ui/card';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Eye } from 'lucide-react';

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]); // fill dynamically
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusTab, setStatusTab] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesStatus = statusTab === 'all' || c.status.toLowerCase().replace(' ', '-') === statusTab;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCountByStatus = (status) => {
    if (status === 'all') return complaints.length;
    return complaints.filter((c) => c.status.toLowerCase().replace(' ', '-') === status).length;
  };

  return (
    <DashboardLayout currentView="my-complaints" onNavigate={() => {}} onLogout={() => {}} userRole="student">
      <div className="p-8">
        <h1 className="text-blue-900 mb-2 text-2xl font-bold">My Complaints</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Input
              placeholder="Search complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Hostel">Hostel</SelectItem>
              <SelectItem value="Faculty">Faculty</SelectItem>
              <SelectItem value="Department">Department</SelectItem>
              <SelectItem value="Infrastructure">Infrastructure</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="Library">Library</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={statusTab} onValueChange={setStatusTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({getCountByStatus('all')})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({getCountByStatus('pending')})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({getCountByStatus('in-progress')})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({getCountByStatus('resolved')})</TabsTrigger>
          </TabsList>

          <TabsContent value={statusTab} className="space-y-4">
            {filteredComplaints.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">No complaints found.</CardContent>
              </Card>
            ) : (
              filteredComplaints.map((complaint) => (
                <Card key={complaint.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900 font-semibold">{complaint.title}</h3>
                        <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                        <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{complaint.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="px-3 py-1 bg-gray-100 rounded-full">{complaint.category}</span>
                        <span>Complaint #{complaint.id}</span>
                        <span>{complaint.date}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4" onClick={() => {}}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
